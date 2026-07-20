import { useState } from 'react';
import { motion } from 'framer-motion';
import BreathingOrb from '../components/BreathingOrb';
import GroundingExercise from '../components/GroundingExercise';
import ComfortMessages from '../components/ComfortMessages';
import SupportModal from '../components/SupportModal';

export default function CalmNow() {
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-serif text-brand-beige drop-shadow-lg"
        >
          Let's slow down for a moment
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setIsSupportModalOpen(true)}
          className="px-6 py-3 rounded-full bg-brand-beige text-brand-main font-semibold shadow-[0_0_20px_rgba(231,199,165,0.4)] hover:bg-white hover:scale-105 transition-all flex items-center gap-2"
        >
          I need someone
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          <BreathingOrb />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="h-full"
        >
          <GroundingExercise />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ComfortMessages />
      </motion.div>

      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
    </div>
  );
}
