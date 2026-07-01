import { useState } from 'react';
import Flag from '../molecules/Flag';
import ErrorMsg from '../molecules/ErrorMsg';
import Btn from '../molecules/Btn';

type TaskState = 'pending' | 'done';

type TaskProps = {
  state?: TaskState;
  title?: string;
  errorText?: string;
  showError?: boolean;
  showBtn?: boolean;
  btnLabel?: string;
  onBtnClick?: () => void;
  className?: string;
};

export default function Task({
  state = 'pending',
  title = 'Define role requirements and job description',
  errorText = 'Some field need your attention',
  showError = true,
  showBtn = true,
  btnLabel = 'Job description',
  onBtnClick,
  className,
}: TaskProps) {
  const [flagged, setFlagged] = useState(state === 'pending');

  return (
    <div className={`flex gap-s items-start py-s border-b border-lines w-full ${className ?? ''}`}>
      <Flag active={flagged} onClick={() => setFlagged(v => !v)} className="shrink-0 mt-[2px]" />
      <div className="flex flex-col gap-[10px] items-start">
        <span
          className={`font-grotesk text-h3 leading-h3 tracking-[-0.4px] whitespace-nowrap ${
            flagged ? 'text-secondary' : 'text-primary'
          }`}
        >
          {title}
        </span>
        {showError && <ErrorMsg text={errorText} />}
        {showBtn && <Btn btnType="secondary" label={btnLabel} onClick={onBtnClick} />}
      </div>
    </div>
  );
}
