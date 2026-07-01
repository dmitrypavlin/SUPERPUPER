type TextAreaProps = {
  headline?: string;
  showHeadline?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
};

export default function TextArea({
  headline = 'Head Line',
  showHeadline = true,
  placeholder = 'Type something here',
  value,
  onChange,
  className,
}: TextAreaProps) {
  return (
    <div className={`flex flex-col gap-xs ${className ?? ''}`}>
      {showHeadline && (
        <label className="font-grotesk text-caps tracking-[1.6px] uppercase text-black">
          {headline}
        </label>
      )}
      <textarea
        className="flex-1 min-h-px px-s py-xs rounded-s bg-control font-pixel text-pixel tracking-[2px] uppercase text-black placeholder:text-gray resize-none outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  );
}
