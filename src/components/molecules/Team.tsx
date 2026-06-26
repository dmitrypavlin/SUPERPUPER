import Bar from './Bar';
import Avatars from './Avatars';

type TeamProps = {
  name?: string;
  count?: number;
  productivity?: number;
  highlight?: string;
  extraCount?: number;
  onClick?: () => void;
  className?: string;
};

export default function Team({
  name = 'Engineering Team',
  count = 24,
  productivity = 89,
  highlight = 'Petya was drinking too much tea this week',
  extraCount = 21,
  onClick,
  className,
}: TeamProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-card-white flex flex-col gap-l p-x rounded-l cursor-pointer transition-all duration-150 ease-out hover:brightness-[0.96] active:brightness-[0.91] active:scale-[0.99] ${className ?? ''}`}
    >
      <div className="flex items-end justify-between w-full">
        <span className="font-grotesk text-h3 leading-h3 text-primary whitespace-nowrap">{name}</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary whitespace-nowrap">
          {count} people
        </span>
      </div>

      <div className="flex flex-col gap-[8px] w-full">
        <div className="flex items-start justify-between w-full">
          <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">Productivity</span>
          <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-primary">{productivity}%</span>
        </div>
        <div className="w-full overflow-hidden">
          <Bar value={productivity} cols={120} fillClass="bg-tech-green" />
        </div>
      </div>

      <div className="flex flex-col gap-xs">
        <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">Week highlight:</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{highlight}</span>
      </div>

      <div className="flex items-center gap-s">
        <Avatars />
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary whitespace-nowrap">
          +{extraCount} more
        </span>
      </div>
    </div>
  );
}
