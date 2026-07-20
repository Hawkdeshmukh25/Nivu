import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import DoorPhase from './SanctuaryAuth/DoorPhase.tsx';
import Question1 from './SanctuaryAuth/Question1.tsx';
import Question2Pin from './SanctuaryAuth/Question2Pin.tsx';
import FinalUnlockPhase from './SanctuaryAuth/FinalUnlockPhase.tsx';

export default function SanctuaryAuth() {
  const [phase, setPhase] = useState(0);
  const { unlockSanctuary } = useAuth();
  const navigate = useNavigate();

  const nextPhase = () => setPhase((prev) => prev + 1);

  const handleFinalUnlock = () => {
    unlockSanctuary();
    navigate('/');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#020205] text-brand-ivory font-serif overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 0 && <DoorPhase key="phase-0" onOpen={nextPhase} />}
        {phase === 1 && <Question1 key="phase-1" onSuccess={nextPhase} />}
        {phase === 2 && <Question2Pin key="phase-2" onSuccess={nextPhase} />}
        {phase === 3 && <FinalUnlockPhase key="phase-3" onComplete={handleFinalUnlock} />}
      </AnimatePresence>
    </div>
  );
}
