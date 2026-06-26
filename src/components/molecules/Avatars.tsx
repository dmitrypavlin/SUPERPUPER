import Avatar from './Avatar';

type AvatarsProps = { className?: string };

export default function Avatars({ className }: AvatarsProps) {
  return (
    <div className={`flex items-center ${className ?? ''}`}>
      <Avatar variant="katya" className="z-[3] -mr-2" />
      <Avatar variant="petya" className="z-[2] -mr-2" />
      <Avatar variant="dog"   className="z-[1]" />
    </div>
  );
}
