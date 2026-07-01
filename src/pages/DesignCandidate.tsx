import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import CardTop from '../components/organisms/CardTop';
import Btn from '../components/molecules/Btn';
import Bar from '../components/molecules/Bar';
import Dropdown from '../components/molecules/Dropdown';
import Profile from '../components/molecules/Profile';

const STAGES = ['Applied', 'Interviewed', 'Onboarding', 'Half-term', 'Common', 'Leads team', 'Minus one', 'C-level', 'Fired'];

const EXPERIENCES = [
  {
    period: 'Mar 2021 — Dec 2021 (9 months)',
    title: 'Senior Frontend Developer',
    company: 'WebInnovate Inc.',
    desc: 'Developed interactive web components, collaborated with designers, and enhanced user experience.',
  },
  {
    period: 'Jan 2022 — Jun 2023 (1.5 years)',
    title: 'Lead Frontend Engineer',
    company: 'TechVision Solutions',
    desc: 'Led a team of 5 developers, architected the migration to React, and improved performance by 40%.',
  },
  {
    period: 'Jul 2023 — Present',
    title: 'Principal Engineer',
    company: 'CloudScale Systems',
    desc: 'Driving technical strategy across product teams and mentoring senior engineers.',
  },
];

const SKILLS = ['Vue.JS', 'Angular', 'Svelte', 'Ember.JS', 'Backbone.JS'];

const PROJECTS = [
  {
    title: 'Mobile-responsive online marketplace using Flutter and Django',
    tags: ['Flutter', 'Django', 'PostgreSQL', 'REST API'],
  },
  {
    title: 'Real-time analytics dashboard with WebSocket and D3.js',
    tags: ['React', 'D3.js', 'WebSocket', 'Node.js'],
  },
  {
    title: 'Microservices platform migration and infrastructure automation',
    tags: ['Kubernetes', 'Terraform', 'Go', 'Docker'],
  },
];

const ASSESSMENTS = [
  { label: 'Technical skills', value: 89 },
  { label: 'Communication',    value: 89 },
  { label: 'Productivity',     value: 89 },
  { label: 'Adaptivity',       value: 89 },
];

const INTERVIEWERS = [
  { name: 'Michael Lee',   role: 'Product Manager', bg: 'bg-on-red'   },
  { name: 'Emily Carter',  role: 'UX Designer',     bg: 'bg-on-green' },
  { name: 'David Smith',   role: 'Data Analyst',    bg: 'bg-on-yd'    },
];

type CandidateState = { name?: string; role?: string };

export default function DesignCandidate() {
  const navigate  = useNavigate();
  const { state } = useLocation() as { state: CandidateState | null };

  const name = state?.name ?? 'Michael Thompson';
  const role = state?.role ?? 'Product Manager';

  return (
    <div className="min-h-screen bg-base">
      <Header showSecondRow secondRowType="default" showBack showBar={false} transparent onBack={() => navigate(-1)} onHomeClick={() => navigate('/design')} />

      {/* Stage stepper */}
      <div className="flex flex-col gap-[8px] pt-m px-m pb-xxs">
        <Bar value={12} cols={150} fillClass="bg-bar" />
        <div className="flex justify-between">
          {STAGES.map(s => (
            <span key={s} className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">{s}</span>
          ))}
        </div>
      </div>

      <div className="max-w-[830px] mx-auto flex flex-col gap-xxs pb-xxl pt-xxs">

        {/* CardTop */}
        <CardTop type="default" name={name} role={role} />

        {/* First Work Day */}
        <div className="bg-card-white rounded-l p-x flex items-end justify-between gap-l">
          <Dropdown
            showHeadline
            headline="First work day"
            value="01.09.2025"
            options={['01.09.2025', '15.09.2025', '01.10.2025', '15.10.2025']}
            theme="default"
          />
          <div className="flex gap-xxxs shrink-0">
            <Btn btnType="small" label="Hire" onClick={() => navigate('/design/negotiate', { state: { name, role } })} />
            <Btn btnType="secondary" label="Reject" />
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Work Experience</span>
          <div className="flex flex-col w-full">
            {EXPERIENCES.map((e, i) => (
              <div key={i} className="flex flex-col gap-x border-t border-lines py-s">
                <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{e.period}</span>
                <div className="flex flex-col gap-s">
                  <span className="font-grotesk text-h3 leading-h3 text-primary">{e.title}</span>
                  <div className="flex flex-col gap-[8px]">
                    <span className="font-grotesk text-grotesk text-primary">{e.company}</span>
                    <span className="font-grotesk text-grotesk text-secondary">{e.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Skills */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Tech Skills</span>
          <div className="flex gap-xxxs flex-wrap">
            {SKILLS.map(s => (
              <div key={s} className="h-8 inline-flex items-center justify-center px-xs rounded-s bg-on-yd">
                <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Key Projects</span>
          <div className="flex flex-col w-full">
            {PROJECTS.map((p, i) => (
              <div key={i} className="flex flex-col gap-x border-t border-lines py-s">
                <span className="font-grotesk text-h3 leading-h3 text-primary">{p.title}</span>
                <div className="flex gap-xxxs flex-wrap">
                  {p.tags.map(t => (
                    <div key={t} className="h-8 inline-flex items-center justify-center px-xs rounded-s bg-on-yd">
                      <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Results */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Assessment Results</span>
          <div className="grid grid-cols-2 gap-x gap-y-l">
            {ASSESSMENTS.map(a => (
              <div key={a.label} className="flex flex-col gap-xs">
                <div className="flex justify-between items-center">
                  <span className="font-grotesk text-h3 leading-h3 text-primary">{a.label}</span>
                  <span className="font-pixel text-pixel tracking-[2px] text-secondary">{a.value}%</span>
                </div>
                <Bar value={a.value} cols={80} fillClass="bg-tech-green" />
              </div>
            ))}
          </div>
        </div>

        {/* Interview History */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Interview History</span>
          <div className="flex gap-xxxs flex-wrap">
            {INTERVIEWERS.map(p => (
              <Profile key={p.name} size="short" name={p.name} role={p.role} className={p.bg} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
