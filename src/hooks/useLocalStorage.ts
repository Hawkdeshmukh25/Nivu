import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Initialize from localStorage for instant load (offline cache)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Listen to Firestore for real-time updates from other devices
  useEffect(() => {
    const docRef = doc(db, "sync_data", key);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data().value as T;
        setStoredValue(data);
        // Update local cache
        window.localStorage.setItem(key, JSON.stringify(data));
      }
    }, (err) => {
      console.error(`Firebase sync error for ${key}:`, err);
    });

    return () => unsubscribe();
  }, [key]);

  // Wrapped setter that updates React, LocalStorage, and Firestore
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // 1. Update React state instantly
      setStoredValue(valueToStore);
      // 2. Update local storage instantly
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // 3. Sync to Firebase in background
      setDoc(doc(db, "sync_data", key), { value: valueToStore }, { merge: true })
        .catch(err => console.error("Firebase write error:", err));
    } catch (error) {
      console.warn(`Error setting localStorage/Firebase key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
