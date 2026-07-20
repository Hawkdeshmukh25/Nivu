import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeelingSelector from '../components/journal/FeelingSelector';
import JournalEntryForm from '../components/journal/JournalEntryForm';
import JournalHistory from '../components/journal/JournalHistory';
import { useJournalStorage } from '../hooks/useJournalStorage';

export default function MixedFeelings() {
  const { entries, saveEntry, deleteEntry, toggleLock } = useJournalStorage();
  const [selectedFeelings, setSelectedFeelings] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const toggleFeeling = (feeling: string) => {
    setSelectedFeelings(prev => {
      const isSelected = prev.includes(feeling);
      const next = isSelected ? prev.filter(f => f !== feeling) : [...prev, feeling];
      if (next.length > 0) setShowForm(true);
      else setShowForm(false);
      return next;
    });
  };

  const handleSave = (note: string, lock: boolean) => {
    saveEntry({
      feelings: selectedFeelings,
      note,
      isLocked: lock
    });
    setSelectedFeelings([]);
    setShowForm(false);
  };

  const handleExport = (entry: any) => {
    const text = `Date: ${entry.date}\nTime: ${entry.time}\nFeelings: ${entry.feelings.join(', ')}\n\n${entry.note}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mixed_feelings_${entry.date.replace(/\//g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 flex flex-col font-sans relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex-1 flex flex-col"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ivory mb-4">Mixed Feelings Journal</h1>
            <p className="text-brand-beige font-serif italic text-lg max-w-xl mx-auto leading-relaxed">
              "You can love someone, miss them, feel hurt, feel angry and still not fully understand what you feel. More than one feeling can be true at the same time."
            </p>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            <FeelingSelector 
              selectedFeelings={selectedFeelings}
              onToggle={toggleFeeling}
            />

            <AnimatePresence>
              {showForm && (
                <JournalEntryForm onSave={handleSave} />
              )}
            </AnimatePresence>
          </div>

          <JournalHistory 
            entries={entries}
            onDelete={deleteEntry}
            onToggleLock={toggleLock}
            onExport={handleExport}
          />
          
          {entries.length > 0 && (
            <div className="mt-8 text-center border-t border-white/5 pt-8">
              <p className="text-brand-muted text-xs italic font-serif">
                "Your journal remains on this device and is not shared automatically."
              </p>
            </div>
          )}

      </motion.div>
    </div>
  );
}
