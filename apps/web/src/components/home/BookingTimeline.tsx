'use client';

const steps = [
  { num: 1, label: 'Explore', sub: 'Browse experiences' },
  { num: 2, label: 'Select', sub: 'Choose your package' },
  { num: 3, label: 'Book', sub: 'Secure your spot' },
  { num: 4, label: 'Pay', sub: 'Easy checkout' },
  { num: 5, label: 'Go!', sub: 'Enjoy Egypt' },
];

export default function BookingTimeline() {
  return (
    <div className="flex items-center justify-center gap-0 md:gap-2 px-4 py-3 bg-theme-surface/60 backdrop-blur-sm border-y border-theme-gold/[0.06]">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center gap-0 md:gap-2">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold font-english transition-all ${
              i < 3 ? 'bg-theme-gold text-theme-bg' : 'bg-white/[0.06] text-white/40'
            }`}>{s.num}</div>
            <div className="hidden md:block">
              <p className="text-[10px] font-bold font-english text-white leading-tight">{s.label}</p>
              <p className="text-[8px] text-white/40 font-english">{s.sub}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-4 md:w-8 h-px mx-0.5 md:mx-1 ${i < 2 ? 'bg-theme-gold/40' : 'bg-white/[0.06]'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
