import { useState } from 'react';
import Btn from '../molecules/Btn';
import SwitchGroup from '../molecules/SwitchGroup';
import Dropdown from '../molecules/Dropdown';

const IMG_DEFAULT = 'https://www.figma.com/api/mcp/asset/f6e00285-cf01-4909-93cc-a41900eba319';
const IMG_VISUAL  = 'https://www.figma.com/api/mcp/asset/0615b380-f98f-47a7-8965-abe5a6c27926';

type CardTopType = 'default' | 'visual';

type CardTopTag = { text: string };

type CardTopProps = {
  type?: CardTopType;
  name?: string;
  role?: string;
  teams?: CardTopTag[];
  accessLevel?: string;
  actions?: string[];
  switchTabs?: string[];
  className?: string;
};

const DEFAULT_ACTIONS = ['Promote', 'Negotiate', 'Suspend', 'Fire'];
const DEFAULT_TEAMS   = [
  { text: 'Frontend Team' },
  { text: 'Innovation Lab' },
  { text: 'Lead Developer' },
  { text: 'Member' },
];
const CARD_TEAM_OPTIONS   = ['Frontend Team', 'Backend Team', 'Innovation Lab', 'Lead Developer', 'Member', 'Design'];
const CARD_ACCESS_OPTIONS = ['Level 1', 'Level 2', 'Level 3', 'Level 4 (Code Red)', 'Level 5'];
const DEFAULT_SWITCH = ['Team', 'Campaign', 'Profile'];

export default function CardTop({
  type = 'default',
  name = 'Sarah Mitchell',
  role = 'Senior Software Engineer',
  teams = DEFAULT_TEAMS,
  accessLevel = 'Level 4 (Code Red)',
  actions = DEFAULT_ACTIONS,
  switchTabs = DEFAULT_SWITCH,
  className,
}: CardTopProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (type === 'visual') {
    return (
      <div
        className={`relative flex flex-col gap-[160px] h-[480px] items-center justify-end p-x rounded-l overflow-hidden w-[830px] ${className ?? ''}`}
      >
        {/* layered background */}
        <div className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src={IMG_VISUAL} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base" />
        </div>

        {/* content */}
        <div className="relative flex flex-col gap-x items-center w-[754px]">
          <div className="flex flex-col gap-x items-center text-center w-full">
            <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full text-center">
              {name}
            </span>
            <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-primary leading-normal w-full text-center">
              {role}
            </span>
          </div>
          <div className="flex gap-xxxs items-center">
            {actions.map(a => (
              <Btn key={a} btnType="small" label={a} />
            ))}
          </div>
        </div>

        <SwitchGroup tabs={switchTabs} active={activeTab} onChange={setActiveTab} className="relative" />
      </div>
    );
  }

  // type === 'default' — yellow-tinted hero
  return (
    <div
      className={`relative flex flex-col h-[480px] items-start justify-between p-x rounded-l w-[830px] ${className ?? ''}`}
    >
      {/* layered background: image + color blend + yellow hard-light */}
      <div className="absolute inset-0 pointer-events-none rounded-l overflow-hidden">
        <img alt="" className="absolute inset-0 w-full h-full object-cover rounded-l" src={IMG_DEFAULT} />
        <div className="absolute inset-0 bg-black mix-blend-color rounded-l" />
        <div className="absolute inset-0 bg-yellow mix-blend-hard-light rounded-l" />
      </div>

      {/* top labels */}
      <div className="relative flex items-start justify-between w-full">
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-brown">TEAMS</span>
        <span className="font-pixel text-pixel tracking-[2px] uppercase text-brown">ACCESS</span>
      </div>

      {/* center: name + role + actions */}
      <div className="absolute inset-0 flex flex-col gap-x items-center justify-center w-full">
        <div className="flex flex-col gap-x items-center text-center w-[754px]">
          <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full text-center">
            {name}
          </span>
          <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-brown leading-normal w-full text-center">
            {role}
          </span>
        </div>
        <div className="flex gap-xxxs items-center mt-x">
          {actions.map(a => (
            <Btn key={a} btnType="on-color" label={a} />
          ))}
        </div>
      </div>

      {/* bottom row: teams left, access right */}
      <div className="relative flex items-end justify-between w-full mt-auto">
        {/* team dropdowns */}
        <div className="flex flex-wrap gap-xxxs w-[310px] content-end items-start">
          {teams.map(t => (
            <Dropdown
              key={t.text}
              showHeadline={false}
              theme="on-color"
              value={t.text}
              options={CARD_TEAM_OPTIONS}
              className="shrink-0"
            />
          ))}
          <button className="h-8 inline-flex items-center justify-center px-s rounded-over bg-brown shrink-0 transition-all duration-150 ease-out hover:brightness-90 active:brightness-75 active:scale-[0.97]">
            <span className="font-pixel text-pixel tracking-[2px] uppercase text-on-color">ADD</span>
          </button>
        </div>

        {/* access dropdown */}
        <div className="flex flex-wrap gap-xxxs w-[175px] content-end justify-end items-start">
          <Dropdown
            showHeadline={false}
            theme="on-color"
            value={accessLevel}
            options={CARD_ACCESS_OPTIONS}
            className="shrink-0"
          />
          <button className="h-8 inline-flex items-center justify-center px-s rounded-over bg-brown shrink-0 transition-all duration-150 ease-out hover:brightness-90 active:brightness-75 active:scale-[0.97]">
            <span className="font-pixel text-pixel tracking-[2px] uppercase text-on-color">ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
}
