import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Btn from '../components/molecules/Btn';
import SwitchGroup from '../components/molecules/SwitchGroup';
import Status from '../components/molecules/Status';

const IMG_BG_1 = 'https://www.figma.com/api/mcp/asset/02756529-fa56-4d72-b882-57ec9e436084';
const IMG_BG_2 = 'https://www.figma.com/api/mcp/asset/2c9ac606-b51c-4017-a1db-61b7a6fd5ffe';

type Stat = { label: string; value: number };
type Campaign = { name: string; stats: Stat[] };

const CAMPAIGNS: Campaign[] = [
  {
    name: 'Forward Architect',
    stats: [
      { label: 'Applied',      value: 45  },
      { label: 'Rejected',     value: 12  },
      { label: 'In Progress',  value: 98  },
      { label: 'Final Round',  value: 112 },
      { label: 'Offers Sent',  value: 6   },
    ],
  },
  {
    name: 'District Integration Engineer',
    stats: [
      { label: 'Applied',      value: 78 },
      { label: 'Rejected',     value: 7  },
      { label: 'In Progress',  value: 89 },
      { label: 'Final Round',  value: 34 },
      { label: 'Offers Sent',  value: 1  },
    ],
  },
  {
    name: 'Dynamic Program Liaison',
    stats: [
      { label: 'Applied',      value: 23  },
      { label: 'Rejected',     value: 678 },
      { label: 'In Progress',  value: 8   },
      { label: 'Final Round',  value: 90  },
      { label: 'Offers Sent',  value: 45  },
    ],
  },
  {
    name: 'Product Tactics Manager',
    stats: [
      { label: 'Applied',      value: 15  },
      { label: 'Rejected',     value: 5   },
      { label: 'In Progress',  value: 167 },
      { label: 'Final Round',  value: 90  },
      { label: 'Offers Sent',  value: 2   },
    ],
  },
];

type TeamState = { name?: string; highlight?: string };

export default function DesignTeamCampaigns() {
  const navigate  = useNavigate();
  const { state } = useLocation() as { state: TeamState | null };

  const teamName = state?.name ?? 'Engineering Team';

  return (
    <div className="min-h-screen bg-base">

      {/* Hero */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-base" />
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={IMG_BG_1} />
          <img alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-plus-lighter" src={IMG_BG_2} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base" />
        </div>

        <Header
          showSecondRow
          secondRowType="default"
          showBack
          showBar={false}
          transparent
          onBack={() => navigate(-1)}
          onHomeClick={() => navigate('/design')}
          className="relative z-10"
        />

        <div className="max-w-[830px] mx-auto relative flex flex-col gap-[120px] items-center justify-end h-[480px] pb-x px-x">
          <div className="flex flex-col gap-x items-center w-[754px] shrink-0 text-center">
            <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full">
              {teamName}
            </span>
            <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-primary leading-normal w-full">
              Detailed team overview<br />and performance metrics
            </span>
            <Btn btnType="small" label="Add campaign" className="mt-x" onClick={() => navigate('/design/campaign/add')} />
          </div>

          <SwitchGroup
            tabs={['Team', 'Campaigns', 'Access']}
            active={1}
            onChange={(idx) => {
              if (idx === 0) navigate('/design/team', { state });
            }}
            className="shrink-0"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[830px] mx-auto flex flex-col gap-xxs pb-xxl mt-xxs">

        {/* Notify */}
        <div className="bg-card-green rounded-l p-x">
          <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-green leading-normal">
            This month, the hiring funnel saw 250 applicants, 50 interviews, and 10 new hires.
          </span>
        </div>

        {/* Campaign cards */}
        {CAMPAIGNS.map(c => (
          <div
            key={c.name}
            onClick={() => navigate('/design/campaign', { state: { campaignName: c.name } })}
            className="bg-card-white rounded-l p-x flex flex-col gap-l cursor-pointer transition-all duration-150 ease-out hover:brightness-[0.96] active:brightness-[0.91] active:scale-[0.99]"
          >

            {/* Header row */}
            <div className="flex items-center justify-between w-full">
              <span className="font-antiqa text-h2 leading-h2 text-primary">{c.name}</span>
              <div className="flex items-center gap-s">
                <Status type="green" label="Active" />
                <Btn btnType="secondary" label="More info" />
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-l">
              {c.stats.map(s => (
                <div key={s.label} className="flex flex-col gap-xxs">
                  <span className="font-antiqa text-[70px] leading-none text-primary">{s.value}</span>
                  <span className="font-pixel text-pixel tracking-[2px] uppercase text-secondary">{s.label}</span>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
