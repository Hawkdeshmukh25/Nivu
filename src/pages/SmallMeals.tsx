import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CupSoda, Coffee, Apple, Cookie, Soup, Carrot, Pizza, Heart, Utensils } from 'lucide-react';
import SupportModal from '../components/SupportModal';
import GentleFoodCard from '../components/food/GentleFoodCard';
import DailyFoodCheckIn from '../components/food/DailyFoodCheckIn';
import MealReminderSettings from '../components/food/MealReminderSettings';
import { useFoodStorage, type TimeOfDay } from '../hooks/useFoodStorage';

const foodOptions = [
  { label: 'Water', icon: CupSoda },
  { label: 'Tea', icon: Coffee },
  { label: 'Juice', icon: CupSoda },
  { label: 'Fruit', icon: Apple },
  { label: 'Biscuits', icon: Cookie },
  { label: 'Toast', icon: Carrot }, // Placeholder icon for toast
  { label: 'Soup', icon: Soup },
  { label: 'Rice', icon: Utensils },
  { label: 'Regular meal', icon: Pizza },
  { label: 'Something comforting', icon: Heart }
];

export default function SmallMeals() {
  const { settings, updateSettings, dailyRecord, updateMealStatus } = useFoodStorage();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const getCurrentTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    if (hour >= 17 && hour < 21) return 'Evening';
    return 'Night';
  };

  const handleStatus = (status: 'Had something' | 'Try later' | 'Not recorded') => {
    updateMealStatus(getCurrentTimeOfDay(), status);
    if (status === 'Had something') {
      setFeedbackMsg("That counts. Your body received a little support today.");
    } else if (status === 'Try later') {
      setFeedbackMsg("That is okay. Try one sip of water first. You can return whenever you feel ready.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 flex flex-col font-sans relative">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex-1 flex flex-col"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-serif text-brand-ivory mb-4">Something Small Is Enough</h1>
            <p className="text-brand-beige font-serif italic text-lg max-w-xl mx-auto leading-relaxed">
              "You do not need to finish a complete meal right now. A few bites or a few sips are still a good beginning."
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-4">
                {foodOptions.map((item, idx) => (
                  <GentleFoodCard 
                    key={idx}
                    icon={item.icon}
                    label={item.label}
                    selected={selectedFood === item.label}
                    onClick={() => setSelectedFood(selectedFood === item.label ? null : item.label)}
                  />
                ))}
              </div>

              <div className="bg-[#1F1D2B]/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                <h3 className="font-serif text-brand-ivory text-xl">How did you do?</h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => handleStatus('Had something')}
                    className="px-6 py-3 rounded-full bg-brand-rose/10 hover:bg-brand-rose/20 text-brand-rose border border-brand-rose/20 transition-colors shadow-sm"
                  >
                    I had something
                  </button>
                  <button 
                    onClick={() => handleStatus('Try later')}
                    className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-ivory border border-white/10 transition-colors shadow-sm"
                  >
                    I will try in 10 minutes
                  </button>
                  <button 
                    onClick={() => handleStatus('Try later')}
                    className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-ivory border border-white/10 transition-colors shadow-sm"
                  >
                    I do not feel able to eat right now
                  </button>
                  <button 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-brand-muted border border-white/10 transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Heart size={16} /> I need someone to sit with me
                  </button>
                </div>
                
                <AnimatePresence>
                  {feedbackMsg && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <p className="text-brand-beige font-serif italic text-lg">{feedbackMsg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <DailyFoodCheckIn record={dailyRecord} />
              <MealReminderSettings settings={settings} onUpdate={updateSettings} />
            </div>
          </div>

        </motion.div>
      <SupportModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
    </div>
  );
}
