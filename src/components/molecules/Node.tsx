import Icon from './Icon';

type NodeProps = {
  title?: string;
  subtitle?: string;
  className?: string;
};

export default function Node({
  title = 'Start Trigger',
  subtitle = 'New Application received',
  className,
}: NodeProps) {
  return (
    <div className={`bg-card-red flex flex-col gap-l p-s rounded-m w-[280px] ${className ?? ''}`}>
      <div className="flex flex-col gap-s w-full">
        <div className="flex items-start justify-between w-full">
          <Icon icon="play" />
          <Icon icon="more" />
        </div>
        <div className="flex flex-col gap-xs">
          <span className="font-grotesk text-grotesk leading-grotesk text-primary">{title}</span>
          <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{subtitle}</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[10px] h-[10px] rounded-full bg-secondary shrink-0" />
        <div className="w-[10px] h-[10px] rounded-full bg-primary shrink-0" />
      </div>
    </div>
  );
}
