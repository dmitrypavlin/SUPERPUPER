import Icon from './Icon';

type TagProps = {
  text?: string;
  type?: 'control' | 'static';
  showIcon?: boolean;
  onRemove?: () => void;
  className?: string;
};

export default function Tag({ text = 'React', type = 'control', showIcon = false, onRemove, className }: TagProps) {
  return (
    <div
      className={`h-6 inline-flex items-center justify-center px-xs rounded-s ${
        type === 'static'
          ? 'bg-on-red'
          : showIcon
            ? 'bg-control gap-[10px]'
            : 'bg-control'
      } ${className ?? ''}`}
    >
      <span className="font-pixel text-pixel tracking-[2px] uppercase text-black whitespace-nowrap">
        {text}
      </span>
      {type === 'control' && showIcon && (
        <button onClick={onRemove} className="shrink-0 leading-none">
          <Icon icon="close" className="text-secondary" />
        </button>
      )}
    </div>
  );
}
