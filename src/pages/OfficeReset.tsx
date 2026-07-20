import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import SupportModal from '../components/SupportModal';
import QuickResetList from '../components/office/QuickResetList';
import SmallTaskSelector from '../components/office/SmallTaskSelector';
import FocusTimer from '../components/office/FocusTimer';

export default function OfficeReset() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{label: string, duration: number} | null>(null);
  const [timerEnded, setTimerEnded] = useState(false);

  const resetState = () => {
    setSelectedTask(null);
    setTimerEnded(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 flex flex-col font-sans relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex-1 flex flex-col"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ivory mb-4">Overwhelmed at Office</h1>
            <p className="text-brand-beige font-serif italic text-lg max-w-xl mx-auto leading-relaxed">
              "Work feels heavy right now. You do not need to finish everything at once. Let's choose one small step."
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedTask && !timerEnded && (
              <motion.div
                key="selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col gap-10"
              >
                <QuickResetList onResetSelect={(label, duration) => setSelectedTask({label, duration})} />
                <SmallTaskSelector onTaskSelect={(label, duration) => setSelectedTask({label, duration})} />
              </motion.div>
            )}

            {selectedTask && !timerEnded && (
              <motion.div
                key="timer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-md w-full mx-auto my-auto"
              >
                <FocusTimer 
                  task={selectedTask.label} 
                  durationMinutes={selectedTask.duration}
                  onEnd={() => setTimerEnded(true)} 
                />
              </motion.div>
            )}

            {timerEnded && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-lg w-full mx-auto my-auto flex flex-col gap-6"
              >
                <h2 className="text-2xl font-serif text-brand-ivory text-center mb-4">How do you feel now?</h2>
                
                <div className="flex flex-col gap-3">
                  {['A little better', 'Still overwhelmed', 'I need another small task', 'I need a break'].map((option) => (
                    <button
                      key={option}
                      onClick={resetState}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-brand-ivory text-left transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setIsSupportModalOpen(true)}
                    className="bg-brand-rose/10 hover:bg-brand-rose/20 border border-brand-rose/30 p-4 rounded-xl text-brand-rose text-left transition-colors flex items-center justify-between group"
                  >
                    <span>I need someone</span>
                    <Heart size={16} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Need Someone button when picking tasks */}
        {!timerEnded && !selectedTask && (
          <div className="fixed bottom-6 right-6 z-20">
            <button
              onClick={() => setIsSupportModalOpen(true)}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-muted hover:text-brand-ivory hover:bg-white/10 transition-all flex items-center gap-2 shadow-lg backdrop-blur-md"
            >
              <Heart size={14} />
              <span className="text-sm">I need someone</span>
            </button>
          </div>
        )}
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
