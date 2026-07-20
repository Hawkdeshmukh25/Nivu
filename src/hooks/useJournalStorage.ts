import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface JournalEntry {
  id: string;
  date: string;
  time: string;
  feelings: string[];
  note: string;
  isLocked: boolean;
}

const JOURNAL_KEY = 'mixed_feelings_journal';

export function useJournalStorage() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem(JOURNAL_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    const docRef = doc(db, "sync_data", JOURNAL_KEY);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data().value as JournalEntry[];
        
        const localRaw = window.localStorage.getItem(JOURNAL_KEY);
        if (localRaw) {
          const cloudDataStr = JSON.stringify(data);
          if (localRaw.length > cloudDataStr.length + 50) {
            console.log(`Local data for ${JOURNAL_KEY} is larger. Pushing to cloud to prevent wipe.`);
            setDoc(docRef, { value: JSON.parse(localRaw) }, { merge: true });
            return;
          }
        }

        setEntries(data);
        localStorage.setItem(JOURNAL_KEY, JSON.stringify(data));
      }
    });

    return () => unsubscribe();
  }, []);

  const saveEntriesAndSync = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(newEntries));
    setDoc(doc(db, "sync_data", JOURNAL_KEY), { value: newEntries }, { merge: true }).catch(console.error);
  };

  const saveEntry = (entry: Omit<JournalEntry, 'id' | 'date' | 'time'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEntries((prev) => {
      const updated = [newEntry, ...prev];
      saveEntriesAndSync(updated);
      return updated;
    });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => {
      const updated = prev.filter(e => e.id !== id);
      saveEntriesAndSync(updated);
      return updated;
    });
  };

  const toggleLock = (id: string) => {
    setEntries((prev) => {
      const updated = prev.map(e => e.id === id ? { ...e, isLocked: !e.isLocked } : e);
      saveEntriesAndSync(updated);
      return updated;
    });
  };

  return { entries, saveEntry, deleteEntry, toggleLock };
}
