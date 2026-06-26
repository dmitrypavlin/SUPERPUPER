type StatusType = 'purple' | 'green' | 'red' | 'stopped';

const config: Record<StatusType, { label: string; dot: string; text: string }> = {
  purple:  { label: 'Rocket Growth', dot: 'bg-tech-purple', text: 'text-tech-purple' },
  green:   { label: 'On Track',      dot: 'bg-tech-green',  text: 'text-tech-green'  },
  red:     { label: 'Failing',       dot: 'bg-tech-red',    text: 'text-tech-red'    },
  stopped: { label: 'Failing',       dot: 'bg-tech-gray',   text: 'text-secondary'   },
};

type StatusProps = { type?: StatusType; label?: string; className?: string };

export default function Status({ type = 'purple', label, className }: StatusProps) {
  const { label: configLabel, dot, text } = config[type];
  const displayLabel = label ?? configLabel;
  return (
    <div className={`flex items-center gap-[10px] ${className ?? ''}`}>
      <div className={`w-[5px] h-[5px] rounded-full shrink-0 ${dot}`} />
      <span className={`font-pixel text-pixel tracking-[2px] uppercase whitespace-nowrap ${text}`}>
        {displayLabel}
      </span>
    </div>
  );
}
