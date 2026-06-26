type GraphBar = { height: number };

type GraphProps = {
  bars?: GraphBar[];
  className?: string;
};

export default function Graph({
  bars = [{ height: 82 }, { height: 48 }],
  className,
}: GraphProps) {
  return (
    <div className={`flex gap-[2px] items-end ${className ?? 'w-[143px]'}`}>
      {bars.map((bar, i) => (
        <div
          key={i}
          className="flex-1 min-w-0 bg-secondary mix-blend-multiply rounded-s"
          style={{ height: bar.height }}
        />
      ))}
    </div>
  );
}
