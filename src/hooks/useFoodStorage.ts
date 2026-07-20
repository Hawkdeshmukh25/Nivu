import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';
export type FoodStatus = 'Had something' | 'Try later' | 'Not recorded';

export interface DailyRecord {
  date: string;
  meals: Record<TimeOfDay, FoodStatus>;
}

export interface ReminderSettings {
  enabled: boolean;
  breakfast: string; // HH:mm
  lunch: string;
  snack: string;
  dinner: string;
}

const DEFAULT_SETTINGS: ReminderSettings = {
  enabled: false,
  breakfast: '09:00',
  lunch: '13:00',
  snack: '17:00',
  dinner: '20:00'
};

const getTodayDateString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function useFoodStorage() {
  const [settings, setSettings] = useState<ReminderSettings>(() => {
    try {
      const savedSettings = localStorage.getItem('food_settings');
      return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [dailyRecord, setDailyRecord] = useState<DailyRecord>(() => {
    const today = getTodayDateString();
    try {
      const savedRecords = localStorage.getItem('food_records');
      if (savedRecords) {
        const records = JSON.parse(savedRecords);
        if (records[today]) return records[today];
      }
    } catch {}
    return {
      date: today,
      meals: { Morning: 'Not recorded', Afternoon: 'Not recorded', Evening: 'Not recorded', Night: 'Not recorded' }
    };
  });

  useEffect(() => {
    // Sync Settings
    const settingsRef = doc(db, "sync_data", "food_settings");
    const unsubSettings = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data().value as ReminderSettings;
        setSettings(data);
        localStorage.setItem('food_settings', JSON.stringify(data));
      }
    });

    // Sync Records
    const recordsRef = doc(db, "sync_data", "food_records");
    const unsubRecords = onSnapshot(recordsRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data().value as Record<string, DailyRecord>;
        localStorage.setItem('food_records', JSON.stringify(data));
        const today = getTodayDateString();
        if (data[today]) {
          setDailyRecord(data[today]);
        }
      }
    });

    return () => {
      unsubSettings();
      unsubRecords();
    };
  }, []);

  const updateSettings = (newSettings: ReminderSettings) => {
    setSettings(newSettings);
    localStorage.setItem('food_settings', JSON.stringify(newSettings));
    setDoc(doc(db, "sync_data", "food_settings"), { value: newSettings }, { merge: true }).catch(console.error);
  };

  const updateMealStatus = (timeOfDay: TimeOfDay, status: FoodStatus) => {
    setDailyRecord((prev) => {
      const updated = {
        ...prev,
        meals: { ...prev.meals, [timeOfDay]: status }
      };
      
      const savedRecords = localStorage.getItem('food_records');
      const records = savedRecords ? JSON.parse(savedRecords) : {};
      records[updated.date] = updated;
      
      localStorage.setItem('food_records', JSON.stringify(records));
      setDoc(doc(db, "sync_data", "food_records"), { value: records }, { merge: true }).catch(console.error);
      
      return updated;
    });
  };

  return { settings, updateSettings, dailyRecord, updateMealStatus };
}
