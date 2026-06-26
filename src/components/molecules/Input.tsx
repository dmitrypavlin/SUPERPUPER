type InputProps = {
  headline?: string;
  showHeadline?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  className?: string;
};

export default function Input({
  headline = 'Head Line',
  showHeadline = true,
  value,
  placeholder = 'Michael Lee',
  onChange,
  className,
}: InputProps) {
  return (
    <div className={`flex flex-col gap-xs ${className ?? ''}`}>
      {showHeadline && (
        <label className="font-grotesk text-caps tracking-[1.6px] uppercase text-black whitespace-nowrap">
          {headline}
        </label>
      )}
      <div className="h-8 flex items-center px-s py-xs rounded-s bg-control">
        <input
          type="text"
          className="w-full font-pixel text-pixel tracking-[2px] uppercase text-black bg-transparent outline-none placeholder:text-gray"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}
