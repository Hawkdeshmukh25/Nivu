import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, XCircle } from 'lucide-react';

interface Props {
  task: string;
  durationMinutes?: number;
  onEnd: () => void;
}

export default function FocusTimer({ task, durationMinutes = 5, onEnd }: Props) {
  const TOTAL_SECONDS = durationMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onEnd();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, onEnd]);

  const toggleTimer = () => setIsActive(!isActive);
  const restartTimer = () => {
    setIsActive(false);
    setTimeLeft(TOTAL_SECONDS);
  };
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  return (
    <div className="bg-[#1F1D2B]/80 backdrop-blur-xl border border-brand-rose/20 rounded-2xl p-6 flex flex-col items-center shadow-2xl relative overflow-hidden">
      {/* Progress background indicator */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-brand-rose transition-all duration-1000 ease-linear"
        style={{ width: `${progress}%` }}
      />
      
      <p className="font-serif italic text-brand-beige mb-6 text-center">
        "This is enough for now. You only need to focus on this one step."
      </p>
      
      <h4 className="text-xl text-brand-ivory font-medium mb-8 text-center">{task}</h4>
      
      <div className="text-6xl font-light text-brand-ivory mb-8 font-mono tracking-widest">
        {formatTime(timeLeft)}
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={restartTimer}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-muted transition-colors"
          aria-label="Restart"
        >
          <RotateCcw size={20} />
        </button>
        
        <button 
          onClick={toggleTimer}
          className="w-16 h-16 rounded-full bg-brand-rose text-white flex items-center justify-center hover:bg-brand-rose/90 transition-all shadow-lg hover:scale-105"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
        </button>
        
        <button 
          onClick={onEnd}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-muted transition-colors"
          aria-label="End early"
        >
          <XCircle size={20} />
        </button>
      </div>
    </div>
  );
}
