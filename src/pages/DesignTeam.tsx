import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import SwitchGroup from '../components/molecules/SwitchGroup';
import Profile from '../components/molecules/Profile';

const IMG_BG_1 = 'https://www.figma.com/api/mcp/asset/02756529-fa56-4d72-b882-57ec9e436084';
const IMG_BG_2 = 'https://www.figma.com/api/mcp/asset/2c9ac606-b51c-4017-a1db-61b7a6fd5ffe';

const MEMBERS: { name: string; role: string; status: 'green' | 'purple' | 'red' | 'stopped'; progress: number }[] = [
  { name: 'Sarah Johnson',   role: 'Senior Developer',     status: 'green',  progress: 75 },
  { name: 'Michael Smith',   role: 'Product Manager',      status: 'purple', progress: 60 },
  { name: 'Emily Davis',     role: 'UX Designer',          status: 'green',  progress: 65 },
  { name: 'David Brown',     role: 'QA Engineer',          status: 'purple', progress: 55 },
  { name: 'Linda Garcia',    role: 'Data Analyst',         status: 'green',  progress: 62 },
  { name: 'James Wilson',    role: 'Software Engineer',    status: 'red',    progress: 50 },
  { name: 'Alice Thompson',  role: 'Marketing Specialist', status: 'green',  progress: 58 },
  { name: 'Robert Martinez', role: 'Sales Executive',      status: 'red',    progress: 45 },
  { name: 'Jessica Taylor',  role: 'Content Strategist',  status: 'green',  progress: 70 },
  { name: 'Charles Lee',     role: 'Systems Analyst',      status: 'red',    progress: 48 },
];

type TeamState = {
  name?: string;
  highlight?: string;
};

export default function DesignTeam() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: TeamState | null };

  const teamName  = state?.name      ?? 'Engineering Team';
  const highlight = state?.highlight ?? 'Kai finished the UI designs, Anya onboarded 3 new hires, and the team had a successful offsite event.';

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

        <div className="max-w-[830px] mx-auto relative flex flex-col gap-[160px] items-center justify-end h-[480px] pb-x px-x">
          <div className="flex flex-col gap-x items-center w-[754px] shrink-0 text-center">
            <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full">
              {teamName}
            </span>
            <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-primary leading-normal w-full">
              Detailed team overview<br />and performance metrics
            </span>
          </div>

          <SwitchGroup
            tabs={['Team', 'Campaigns', 'Access']}
            active={0}
            onChange={(idx) => {
              if (idx === 1) navigate('/design/team/campaigns', { state: { name: teamName, highlight } });
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
            {highlight}
          </span>
        </div>

        {/* Team list */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-m">
          <span className="font-grotesk text-h3 leading-h3 text-primary">Team</span>
          <div className="flex flex-col w-full">
            {MEMBERS.map(m => (
              <Profile
                key={m.name}
                name={m.name}
                role={m.role}
                status={m.status}
                progress={m.progress}
                onClick={() => navigate('/design/employee', { state: { name: m.name, role: m.role } })}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
