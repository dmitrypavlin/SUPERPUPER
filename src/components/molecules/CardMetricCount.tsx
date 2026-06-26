type CardMetricCountProps = {
  title?: string;
  value?: string | number;
  label?: string;
  className?: string;
};

export default function CardMetricCount({
  title = 'Applications',
  value = 142,
  label = 'Total received',
  className,
}: CardMetricCountProps) {
  return (
    <div className={`bg-card-white flex flex-col gap-xxl p-x rounded-l ${className ?? ''}`}>
      <span className="font-antiqa text-h2 leading-h2 text-primary">{title}</span>
      <div className="flex flex-col gap-xs">
        <span className="font-antiqa text-h1 leading-[0.9] text-primary">{value}</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{label}</span>
      </div>
    </div>
  );
}
