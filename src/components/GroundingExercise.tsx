import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, SkipForward, CheckCircle2 } from 'lucide-react';

const steps = [
  { count: 5, sense: 'see', text: 'Name five things you can see around you.' },
  { count: 4, sense: 'feel', text: 'Name four things you can physically feel right now.' },
  { count: 3, sense: 'hear', text: 'Name three things you can hear.' },
  { count: 2, sense: 'smell', text: 'Name two things you can smell.' },
  { count: 1, sense: 'taste', text: 'Name one thing you can taste.' },
];

export default function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  return (
    <div className="glass-card p-6 lg:p-8 h-full min-h-[340px] flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <span className="text-[120px] font-serif font-bold italic leading-none">
          {!completed ? steps[currentStep].count : ''}
        </span>
      </div>

      <h2 className="text-xl font-serif text-brand-ivory mb-8">Grounding (5-4-3-2-1)</h2>

      <div className="flex-1 flex flex-col justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!completed ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-purple/20 text-brand-beige flex items-center justify-center font-serif text-xl border border-brand-purple/30">
                  {steps[currentStep].count}
                </div>
                <p className="text-lg text-brand-ivory font-medium">Things you can {steps[currentStep].sense}</p>
              </div>
              <p className="text-brand-muted pl-14">{steps[currentStep].text}</p>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center gap-4 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-2">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-serif text-brand-ivory">You are here.</h3>
              <p className="text-brand-muted">You have successfully grounded yourself in the present moment.</p>
              <button
                onClick={reset}
                className="mt-4 px-6 py-2 rounded-full border border-white/10 text-brand-muted hover:text-brand-ivory hover:bg-white/5 transition-all"
              >
                Restart exercise
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!completed && (
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5 relative z-10">
          <button 
            onClick={() => setCompleted(true)}
            className="text-sm text-brand-muted hover:text-brand-ivory flex items-center gap-2 transition-colors"
          >
            <SkipForward size={16} />
            <span>Skip</span>
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-full bg-brand-ivory text-brand-main font-medium hover:bg-white flex items-center gap-2 transition-colors"
          >
            <span>Next</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
