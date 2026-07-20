import { useState, useEffect } from 'react';

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
  const [settings, setSettings] = useState<ReminderSettings>(DEFAULT_SETTINGS);
  const [dailyRecord, setDailyRecord] = useState<DailyRecord>({
    date: getTodayDateString(),
    meals: { Morning: 'Not recorded', Afternoon: 'Not recorded', Evening: 'Not recorded', Night: 'Not recorded' }
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('food_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const today = getTodayDateString();
    const savedRecords = localStorage.getItem('food_records');
    if (savedRecords) {
      const records: Record<string, DailyRecord> = JSON.parse(savedRecords);
      if (records[today]) {
        setDailyRecord(records[today]);
      }
    }
  }, []);

  const updateSettings = (newSettings: ReminderSettings) => {
    setSettings(newSettings);
    localStorage.setItem('food_settings', JSON.stringify(newSettings));
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
      
      return updated;
    });
  };

  return { settings, updateSettings, dailyRecord, updateMealStatus };
}
