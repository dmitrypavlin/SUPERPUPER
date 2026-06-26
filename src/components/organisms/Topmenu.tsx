import Btn from '../molecules/Btn';
import MenuSwitch from '../molecules/MenuSwitch';

type TopmenuFilter = 'all' | 'templates' | 'off';

type TopmenuProps = {
  appName?: string;
  filter?: TopmenuFilter;
  onFilterChange?: (filter: TopmenuFilter) => void;
  onProfile?: () => void;
  onLogout?: () => void;
  className?: string;
};

export default function Topmenu({
  appName = 'Hired & Wired',
  filter = 'all',
  onFilterChange,
  onProfile,
  onLogout,
  className,
}: TopmenuProps) {
  const handleAll = () => onFilterChange?.(filter === 'all' ? 'off' : 'all');
  const handleTemplates = () => onFilterChange?.(filter === 'templates' ? 'off' : 'templates');

  return (
    <div className={`flex items-center justify-between px-m py-s border-b border-white/20 w-full ${className ?? ''}`}>
      <div className="flex items-center gap-xxl">
        <span className="font-antiqa text-[23px] text-primary whitespace-nowrap leading-normal">
          {appName}
        </span>
        <div className="flex items-center gap-m">
          <Btn btnType="on-color" label="Generate report" />
          <div className="flex items-center gap-xxxs">
            <MenuSwitch text="All teams"     active={filter === 'all'}       onClick={handleAll} />
            <MenuSwitch text="All templates" active={filter === 'templates'} onClick={handleTemplates} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-xs">
        <button onClick={onProfile} className="font-grotesk text-grotesk leading-grotesk text-primary whitespace-nowrap">
          Profile
        </button>
        <button onClick={onLogout} className="font-grotesk text-grotesk leading-grotesk text-primary whitespace-nowrap">
          Log out
        </button>
      </div>
    </div>
  );
}
