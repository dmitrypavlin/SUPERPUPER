type BtnType = 'secondary' | 'on-color' | 'small' | 'big' | 'node';
export type BtnForceState = 'hover' | 'pressed';

type BtnProps = {
  btnType?: BtnType;
  label?: string;
  subLabel?: string;
  onClick?: () => void;
  forceState?: BtnForceState;
  className?: string;
};

// All full class names must appear in source for Tailwind v4 to include them.
const interactiveCls: Record<BtnType, { real: string; hover: string; pressed: string }> = {
  secondary: {
    real:    'bg-control hover:bg-[#d5d5d5] active:bg-[#c0c0c0] active:scale-[0.97]',
    hover:   'bg-[#d5d5d5]',
    pressed: 'bg-[#c0c0c0] scale-[0.97]',
  },
  'on-color': {
    real:    'bg-white hover:bg-[#f0f0f0] active:bg-[#e0e0e0] active:scale-[0.97]',
    hover:   'bg-[#f0f0f0]',
    pressed: 'bg-[#e0e0e0] scale-[0.97]',
  },
  small: {
    real:    'bg-black hover:bg-[#2a2a2a] active:bg-[#444] active:scale-[0.97]',
    hover:   'bg-[#2a2a2a]',
    pressed: 'bg-[#444] scale-[0.97]',
  },
  big: {
    real:    'bg-black hover:bg-[#2a2a2a] active:bg-[#444] active:scale-[0.97]',
    hover:   'bg-[#2a2a2a]',
    pressed: 'bg-[#444] scale-[0.97]',
  },
  node: {
    real:    'bg-on-red hover:bg-[#f0c9c4] active:bg-[#e8b3ac] active:scale-[0.97]',
    hover:   'bg-[#f0c9c4]',
    pressed: 'bg-[#e8b3ac] scale-[0.97]',
  },
};

const TRANSITION = 'transition-all duration-150 ease-out';

export default function Btn({
  btnType = 'secondary',
  label = 'More info',
  subLabel = 'more info',
  onClick,
  forceState,
  className,
}: BtnProps) {
  const cls = interactiveCls[btnType];
  const stateCls = forceState ? cls[forceState] : cls.real;

  if (btnType === 'big') {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-over px-s pt-s pb-m ${TRANSITION} ${stateCls} ${className ?? ''}`}
      >
        <span className="font-antiqa text-h2 leading-h2 text-[#f2f2f2] whitespace-nowrap">
          {label}
        </span>
      </button>
    );
  }

  if (btnType === 'node') {
    return (
      <button
        onClick={onClick}
        className={`inline-flex flex-col gap-xs items-start p-s rounded-s ${TRANSITION} ${stateCls} ${className ?? ''}`}
      >
        <span className="font-grotesk text-grotesk leading-grotesk text-black">{label}</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{subLabel}</span>
      </button>
    );
  }

  const textColor = btnType === 'small' ? 'text-[#f2f2f2]' : 'text-primary';

  return (
    <button
      onClick={onClick}
      className={`h-8 inline-flex items-center justify-center px-s py-xs rounded-over ${TRANSITION} ${stateCls} ${className ?? ''}`}
    >
      <span className={`font-pixel text-pixel tracking-[2px] uppercase whitespace-nowrap ${textColor}`}>
        {label}
      </span>
    </button>
  );
}
