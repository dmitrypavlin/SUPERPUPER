import Avatar from './Avatar';
import Status from './Status';
import Bar from './Bar';

type ProfileProps = {
  size?: 'long' | 'short' | 'short-outlined';
  name?: string;
  role?: string;
  status?: 'purple' | 'green' | 'red' | 'stopped';
  progress?: number;
  onClick?: () => void;
  className?: string;
};

export default function Profile({
  size = 'long',
  name = 'Sarah Johnson',
  role = 'Senior Developer',
  status = 'green',
  progress = 75,
  onClick,
  className,
}: ProfileProps) {
  if (size === 'long') {
    return (
      <div onClick={onClick} className={`flex gap-s items-start py-s border-b border-lines cursor-pointer transition-all duration-150 ease-out hover:brightness-[0.96] active:brightness-[0.91] active:scale-[0.99] ${className ?? ''}`}>
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
    <div onClick={onClick} className={`flex w-fit gap-s items-start p-s rounded-s cursor-pointer transition-all duration-150 ease-out hover:brightness-[0.96] active:brightness-[0.91] active:scale-[0.99] ${bg} ${className ?? ''}`}>
      <Avatar variant="katya" className="mix-blend-multiply shrink-0" />
      <div className="flex-[1_0_0] flex flex-col gap-xs min-w-px">
        <span className="font-grotesk text-h3 leading-h3 text-primary">{name}</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{role}</span>
      </div>
    </div>
  );
}
