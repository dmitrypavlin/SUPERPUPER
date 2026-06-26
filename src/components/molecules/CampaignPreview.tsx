import Status from './Status';
import Btn from './Btn';

type CampaignStat = { value: string; label: string };

type CampaignPreviewProps = {
  title?: string;
  status?: 'purple' | 'green' | 'red' | 'stopped';
  stats?: CampaignStat[];
  className?: string;
};

const defaultStats: CampaignStat[] = [
  { value: '142', label: 'applied' },
  { value: '89',  label: 'rejected' },
  { value: '282', label: 'in progress' },
  { value: '31',  label: 'final round' },
  { value: '4',   label: 'offers sent' },
];

export default function CampaignPreview({
  title = 'Senior DevOps',
  status = 'green',
  stats = defaultStats,
  className,
}: CampaignPreviewProps) {
  return (
    <div className={`bg-card-white flex flex-col gap-xxl p-x rounded-l ${className ?? ''}`}>
      <div className="flex items-center justify-between w-full">
        <span className="font-antiqa text-h2 leading-h2 text-primary whitespace-nowrap">{title}</span>
        <div className="flex items-center gap-s">
          <Status type={status} />
          <Btn btnType="secondary" label="More info" />
        </div>
      </div>
      <div className="flex flex-col gap-xs w-full">
        <div className="flex items-end justify-between w-full">
          {stats.map((s, i) => (
            <span key={i} className="flex-1 min-w-0 font-antiqa text-h1 leading-[0.9] text-primary">
              {s.value}
            </span>
          ))}
        </div>
        <div className="flex items-start justify-between w-full">
          {stats.map((s, i) => (
            <span key={i} className="flex-1 min-w-0 font-grotesk text-caps tracking-[1.6px] uppercase text-primary">
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
