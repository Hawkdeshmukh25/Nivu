import { useState, useEffect } from 'react';

export interface JournalEntry {
  id: string;
  date: string;
  time: string;
  feelings: string[];
  note: string;
  isLocked: boolean;
}

export function useJournalStorage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mixed_feelings_journal');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = (entry: Omit<JournalEntry, 'id' | 'date' | 'time'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setEntries((prev) => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('mixed_feelings_journal', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => {
      const updated = prev.filter(e => e.id !== id);
      localStorage.setItem('mixed_feelings_journal', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleLock = (id: string) => {
    setEntries((prev) => {
      const updated = prev.map(e => e.id === id ? { ...e, isLocked: !e.isLocked } : e);
      localStorage.setItem('mixed_feelings_journal', JSON.stringify(updated));
      return updated;
    });
  };

  return { entries, saveEntry, deleteEntry, toggleLock };
}
