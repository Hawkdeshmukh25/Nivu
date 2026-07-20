import { useState } from 'react';
import { motion } from 'framer-motion';

const PROMPTS = [
  "What feels heaviest today?",
  "What memory brought this feeling back?",
  "What do you wish you could say?",
  "What are you unable to understand?",
  "What do you need today?",
  "What would make this moment feel slightly easier?"
];

interface Props {
  onSave: (note: string, lock: boolean) => void;
}

export default function JournalEntryForm({ onSave }: Props) {
  const [note, setNote] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);

  const cyclePrompt = () => {
    setPromptIndex((prev) => (prev + 1) % PROMPTS.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-[#1F1D2B]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif text-brand-ivory text-lg">{PROMPTS[promptIndex]}</h3>
        <button onClick={cyclePrompt} className="text-xs text-brand-muted hover:text-brand-ivory transition-colors">
          Change prompt
        </button>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Start writing here..."
        className="w-full h-40 bg-black/20 border border-white/5 rounded-xl p-4 text-brand-ivory text-sm font-serif leading-relaxed focus:outline-none focus:border-brand-rose/50 resize-none mb-6"
      />

      {note.trim() && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex flex-col gap-4 border-t border-white/5 pt-6"
        >
          <h4 className="font-serif text-brand-ivory text-sm text-center mb-2">What would you like to do with this entry?</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => { onSave(note, false); setNote(''); }}
              className="px-4 py-2.5 bg-brand-rose/10 hover:bg-brand-rose/20 border border-brand-rose/20 text-brand-rose rounded-xl text-xs transition-colors"
            >
              Save privately
            </button>
            <button 
              onClick={() => { onSave(note, true); setNote(''); }}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-ivory rounded-xl text-xs transition-colors"
            >
              Lock this entry
            </button>
            <button 
              onClick={() => { onSave(note, false); setNote(''); }}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-ivory rounded-xl text-xs transition-colors"
            >
              Revisit later
            </button>
            <button 
              onClick={() => setNote('')}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-brand-muted hover:text-brand-rose rounded-xl text-xs transition-colors"
            >
              Delete permanently
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
