import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Btn from '../components/molecules/Btn';
import SwitchGroup from '../components/molecules/SwitchGroup';
import CardMetricGraph from '../components/molecules/CardMetricGraph';
import Team from '../components/molecules/Team';
import Profile from '../components/molecules/Profile';
import Dropdown from '../components/molecules/Dropdown';

const IMG_BG_1 = 'https://www.figma.com/api/mcp/asset/02756529-fa56-4d72-b882-57ec9e436084';
const IMG_BG_2 = 'https://www.figma.com/api/mcp/asset/2c9ac606-b51c-4017-a1db-61b7a6fd5ffe';

const STATS = [
  { title: 'Health',       label: 'Overall: Good',    bars: [{ height: 82 }, { height: 48 }], bg: 'bg-card-red'    },
  { title: 'Productivity', label: '+12% This Month',  bars: [{ height: 82 }, { height: 48 }], bg: 'bg-card-pink'   },
  { title: 'Distribution', label: '8 Teams Active',   bars: [{ height: 82 }, { height: 48 }], bg: 'bg-card-violet' },
  { title: 'Hiring',       label: '15 Open Position', bars: [{ height: 82 }, { height: 48 }], bg: 'bg-card-yellow' },
];

const TEAMS = [
  { name: 'Engineering Team', count: 24, productivity: 89, highlight: 'Petya was drinking too much tea this week',  extraCount: 21 },
  { name: 'Design Team',      count: 12, productivity: 76, highlight: 'Sarah proposed a new design system',          extraCount: 8  },
  { name: 'Product Team',     count: 8,  productivity: 92, highlight: 'Launched the new roadmap planning session',  extraCount: 5  },
  { name: 'Marketing Team',   count: 16, productivity: 68, highlight: 'Q3 campaign exceeded targets by 15%',        extraCount: 12 },
  { name: 'Data Team',        count: 10, productivity: 83, highlight: 'Completed migration to new data warehouse',  extraCount: 6  },
  { name: 'Operations Team',  count: 20, productivity: 79, highlight: 'Onboarded 4 new team members this week',     extraCount: 16 },
];

const STATUS_FILTERS = ['All', 'Onboarding', 'Rocket Growth', 'Failing', 'Fired'];

const EMPLOYEES: { name: string; role: string; status: 'green' | 'purple' | 'red' | 'stopped'; progress: number }[] = [
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

const CURATOR_OPTIONS = ['Alex Kim', 'Maria Chen', 'Tom Evans', 'Sarah Mitchell'];

export default function Design() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'templates' | 'off'>('all');
  const [activeTab, setActiveTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState(1);

  return (
    <div className="min-h-screen bg-base">

      {/* Hero area: transparent header + hero content share one background */}
      <div className="relative w-full overflow-hidden">
        {/* Full-width layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-base" />
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={IMG_BG_1} />
          <img alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-plus-lighter" src={IMG_BG_2} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base" />
        </div>

        {/* Transparent header: relative z-10 so it sits above the absolute background layer */}
        <Header filter={filter} onFilterChange={setFilter} showSecondRow={false} showBack={false} showBar={false} transparent className="relative z-10" />

        {/* Hero content: centered 830px column, pushed to bottom via justify-end */}
        <div className="max-w-[830px] mx-auto relative flex flex-col gap-[160px] items-center justify-end min-h-[480px] pt-x pb-x px-x">
          {/* title + description + cta */}
          <div className="flex flex-col gap-x items-center w-[754px] shrink-0">
            <div className="flex flex-col gap-x items-start text-center w-full">
              <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full text-center">
                All teams
              </span>
              <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-primary leading-normal w-full text-center">
                Overview of all teams<br />and their performance metrics
              </span>
            </div>
            <Btn btnType="small" label={activeTab === 1 ? 'Add employee' : 'Add team'} />
          </div>

          {/* switch group at bottom */}
          <SwitchGroup
            tabs={['Overview', 'Employees', 'Report']}
            active={activeTab}
            onChange={setActiveTab}
            className="shrink-0"
          />
        </div>
      </div>

      {activeTab === 0 && (
        <div className="max-w-[830px] mx-auto flex flex-col gap-xxs pb-xxl">

          {/* Stats row */}
          <div className="flex gap-xxs">
            {STATS.map(s => (
              <CardMetricGraph
                key={s.title}
                title={s.title}
                label={s.label}
                bars={s.bars}
                bg={s.bg}
                className="flex-1 min-w-0 w-auto"
              />
            ))}
          </div>

          {/* Teams grid */}
          <div className="grid grid-cols-2 gap-xxs">
            {TEAMS.map(t => (
              <Team
                key={t.name}
                name={t.name}
                count={t.count}
                productivity={t.productivity}
                highlight={t.highlight}
                extraCount={t.extraCount}
                onClick={() => navigate('/design/team', { state: { name: t.name, highlight: t.highlight } })}
              />
            ))}
          </div>

        </div>
      )}

      {activeTab === 1 && (
        <div className="max-w-[830px] mx-auto pb-xxl">
          <div className="bg-card-white rounded-l flex flex-col gap-l p-x">

            {/* Filter row */}
            <div className="flex items-start justify-between w-full">
              <div className="flex items-center gap-xxs flex-wrap">
                <span className="font-pixel text-pixel tracking-[2px] uppercase text-secondary mr-xs">Status:</span>
                {STATUS_FILTERS.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(i)}
                    className={`h-8 inline-flex items-center px-s rounded-over font-pixel text-pixel tracking-[2px] uppercase transition-all duration-150 ease-out hover:brightness-95 active:scale-[0.97] ${
                      statusFilter === i
                        ? 'bg-primary text-on-color'
                        : 'border border-lines text-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Dropdown showHeadline={false} value="Chose Curator" options={CURATOR_OPTIONS} />
            </div>

            {/* Profile list */}
            <div className="flex flex-col w-full">
              {EMPLOYEES.map(e => (
                <Profile
                  key={e.name}
                  name={e.name}
                  role={e.role}
                  status={e.status}
                  progress={e.progress}
                  onClick={() => navigate('/design/employee', { state: { name: e.name, role: e.role } })}
                />
              ))}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
