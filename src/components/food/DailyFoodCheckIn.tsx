import type { DailyRecord, TimeOfDay } from '../../hooks/useFoodStorage';

interface Props {
  record: DailyRecord;
}

export default function DailyFoodCheckIn({ record }: Props) {
  const times: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Night'];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Had something': return 'text-brand-rose bg-brand-rose/10 border-brand-rose/20';
      case 'Try later': return 'text-brand-beige bg-brand-beige/10 border-brand-beige/20';
      default: return 'text-brand-muted bg-white/5 border-white/10';
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="font-serif text-brand-ivory text-lg mb-4">Today's Check-in</h3>
      <div className="flex flex-col gap-3">
        {times.map(time => {
          const status = record.meals[time];
          return (
            <div key={time} className="flex justify-between items-center p-3 rounded-xl bg-black/20 border border-white/5">
              <span className="text-brand-ivory text-sm">{time}</span>
              <span className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
