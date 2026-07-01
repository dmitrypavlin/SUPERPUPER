import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Input from '../components/molecules/Input';
import TextArea from '../components/molecules/TextArea';
import Dropdown from '../components/molecules/Dropdown';
import Tag from '../components/molecules/Tag';
import ErrorMsg from '../components/molecules/ErrorMsg';
import Btn from '../components/molecules/Btn';

const DEPT_OPTIONS     = ['Frontend Team', 'Backend Team', 'Design', 'Product', 'Engineering'];
const EMP_OPTIONS      = ['Full-time', 'Part-time', 'Contract', 'Freelance'];
const REMOTE_OPTIONS   = ['On-site', 'Remote', 'Hybrid'];
const EXP_OPTIONS      = ['Junior', 'Middle', 'Senior', 'Lead', 'Principal'];
const EDU_OPTIONS      = ['High School', 'Bachelor', 'Master', 'PhD'];
const DURATION_OPTIONS = ['30 mins', '45 mins', '60 mins', '90 mins'];
const HIRING_OPTIONS   = ['Developers', 'Designers', 'Managers', 'Analysts'];
const MEMBER_OPTIONS   = ['Alex Kim', 'Maria Chen', 'Tom Evans', 'Sarah Mitchell'];
const DEADLINE_OPTIONS = ['24.11.2030', '01.01.2031', '15.06.2031', '01.09.2031'];

const SKILLS = ['Python', 'SQL', 'R', 'Java'];

export default function DesignCampaignWizard() {
  const navigate = useNavigate();
  const [campaignName, setCampaignName] = useState('');

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

      <div className="flex flex-col items-center gap-xxl px-m py-m pb-xxl">

        {/* Page title */}
        <h1 className="font-antiqa text-h1 leading-[0.9] tracking-[-0.84px] text-primary text-center w-full">
          New Campaign
        </h1>

        {/* White form card */}
        <div
          className="bg-card-white rounded-l w-[830px] pt-x pb-xxl flex flex-col gap-xxl"
          style={{ paddingLeft: '174px', paddingRight: '174px' }}
        >

          {/* ── Details ── */}
          <div className="flex flex-col gap-l">
            <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Details</span>

            <div className="grid grid-cols-2 gap-x-xxs gap-y-l">
              <Input showHeadline headline="Campaign name" value={campaignName} placeholder="e.g. UX Researcher, Q1 2025" onChange={setCampaignName} />
              <Dropdown showHeadline headline="Department"      value="Frontend-team"  options={DEPT_OPTIONS}   theme="default" />
              <Input showHeadline headline="Campaign name"   placeholder="e.g. UX Researcher, Q1 2025" />
              <Dropdown showHeadline headline="Employment type" value="Frontend-team"  options={EMP_OPTIONS}    theme="default" />
              <Input showHeadline headline="Location"        placeholder="Select Department" />
              <Dropdown showHeadline headline="Remote options"  value="Frontend-team"  options={REMOTE_OPTIONS} theme="default" />
            </div>

            <TextArea showHeadline headline="Job description" placeholder="Type something here" className="h-[120px]" />

            <div className="flex gap-xxs">
              <Input    showHeadline headline="Salary"   placeholder="$34 500"    className="flex-1 min-w-0" />
              <Dropdown showHeadline headline="Deadline" value="24.11.2030" options={DEADLINE_OPTIONS} theme="default" className="flex-1 min-w-0" />
            </div>

            <ErrorMsg text="Add more money for salary, you dumb ass" />
          </div>

          {/* ── Requirements ── */}
          <div className="flex flex-col gap-l">
            <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Requirements</span>

            {/* Skills */}
            <div className="flex flex-col gap-xxs">
              <div className="flex gap-xxs items-end">
                <Input showHeadline headline="Required skills" placeholder="e.g. Python, SQL, etc." className="flex-1 min-w-0" />
                <Btn btnType="secondary" label="Add" />
              </div>
              <div className="flex gap-xxxs flex-wrap">
                {SKILLS.map(s => <Tag key={s} text={s} showIcon />)}
              </div>
            </div>

            <div className="flex gap-xs">
              <Dropdown showHeadline headline="Experience level" value="Select Experience Level" options={EXP_OPTIONS} theme="default" className="flex-1 min-w-0" />
              <Dropdown showHeadline headline="Education level"  value="Select Education Level"  options={EDU_OPTIONS} theme="default" className="flex-1 min-w-0" />
            </div>

            <TextArea showHeadline headline="Preferred Qualifications" placeholder="Type something here" className="h-[120px]" />

            <div className="flex gap-xs">
              <Dropdown showHeadline headline="Interview duration in minutes" value="30 mins" options={DURATION_OPTIONS} theme="default" className="flex-1 min-w-0" />
              <Dropdown showHeadline headline="Interview duration in minutes" value="30 mins" options={DURATION_OPTIONS} theme="default" className="flex-1 min-w-0" />
            </div>

            <div className="flex gap-xs">
              <Dropdown showHeadline headline="Hiring team"  value="Developers"          options={HIRING_OPTIONS}  theme="default" className="flex-1 min-w-0" />
              <Dropdown showHeadline headline="Team member"  value="Select team member"  options={MEMBER_OPTIONS}  theme="default" className="flex-1 min-w-0" />
            </div>
          </div>

          {/* Publish */}
          <Btn
            btnType="big"
            label="Publish"
            className="w-full justify-center"
            onClick={() => navigate('/design/campaign', {
              state: { campaignName: campaignName.trim() || undefined },
            })}
          />

        </div>
      </div>
    </div>
  );
}
