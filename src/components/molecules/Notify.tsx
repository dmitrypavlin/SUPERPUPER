import Btn from './Btn';

type NotifyProps = {
  text?: string;
  showBtn?: boolean;
  className?: string;
};

export default function Notify({
  text = 'Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.',
  showBtn = false,
  className,
}: NotifyProps) {
  return (
    <div className={`bg-card-green flex flex-col gap-s p-x rounded-l ${className ?? ''}`}>
      <p className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-tech-green leading-normal">
        {text}
      </p>
      {showBtn && <Btn btnType="on-color" label="More info" />}
    </div>
  );
}
