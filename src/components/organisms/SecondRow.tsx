import Btn from '../molecules/Btn';

type SecondRowType = 'default' | 'builder';

type SecondRowProps = {
  type?: SecondRowType;
  breadcrumb?: string[];
  onBack?: () => void;
  onHomeClick?: () => void;
  showBack?: boolean;
  className?: string;
};

export default function SecondRow({
  type = 'default',
  breadcrumb = ['Home', 'Something', 'Something'],
  onBack,
  onHomeClick,
  showBack = true,
  className,
}: SecondRowProps) {
  if (type === 'builder') {
    return (
      <div className={`flex items-center justify-between px-m py-s w-full ${className ?? ''}`}>
        <Btn btnType="secondary" label="Back" onClick={onBack} />
        <div className="flex items-center gap-xs">
          <Btn btnType="secondary" label="Save" />
          <Btn btnType="small" label="Deploy" />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-m px-m py-s w-full ${className ?? ''}`}>
      {showBack && (
        <button
          onClick={onBack}
          className="h-8 inline-flex items-center justify-center px-s py-xs rounded-over border border-tech-green bg-white font-pixel text-pixel tracking-[2px] uppercase text-primary shrink-0 transition-all duration-150 ease-out hover:bg-[#f0f0f0] active:bg-[#e0e0e0] active:scale-[0.97]"
        >
          Back
        </button>
      )}
      <div className="flex items-center gap-xs font-grotesk text-grotesk leading-grotesk text-primary">
        {breadcrumb.map((item, i) => (
          <span key={i} className="whitespace-nowrap">
            <span
              onClick={i === 0 && onHomeClick ? onHomeClick : undefined}
              className={i === 0 && onHomeClick ? 'cursor-pointer hover:underline' : ''}
            >
              {item}
            </span>
            {i < breadcrumb.length - 1 && <span className="ml-xs">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
