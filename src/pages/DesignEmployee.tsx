import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import CardTop from '../components/organisms/CardTop';
import Btn from '../components/molecules/Btn';
import Bar from '../components/molecules/Bar';
import Profile from '../components/molecules/Profile';

const STAGES = ['Applied', 'Interviewed', 'Onboarding', 'Half-term', 'Common', 'Leads team', 'Minus one', 'C-level', 'Fired'];

const ACHIEVEMENTS = [
  { name: 'Top performer', period: 'Q4 2024' },
  { name: 'Team player',   period: 'Q4 2024' },
  { name: 'Innovator',     period: 'Q4 2023' },
  { name: 'Mentor',        period: 'Q4 2025' },
];

const REPORTS_TO = [
  { name: 'Michael Lee',   role: 'Product Manager', bg: 'bg-on-red'   },
  { name: 'Emily Carter',  role: 'UX Designer',     bg: 'bg-on-green' },
  { name: 'David Smith',   role: 'Data Analyst',    bg: 'bg-on-yd'    },
];

const MENTORING = [
  { name: 'Michael Thompson', role: 'Project Manager', bg: 'bg-on-red'   },
  { name: 'Emily Davis',      role: 'UX Designer',     bg: 'bg-on-green' },
  { name: 'James Wilson',     role: 'Data Analyst',    bg: 'bg-on-yd'    },
];

type EmployeeState = { name?: string; role?: string };

export default function DesignEmployee() {
  const navigate  = useNavigate();
  const { state } = useLocation() as { state: EmployeeState | null };

  const name = state?.name ?? 'Sarah Mitchell';
  const role = state?.role ?? 'Senior Software Engineer';

  return (
    <div className="min-h-screen bg-base">
      <Header showSecondRow secondRowType="default" showBack showBar={false} transparent onBack={() => navigate(-1)} onHomeClick={() => navigate('/design')} />

      {/* Stage stepper */}
      <div className="flex flex-col gap-[8px] pt-m px-m pb-xxs">
        <Bar value={33} cols={150} fillClass="bg-bar" />
        <div className="flex justify-between">
          {STAGES.map(s => (
            <span key={s} className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">{s}</span>
          ))}
        </div>
      </div>

      <div className="max-w-[830px] mx-auto flex flex-col gap-xxs pb-xxl pt-xxs">

        {/* CardTop */}
        <CardTop type="default" name={name} role={role} />

        {/* Notify */}
        <div className="bg-card-green rounded-l p-x">
          <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-green leading-normal">
            Sarah finalized the UX flows, Anya trained three junior engineers, and the team enjoyed a ski trip.
          </span>
        </div>

        {/* Achievements */}
        <div className="bg-card-yellow rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-yellow-dark">Achievements</span>
          <div className="flex items-start justify-between w-full py-s">
            {ACHIEVEMENTS.map(a => (
              <div key={a.name} className="flex flex-col gap-xs">
                <span className="font-grotesk text-h3 leading-h3 text-yellow-dark">{a.name}</span>
                <span className="font-pixel text-pixel tracking-[2px] uppercase text-yellow-dark">{a.period}</span>
              </div>
            ))}
          </div>
          <button className="h-8 inline-flex items-center justify-center px-s rounded-over bg-on-yd transition-all duration-150 ease-out hover:brightness-95 active:scale-[0.97]">
            <span className="font-pixel text-pixel tracking-[2px] uppercase text-yellow-dark">All achievements</span>
          </button>
        </div>

        {/* Personal Development */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Personal Development</span>

          <div className="flex flex-col gap-xs w-full">
            <Bar value={50} cols={150} fillClass="bg-tech-green" />
            <div className="flex justify-between w-full">
              {['Onboarding', 'Adapting', 'Performing', 'Ready'].map(s => (
                <span key={s} className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">{s}</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-s">
            <div className="flex flex-col gap-xxs">
              <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">Next Level</span>
              <span className="font-grotesk text-h3 leading-h3 text-primary">Lead Software Engineer</span>
            </div>
            <div className="flex flex-col gap-xxs">
              <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">Prediction:</span>
              <span className="font-grotesk text-h3 leading-h3 text-primary">February 2026</span>
            </div>
          </div>

          <Btn btnType="secondary" label="More info" />
        </div>

        {/* Reports to + Mentoring */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-xxl">
          <div className="flex flex-col gap-l">
            <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Reports to</span>
            <div className="flex gap-xxxs flex-wrap">
              {REPORTS_TO.map(p => (
                <Profile key={p.name} size="short" name={p.name} role={p.role} className={p.bg} />
              ))}
            </div>
            <Btn btnType="secondary" label="Org. Chart" />
          </div>
          <div className="flex flex-col gap-l">
            <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Mentoring:</span>
            <div className="flex gap-xxxs flex-wrap">
              {MENTORING.map(p => (
                <Profile key={p.name} size="short" name={p.name} role={p.role} className={p.bg} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
