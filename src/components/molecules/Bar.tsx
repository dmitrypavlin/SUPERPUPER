type BarProps = {
  size?: 'small' | 'big';
  value?: number; // 0–100
  cols?: number;
  fillClass?: string;
  className?: string;
};

export default function Bar({ size = 'small', value = 75, cols = 40, fillClass = 'bg-bar', className }: BarProps) {
  const filled = Math.round((value / 100) * cols);
  const rows = size === 'big' ? 2 : 1;
  const dot = 5;

  return (
    <div className={`flex gap-[2px] ${className ?? ''}`}>
      {Array.from({ length: cols }, (_, i) => (
        <div key={i} className="flex flex-col gap-[2px] shrink-0">
          {Array.from({ length: rows }, (_, r) => (
            <div
              key={r}
              className={`rounded-full ${i < filled ? fillClass : 'bg-white'}`}
              style={{ width: dot, height: dot }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
