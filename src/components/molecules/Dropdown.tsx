import { useState, useRef, useEffect } from 'react';
import Icon from './Icon';

const TEAM_OPTIONS    = ['Frontend Team', 'Backend Team', 'Design', 'Marketing', 'Product'];
const DEFAULT_OPTIONS = ['Design', 'Development', 'Marketing', 'Research', 'Operations'];

type DropdownProps = {
  headline?: string;
  showHeadline?: boolean;
  value?: string;
  options?: string[];
  filled?: boolean;
  theme?: 'on-color' | 'default';
  onChange?: (value: string) => void;
  className?: string;
};

export default function Dropdown({
  headline = 'Head Line',
  showHeadline = true,
  value = 'frontend-team',
  options,
  filled = true,
  theme = 'on-color',
  onChange,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);
  const [isFilled, setIsFilled] = useState(filled);
  const ref = useRef<HTMLDivElement>(null);

  const isOnColor = theme === 'on-color';
  const opts = options ?? (isOnColor ? TEAM_OPTIONS : DEFAULT_OPTIONS);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsFilled(true);
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className={`flex flex-col gap-xs relative ${className ?? ''}`}>
      {showHeadline && (
        <label className={`font-grotesk text-caps tracking-[1.6px] uppercase whitespace-nowrap ${isOnColor ? 'text-brown' : 'text-primary'}`}>
          {headline}
        </label>
      )}
      <button
        onClick={() => setIsOpen(v => !v)}
        className={`h-8 flex items-center justify-between px-s py-xs rounded-s transition-all duration-150 ease-out hover:brightness-90 active:brightness-75 active:scale-[0.97] ${
          isOnColor ? 'bg-brown' : 'bg-control'
        } ${!isFilled ? 'opacity-50' : ''}`}
      >
        <span className={`font-pixel text-pixel tracking-[2px] uppercase whitespace-nowrap ${
          isOnColor ? 'text-on-color' : isFilled ? 'text-primary' : 'text-secondary'
        }`}>
          {selected}
        </span>
        <div className="pl-xs flex items-center shrink-0">
          <Icon icon="arrow-down" className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''} ${isOnColor ? 'text-on-color' : 'text-primary'}`} />
        </div>
      </button>

      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-[2px] rounded-s overflow-hidden z-50 shadow-lg ${
          isOnColor ? 'bg-brown' : 'bg-control'
        }`}>
          {opts.map(option => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full h-8 flex items-center px-s font-pixel text-pixel tracking-[2px] uppercase transition-colors duration-100 ${
                option === selected ? 'bg-black/20' : 'hover:bg-black/10'
              } ${isOnColor ? 'text-on-color' : 'text-primary'}`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
