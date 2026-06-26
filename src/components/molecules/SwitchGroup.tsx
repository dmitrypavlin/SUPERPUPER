type SwitchGroupProps = {
  tabs?: string[];
  active?: number;
  onChange?: (i: number) => void;
  className?: string;
};

export default function SwitchGroup({
  tabs = ['Team', 'Campaign', 'Profile'],
  active = 0,
  onChange,
  className,
}: SwitchGroupProps) {
  return (
    <div className={`inline-flex gap-[2px] items-center p-xxs rounded-m bg-yellow ${className ?? ''}`}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onChange?.(i)}
          className={`h-8 flex items-center justify-center px-s rounded-s shrink-0 transition-all duration-200 ease-out ${
            i === active ? 'bg-white' : 'bg-transparent hover:bg-white/40'
          }`}
        >
          <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary whitespace-nowrap">
            {tab}
          </span>
        </button>
      ))}
    </div>
  );
}
