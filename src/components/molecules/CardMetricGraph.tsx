import Graph from './Graph';

type CardMetricGraphProps = {
  title?: string;
  label?: string;
  bars?: { height: number }[];
  bg?: string;
  className?: string;
};

export default function CardMetricGraph({
  title = 'Health',
  label = 'Overall: Good',
  bars = [{ height: 82 }, { height: 48 }],
  bg = 'bg-card-green',
  className,
}: CardMetricGraphProps) {
  return (
    <div className={`${bg} flex flex-col gap-l p-x rounded-l w-[190px] ${className ?? ''}`}>
      <span className="font-grotesk text-h3 leading-h3 text-primary">{title}</span>
      <div className="flex flex-col gap-xs w-full">
        <Graph bars={bars} className="w-full" />
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{label}</span>
      </div>
    </div>
  );
}
