import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Btn from '../components/molecules/Btn';
import Dropdown from '../components/molecules/Dropdown';
import Kanban from '../components/organisms/Kanban';
import Task from '../components/organisms/Task';

const IMG_CARD = 'https://www.figma.com/api/mcp/asset/f6e00285-cf01-4909-93cc-a41900eba319';

const METRICS = [
  { title: 'Applications',     value: '142',   sub: 'Total received'     },
  { title: 'in Progress',      value: '28',    sub: 'Active candidates'  },
  { title: 'Conversion Rate',  value: '19.7%', sub: 'To interview stage' },
];

const TASKS: { state: 'pending' | 'done'; title: string; showBtn: boolean; btnLabel?: string; scrollTo?: string }[] = [
  { state: 'pending', title: 'Confirm budget allocation',                       showBtn: false },
  { state: 'pending', title: 'Define role requirements and job description',     showBtn: true,  btnLabel: 'Job description' },
  { state: 'pending', title: 'Post job to job boards',                           showBtn: true,  btnLabel: 'Job description' },
  { state: 'done',    title: 'Review applications',                              showBtn: true,  btnLabel: 'Review', scrollTo: 'pipeline' },
  { state: 'done',    title: 'Conduct initial interviews',                       showBtn: false },
  { state: 'done',    title: 'Onboarding paperwork',                             showBtn: true,  btnLabel: 'Generate' },
];

const FUNNEL = [
  { label: 'Applied',      value: 142 },
  { label: 'Rejected',     value: 89  },
  { label: 'In Progress',  value: 282 },
  { label: 'Final Round',  value: 31  },
  { label: 'Offers Sent',  value: 4   },
];

type CampaignState = { campaignName?: string };

export default function DesignCampaign() {
  const navigate  = useNavigate();
  const { state } = useLocation() as { state: CampaignState | null };

  const campaignName = state?.campaignName ?? 'Senior Frontend Developer Campaign';

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

        {/* Campaign hero card */}
        <div className="relative flex flex-col h-[480px] items-start justify-between p-x rounded-l">
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-l">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={IMG_CARD} />
            <div className="absolute inset-0 bg-black mix-blend-color" />
            <div className="absolute inset-0 bg-yellow mix-blend-hard-light" />
          </div>

          {/* Center: name + status + actions */}
          <div className="absolute inset-0 flex flex-col gap-x items-center justify-center px-x">
            <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full text-center">
              {campaignName}
            </span>
            <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-brown mt-xxs">
              Active Campaign
            </span>
            <div className="flex gap-xxxs mt-x">
              <Btn btnType="small"    label="Finish" />
              <Btn btnType="on-color" label="Cancel" />
            </div>
          </div>

          {/* Bottom tags */}
          <div className="relative mt-auto flex gap-xxxs items-center">
            <Dropdown
              showHeadline={false}
              theme="on-color"
              value="Docs for designers"
              options={['Docs for designers', 'Technical specs', 'Brand guidelines']}
            />
            <button className="h-8 inline-flex items-center justify-center px-s rounded-over bg-brown transition-all duration-150 ease-out hover:brightness-90 active:scale-[0.97]">
              <span className="font-pixel text-pixel tracking-[2px] uppercase text-on-color">Add</span>
            </button>
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
                showError={false}
                showBtn={t.showBtn}
                btnLabel={t.btnLabel}
                onBtnClick={t.scrollTo ? () => document.getElementById(t.scrollTo!)?.scrollIntoView({ behavior: 'smooth' }) : undefined}
                className={i === TASKS.length - 1 ? 'border-b-0' : ''}
              />
            ))}
          </div>
        </div>

        {/* 3 metric cards */}
        <div className="flex gap-xxs">
          {METRICS.map(m => (
            <div key={m.title} className="bg-card-white rounded-l p-x flex flex-col gap-l flex-1 min-w-0">
              <span className="font-antiqa text-h2 leading-h2 text-primary">{m.title}</span>
              <div className="flex flex-col gap-xxs">
                <span className="font-antiqa text-[70px] leading-none text-primary">{m.value}</span>
                <span className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{m.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Funnel card */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-xxl">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Funnel</span>
          <div className="flex flex-col gap-xs w-full">
            <div className="flex justify-between w-full">
              {FUNNEL.map(f => (
                <span key={f.label} className="flex-1 min-w-px font-antiqa text-h1 leading-[0.9] tracking-[-0.84px] text-primary">
                  {f.value}
                </span>
              ))}
            </div>
            <div className="flex justify-between w-full">
              {FUNNEL.map(f => (
                <span key={f.label} className="flex-1 min-w-px font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Pipeline / Kanban */}
      <div id="pipeline">
        <Kanban onPersonClick={(p) => navigate('/design/candidate', { state: { name: p.name, role: p.role } })} />
      </div>

    </div>
  );
}
