import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Task from '../components/organisms/Task';



const IMG_CARD  = 'https://www.figma.com/api/mcp/asset/4e51d8f6-40a3-4a9b-be7c-00ffcb9c41a3';
const IMG_CARD2 = 'https://www.figma.com/api/mcp/asset/d66df911-9eba-4ddc-aa8d-222b1b9e535e';

const TASKS: { state: 'pending' | 'done'; title: string; showError?: boolean; showBtn: boolean; btnLabel?: string; toWizard?: boolean }[] = [
  { state: 'pending', title: 'Confirm budget allocation',                   showBtn: false },
  { state: 'pending', title: 'Define role requirements and job description', showError: true, showBtn: true, btnLabel: 'Job description', toWizard: true },
  { state: 'done',    title: 'Post job to job boards',                       showBtn: true,  btnLabel: 'Job description', toWizard: true },
  { state: 'done',    title: 'Review applications',                          showBtn: true,  btnLabel: 'Review' },
  { state: 'done',    title: 'Conduct initial interviews',                   showBtn: false },
  { state: 'done',    title: 'Onboarding paperwork',                         showBtn: true,  btnLabel: 'Generate' },
];

export default function DesignCampaignAdd() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base">
      <Header
        showSecondRow
        secondRowType="default"
        showBack
        showBar={false}
        transparent
        onBack={() => navigate(-1)}
        onHomeClick={() => navigate('/design')}
      />

      <div className="max-w-[830px] mx-auto flex flex-col gap-xxs pb-xxl pt-xxs">

        {/* Hero card */}
        <div className="relative flex flex-col h-[480px] items-center justify-center rounded-l overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={IMG_CARD} />
            <div className="absolute inset-0 bg-black mix-blend-color" />
            <div className="absolute inset-0 bg-yellow mix-blend-hard-light" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-screen" src={IMG_CARD2} />
          </div>
          <div className="relative flex flex-col gap-x items-center text-center w-[754px]">
            <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full">
              New Campaign Start
            </span>
            <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-brown leading-normal w-full mt-xxs">
              Active Campaign
            </span>
          </div>
        </div>

        {/* Task block */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">Task</span>
          <div className="flex flex-col">
            {TASKS.map((t, i) => (
              <Task
                key={t.title}
                state={t.state}
                title={t.title}
                showError={t.showError ?? false}
                showBtn={t.showBtn}
                btnLabel={t.btnLabel}
                onBtnClick={t.toWizard ? () => navigate('/design/campaign/wizard') : undefined}
                className={i === TASKS.length - 1 ? 'border-b-0' : ''}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
