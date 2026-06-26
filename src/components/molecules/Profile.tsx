import Avatar from './Avatar';
import Status from './Status';
import Bar from './Bar';

type ProfileProps = {
  size?: 'long' | 'short' | 'short-outlined';
  name?: string;
  role?: string;
  status?: 'purple' | 'green' | 'red' | 'stopped';
  progress?: number;
  className?: string;
};

export default function Profile({
  size = 'long',
  name = 'Sarah Johnson',
  role = 'Senior Developer',
  status = 'green',
  progress = 75,
  className,
}: ProfileProps) {
  if (size === 'long') {
    return (
      <div className={`flex gap-s items-start py-s border-b border-lines ${className ?? ''}`}>
        <Avatar variant="katya" />
        <div className="flex items-start justify-between shrink-0 w-[333px]">
          <div className="flex flex-col gap-xs">
            <span className="font-grotesk text-h3 leading-h3 text-primary">{name}</span>
            <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{role}</span>
          </div>
          <Status type={status} />
        </div>
        <div className="flex-1 overflow-hidden">
          <Bar value={progress} cols={150} fillClass="bg-tech-green" />
        </div>
      </div>
    );
  }

  const bg = size === 'short' ? 'bg-on-red' : 'bg-control';
  return (
    <div className={`flex w-fit gap-s items-start p-s rounded-s ${bg} ${className ?? ''}`}>
      <Avatar variant="katya" className="mix-blend-multiply shrink-0" />
      <div className="flex-[1_0_0] flex flex-col gap-xs min-w-px">
        <span className="font-grotesk text-h3 leading-h3 text-primary">{name}</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{role}</span>
      </div>
    </div>
  );
}
