import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Btn from '../components/molecules/Btn';

const IMG_BG1 = 'https://www.figma.com/api/mcp/asset/cd06bf00-bb74-4661-912c-8dc97250aa23';
const IMG_BG2 = 'https://www.figma.com/api/mcp/asset/e207be08-c092-4f59-af06-7e44bac576ee';

const TEMPLATES = [
  { name: 'Doc list for analysis',  type: 'Document',   createdBy: 'created by Esmeralda', date: '12.01.2024' },
  { name: 'Doc list for visa',      type: 'Document',   createdBy: 'created by Esmeralda', date: '02.02.2024' },
  { name: 'Marketing Funnel',       type: 'Automation', createdBy: 'created by Esmeralda', date: '15.03.2024' },
  { name: 'Passport data',          type: 'Document',   createdBy: 'created by Esmeralda', date: '29.03.2024' },
  { name: 'Access C-level',         type: 'Access',     createdBy: 'created by Esmeralda', date: '01.04.2024' },
  { name: 'Doc list for designers', type: 'Document',   createdBy: 'created by Esmeralda', date: '17.04.2024' },
  { name: 'Hiring Funnel v.61',     type: 'Automation', createdBy: 'created by Esmeralda', date: '03.05.2024' },
  { name: 'Hiring Funnel v.24',     type: 'Automation', createdBy: 'created by Esmeralda', date: '19.05.2024' },
  { name: 'Doc list for analysis',  type: 'Document',   createdBy: 'created by Esmeralda', date: '12.01.2024' },
  { name: 'Doc list for visa',      type: 'Document',   createdBy: 'created by Esmeralda', date: '02.02.2024' },
  { name: 'Marketing Funnel',       type: 'Automation', createdBy: 'created by Esmeralda', date: '15.03.2024' },
  { name: 'Passport data',          type: 'Document',   createdBy: 'created by Esmeralda', date: '29.03.2024' },
  { name: 'Access C-level',         type: 'Access',     createdBy: 'created by Esmeralda', date: '01.04.2024' },
  { name: 'Doc list for designers', type: 'Document',   createdBy: 'created by Esmeralda', date: '17.04.2024' },
  { name: 'Hiring Funnel v.61',     type: 'Automation', createdBy: 'created by Esmeralda', date: '03.05.2024' },
  { name: 'Hiring Funnel v.24',     type: 'Automation', createdBy: 'created by Esmeralda', date: '19.05.2024' },
];

const TABS: { label: string; type: string | null }[] = [
  { label: 'All',         type: null },
  { label: 'Automations', type: 'Automation' },
  { label: 'Documents',   type: 'Document' },
  { label: 'Access',      type: 'Access' },
];

export default function DesignTemplates() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const visibleTemplates = TABS[activeTab].type
    ? TEMPLATES.filter(t => t.type === TABS[activeTab].type)
    : TEMPLATES;

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

        {/* Hero */}
        <div className="relative flex flex-col min-h-[480px] items-center justify-end gap-[160px] p-x rounded-l overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-base" />
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={IMG_BG1} />
            <img alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-screen" src={IMG_BG2} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base" />
          </div>

          <div className="relative flex flex-col gap-x items-center text-center w-[754px] pt-x">
            <span className="font-antiqa text-h1 leading-[0.9] text-primary tracking-[-0.84px] w-full">
              All templates
            </span>
            <span className="font-pixel text-[30px] tracking-[-0.9px] uppercase text-primary leading-normal w-full mt-x">
              Here you'll find all templates
            </span>
            <Btn btnType="small" label="Add New Template" className="mt-x" onClick={() => navigate('/design/automation')} />
          </div>

          {/* Tab switch */}
          <div className="relative flex items-center gap-xxxs bg-yellow rounded-m p-xxs">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`h-8 flex items-center justify-center px-s rounded-s font-pixel text-pixel tracking-[2px] uppercase text-primary whitespace-nowrap transition-colors duration-150 ${
                  i === activeTab ? 'bg-white' : 'hover:bg-white/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Template list */}
        <div className="bg-card-white rounded-l px-x flex flex-col">
          {visibleTemplates.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className={`flex gap-s items-center py-s ${i < visibleTemplates.length - 1 ? 'border-b border-lines' : ''}`}
            >
              <span className="flex-1 min-w-0 font-grotesk text-h3 leading-normal text-primary tracking-[-0.4px]">
                {t.name}
              </span>
              <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary w-[114px]">
                {t.type}
              </span>
              <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary w-[162px]">
                {t.createdBy}
              </span>
              <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary text-right w-[74px]">
                {t.date}
              </span>
              <Btn btnType="secondary" label="Edit" onClick={() => navigate('/design/automation', { state: { name: t.name } })} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
