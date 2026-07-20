import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Edit3, Save, Trash2 } from 'lucide-react';
import { deepPrompts } from '../data/prompts';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Depth() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  
  // Using an object to store entries keyed by the prompt itself
  const [entries, setEntries] = useLocalStorage<Record<string, string>>('quiet-depth-entries', {});
  const [currentEntry, setCurrentEntry] = useState('');
  
  // Show save indicator briefly when autosaving
  const [showSaved, setShowSaved] = useState(false);

  const currentPrompt = deepPrompts[promptIndex];

  // Load existing entry when prompt changes
  useEffect(() => {
    setCurrentEntry(entries[currentPrompt] || '');
    setIsWriting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPrompt]);

  // Autosave logic
  useEffect(() => {
    if (!isWriting) return;
    
    const timeoutId = setTimeout(() => {
      setEntries(prev => ({ ...prev, [currentPrompt]: currentEntry }));
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }, 1000); // Autosave after 1 second of no typing

    return () => clearTimeout(timeoutId);
  }, [currentEntry, currentPrompt, isWriting, setEntries]);

  const handleSkip = () => {
    setPromptIndex(prev => (prev + 1) % deepPrompts.length);
  };

  const handleDeleteEntry = (promptToDelete: string) => {
    setEntries(prev => {
      const updated = { ...prev };
      delete updated[promptToDelete];
      return updated;
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 min-h-full flex flex-col">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl md:text-5xl font-serif text-brand-beige">Deep Conversation Room</h1>
        <button 
          onClick={handleSkip}
          className="flex items-center gap-2 text-brand-muted hover:text-brand-ivory transition-colors"
        >
          <span className="text-sm">New prompt</span>
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {!isWriting ? (
            <motion.div
              key={`prompt-${promptIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="glass-card p-12 flex flex-col items-center justify-center text-center gap-12 min-h-[400px]"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-brand-ivory leading-relaxed italic">
                "{currentPrompt}"
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setIsWriting(true)}
                  className="px-6 py-3 rounded-full bg-brand-ivory text-brand-main font-medium hover:bg-white transition-colors flex items-center gap-2"
                >
                  <Edit3 size={18} /> Write privately
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="writing-area"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col h-full bg-[#131627] rounded-3xl p-6 md:p-12 shadow-2xl border border-white/5 relative min-h-[80vh] lg:min-h-0"
            >
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-xl md:text-2xl font-serif text-brand-purple italic max-w-2xl leading-relaxed">
                  {currentPrompt}
                </h3>
                <button 
                  onClick={() => setIsWriting(false)}
                  className="text-brand-muted hover:text-brand-ivory transition-colors text-sm underline underline-offset-4"
                >
                  Close journal
                </button>
              </div>

              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Start typing... this is a safe, private space. Your thoughts autosave locally."
                className="flex-1 w-full bg-transparent resize-none outline-none text-brand-ivory/90 placeholder-brand-muted/40 font-serif text-lg leading-loose"
                autoFocus
              />

              <AnimatePresence>
                {showSaved && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-8 right-12 flex items-center gap-2 text-brand-muted/60 text-sm font-medium"
                  >
                    <Save size={14} /> Saved locally
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Past Reflections Section */}
      {!isWriting && Object.keys(entries).filter(p => entries[p].trim() !== '').length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-16 flex flex-col gap-6"
        >
          <h2 className="text-xl md:text-2xl font-serif text-brand-beige border-b border-white/10 pb-4">Past Reflections</h2>
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(entries)
              .filter(([_, entry]) => entry.trim() !== '')
              .reverse() // show most recently saved/modified at the top, if order is somewhat preserved
              .map(([prompt, entry], i) => (
              <div key={i} className="glass-card p-6 md:p-8 flex flex-col gap-4 relative group">
                <button 
                  onClick={() => handleDeleteEntry(prompt)}
                  className="absolute top-6 right-6 text-brand-muted/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  title="Delete reflection"
                >
                  <Trash2 size={18} />
                </button>
                <h3 className="font-serif text-brand-ivory text-lg md:text-xl italic opacity-90 leading-relaxed pr-8">"{prompt}"</h3>
                <p className="text-brand-muted/80 text-sm md:text-base whitespace-pre-wrap leading-relaxed">{entry}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
