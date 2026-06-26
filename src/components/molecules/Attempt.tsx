import Status from './Status';

type AttemptOffer = {
  salary: string;
  perks: string[];
};

type AttemptProps = {
  type?: 'first' | 'next';
  left?: AttemptOffer;
  right?: AttemptOffer;
  className?: string;
};

const defaultFirst = {
  left:  { salary: '$8 750',  perks: ['Lead Role', 'Cookies', 'Free Education'] },
  right: { salary: '$12 750', perks: ['Lead Role', 'Remote-work', 'Gym'] },
};

const defaultNext = {
  left:  { salary: '$?', perks: ['Lead Role', 'Cookies', 'Gym'] },
  right: { salary: '$?', perks: ['Lead Role', 'Cookies', 'Gym'] },
};

export default function Attempt({
  type = 'first',
  left,
  right,
  className,
}: AttemptProps) {
  const defaults = type === 'first' ? defaultFirst : defaultNext;
  const leftOffer  = left  ?? defaults.left;
  const rightOffer = right ?? defaults.right;

  return (
    <div className={`bg-card-white flex flex-col gap-l p-x rounded-l w-full ${className ?? ''}`}>
      <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">
        {type} attempt
      </span>
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-s w-[290px]">
          <span className="font-antiqa text-h2 leading-h2 text-primary">{leftOffer.salary}</span>
          <div className="flex flex-col gap-xs">
            {leftOffer.perks.map(p => (
              <span key={p} className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{p}</span>
            ))}
          </div>
        </div>

        {type === 'first' && (
          <Status type="red" label="failed" />
        )}

        <div className="flex flex-col gap-s w-[290px] items-end">
          <span className="font-antiqa text-h2 leading-h2 text-primary">{rightOffer.salary}</span>
          <div className="flex flex-col gap-xs items-start w-full">
            {rightOffer.perks.map(p => (
              <span key={p} className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
