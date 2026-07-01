import Topmenu from './Topmenu';
import SecondRow from './SecondRow';
import Bar from '../molecules/Bar';

type HeaderProps = {
  filter?: 'all' | 'templates' | 'off';
  onFilterChange?: (filter: 'all' | 'templates' | 'off') => void;
  onBack?: () => void;
  onHomeClick?: () => void;
  secondRowType?: 'default' | 'builder';
  showSecondRow?: boolean;
  showBack?: boolean;
  showBar?: boolean;
  transparent?: boolean;
  className?: string;
};

export default function Header({
  filter = 'all',
  onFilterChange,
  onBack,
  onHomeClick,
  secondRowType = 'default',
  showSecondRow = true,
  showBack = true,
  showBar = true,
  transparent = false,
  className,
}: HeaderProps) {
  return (
    <div className={`flex flex-col w-full ${transparent ? 'bg-transparent' : 'bg-[#6b6b6b]'} ${className ?? ''}`}>
      <Topmenu filter={filter} onFilterChange={onFilterChange} />
      {showSecondRow && <SecondRow type={secondRowType} onBack={onBack} onHomeClick={onHomeClick} showBack={showBack} />}
      {showBar && (
        <div className="w-full overflow-hidden">
          <Bar size="big" value={75} cols={200} />
        </div>
      )}
    </div>
  );
}
