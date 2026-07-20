import type { ReminderSettings } from '../../hooks/useFoodStorage';

interface Props {
  settings: ReminderSettings;
  onUpdate: (settings: ReminderSettings) => void;
}

export default function MealReminderSettings({ settings, onUpdate }: Props) {
  const toggleEnabled = () => onUpdate({ ...settings, enabled: !settings.enabled });

  const handleChange = (field: keyof ReminderSettings, value: string) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-brand-ivory text-lg">Gentle Reminders</h3>
        <button
          onClick={toggleEnabled}
          className={`relative w-12 h-6 rounded-full transition-colors ${settings.enabled ? 'bg-brand-rose' : 'bg-white/10'}`}
        >
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.enabled ? 'left-7' : 'left-1'}`} />
        </button>
      </div>
      
      {settings.enabled && (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <p className="text-xs text-brand-muted italic font-serif leading-relaxed mb-2">
            "Your body deserves a little care too. Could you try a few sips or bites?"
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-brand-ivory text-xs">Breakfast</span>
              <input 
                type="time" 
                value={settings.breakfast} 
                onChange={(e) => handleChange('breakfast', e.target.value)}
                className="bg-black/20 border border-white/10 rounded-lg p-2 text-brand-ivory text-sm focus:outline-none focus:border-brand-rose/50"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-brand-ivory text-xs">Lunch</span>
              <input 
                type="time" 
                value={settings.lunch} 
                onChange={(e) => handleChange('lunch', e.target.value)}
                className="bg-black/20 border border-white/10 rounded-lg p-2 text-brand-ivory text-sm focus:outline-none focus:border-brand-rose/50"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-brand-ivory text-xs">Snack</span>
              <input 
                type="time" 
                value={settings.snack} 
                onChange={(e) => handleChange('snack', e.target.value)}
                className="bg-black/20 border border-white/10 rounded-lg p-2 text-brand-ivory text-sm focus:outline-none focus:border-brand-rose/50"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-brand-ivory text-xs">Dinner</span>
              <input 
                type="time" 
                value={settings.dinner} 
                onChange={(e) => handleChange('dinner', e.target.value)}
                className="bg-black/20 border border-white/10 rounded-lg p-2 text-brand-ivory text-sm focus:outline-none focus:border-brand-rose/50"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
