type MenuSwitchProps = {
  active?: boolean;
  text?: string;
  onClick?: () => void;
  className?: string;
};

export default function MenuSwitch({ active = false, text = 'All teams', onClick, className }: MenuSwitchProps) {
  return (
    <button
      onClick={onClick}
      className={`h-8 flex items-center justify-center px-[10px] rounded-s font-grotesk text-grotesk leading-grotesk text-primary whitespace-nowrap transition-all duration-150 ${
        active ? 'border border-white' : 'border border-transparent'
      } ${className ?? ''}`}
    >
      {text}
    </button>
  );
}
