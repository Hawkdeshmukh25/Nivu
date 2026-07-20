import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Trash2, Download, Search, Eye, EyeOff } from 'lucide-react';
import type { JournalEntry } from '../../hooks/useJournalStorage';

interface Props {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
  onToggleLock: (id: string) => void;
  onExport: (entry: JournalEntry) => void;
}

export default function JournalHistory({ entries, onDelete, onToggleLock, onExport }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedLocks, setRevealedLocks] = useState<Set<string>>(new Set());

  const filteredEntries = entries.filter(e => 
    e.note.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.feelings.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleReveal = (id: string) => {
    setRevealedLocks(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (entries.length === 0) return null;

  return (
    <div className="mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-serif text-brand-ivory">Your Journal</h2>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input 
            type="text"
            placeholder="Search entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 bg-[#1F1D2B]/60 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-brand-ivory focus:outline-none focus:border-brand-rose/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1F1D2B]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-xs text-brand-muted mb-2">{entry.date} at {entry.time}</div>
                  <div className="flex flex-wrap gap-2">
                    {entry.feelings.map(f => (
                      <span key={f} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-full text-brand-ivory">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onToggleLock(entry.id)} className="p-2 text-brand-muted hover:text-brand-ivory transition-colors">
                    {entry.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                  </button>
                  <button onClick={() => onExport(entry)} className="p-2 text-brand-muted hover:text-brand-ivory transition-colors">
                    <Download size={16} />
                  </button>
                  <button onClick={() => onDelete(entry.id)} className="p-2 text-brand-muted hover:text-brand-rose transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4 text-brand-beige font-serif italic text-sm leading-relaxed whitespace-pre-wrap relative">
                {entry.isLocked && !revealedLocks.has(entry.id) ? (
                  <div className="flex flex-col items-center justify-center p-6 bg-black/20 rounded-xl border border-white/5">
                    <Lock size={24} className="text-brand-muted mb-2" />
                    <span className="text-brand-muted text-xs">This entry is locked</span>
                    <button 
                      onClick={() => toggleReveal(entry.id)}
                      className="mt-3 px-4 py-1.5 bg-brand-rose/10 text-brand-rose rounded-full text-xs hover:bg-brand-rose/20 transition-colors flex items-center gap-2"
                    >
                      <Eye size={12} /> Reveal
                    </button>
                  </div>
                ) : (
                  <div>
                    {entry.note}
                    {entry.isLocked && (
                      <button 
                        onClick={() => toggleReveal(entry.id)}
                        className="mt-3 px-4 py-1.5 bg-white/5 text-brand-muted rounded-full text-xs hover:bg-white/10 transition-colors flex items-center gap-2 w-max"
                      >
                        <EyeOff size={12} /> Hide again
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
