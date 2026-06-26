import { useState } from 'react';
import Bar from '../components/molecules/Bar';
import Avatar from '../components/molecules/Avatar';
import Status from '../components/molecules/Status';
import Icon from '../components/molecules/Icon';
import Flag from '../components/molecules/Flag';
import Tag from '../components/molecules/Tag';
import ErrorMsg from '../components/molecules/ErrorMsg';
import Avatars from '../components/molecules/Avatars';
import ListRow from '../components/molecules/ListRow';
import TextArea from '../components/molecules/TextArea';
import Input from '../components/molecules/Input';
import Dropdown from '../components/molecules/Dropdown';
import Graph from '../components/molecules/Graph';
import SwitchGroup from '../components/molecules/SwitchGroup';
import Btn, { type BtnForceState } from '../components/molecules/Btn';
import MenuSwitch from '../components/molecules/MenuSwitch';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-xxl">
      <h2 className="font-grotesk text-h3 leading-h3 font-semibold text-primary mb-m border-b border-lines pb-xxs">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Var({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-xs items-start">
      {children}
      <span className="font-grotesk text-caps tracking-[1.6px] uppercase text-secondary">{label}</span>
    </div>
  );
}

function VarRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-m items-end">{children}</div>;
}

function VarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-s">
      <span className="font-grotesk text-grotesk leading-grotesk text-secondary">{label}</span>
      <VarRow>{children}</VarRow>
    </div>
  );
}

export default function Atoms() {
  const [switchGroupTab, setSwitchGroupTab] = useState(0);
  const [flag0, setFlag0] = useState(false);
  const [flag1, setFlag1] = useState(true);

  return (
    <div className="min-h-screen bg-base px-l pt-x pb-xxl">
      <h1 className="font-antiqa text-h2 leading-h2 text-primary mb-xxl">Atoms</h1>

      {/* Bar */}
      <Section title="Bar">
        <div className="flex flex-col gap-m">
          <Var label="small · 75%">
            <div className="w-[280px]"><Bar size="small" value={75} cols={40} /></div>
          </Var>
          <Var label="big · 40%">
            <div className="w-[280px]"><Bar size="big" value={40} cols={40} /></div>
          </Var>
        </div>
      </Section>

      {/* Avatar */}
      <Section title="Avatar">
        <VarRow>
          <Var label="katya"><Avatar variant="katya" /></Var>
          <Var label="petya"><Avatar variant="petya" /></Var>
          <Var label="dog"><Avatar variant="dog" /></Var>
        </VarRow>
      </Section>

      {/* Status */}
      <Section title="Status">
        <VarRow>
          <Var label="purple"><Status type="purple" /></Var>
          <Var label="green"><Status type="green" /></Var>
          <Var label="red"><Status type="red" /></Var>
          <Var label="stopped"><Status type="stopped" /></Var>
        </VarRow>
      </Section>

      {/* Icons */}
      <Section title="Icons">
        <VarRow>
          {(['play', 'user', 'more', 'arrow-down', 'close'] as const).map(icon => (
            <Var key={icon} label={icon}>
              <Icon icon={icon} />
            </Var>
          ))}
        </VarRow>
      </Section>

      {/* Flag */}
      <Section title="Flag">
        <VarRow>
          <Var label="active=false">
            <Flag active={flag0} onClick={() => setFlag0(v => !v)} />
          </Var>
          <Var label="active=true">
            <Flag active={flag1} onClick={() => setFlag1(v => !v)} />
          </Var>
        </VarRow>
      </Section>

      {/* Tag */}
      <Section title="Tag">
        <div className="flex flex-col gap-l">
          <VarGroup label="control">
            <Var label="showIcon=false">
              <Tag text="React" type="control" />
            </Var>
            <Var label="showIcon=true">
              <Tag text="Design" type="control" showIcon />
            </Var>
          </VarGroup>
          <VarGroup label="static">
            <Tag text="Frontend" type="static" />
          </VarGroup>
        </div>
      </Section>

      {/* Error */}
      <Section title="Error">
        <ErrorMsg text="add more money for salary" />
      </Section>

      {/* Avatars */}
      <Section title="Avatars">
        <Avatars />
      </Section>

      {/* List Row */}
      <Section title="List Row">
        <div className="w-full max-w-[800px]">
          <ListRow name="Sarah Johnson" type="Document" createdBy="Created by Alan" date="24.05.2025" />
          <ListRow name="Campaign Q3" type="Campaign" createdBy="Created by Mike" date="01.06.2025" />
          <ListRow name="Brand Kit v2" type="Asset" createdBy="Created by Sarah" date="15.06.2025" />
        </div>
      </Section>

      {/* Text Area */}
      <Section title="Text Area">
        <VarRow>
          <Var label="showHeadline=true">
            <div className="w-[240px]"><TextArea headline="Description" placeholder="Type something here" /></div>
          </Var>
          <Var label="showHeadline=false">
            <div className="w-[240px]"><TextArea showHeadline={false} placeholder="Type something here" /></div>
          </Var>
        </VarRow>
      </Section>

      {/* Input */}
      <Section title="Input">
        <VarRow>
          <Var label="showHeadline=true">
            <div className="w-[200px]"><Input headline="Name" placeholder="Michael Lee" /></div>
          </Var>
          <Var label="showHeadline=false">
            <div className="w-[200px]"><Input showHeadline={false} placeholder="Search..." /></div>
          </Var>
        </VarRow>
      </Section>

      {/* Dropdown */}
      <Section title="Dropdown">
        <div className="flex flex-col gap-l">
          <VarGroup label="on-color">
            <Var label="filled=true">
              <div className="w-[180px]"><Dropdown theme="on-color" headline="Team" value="Frontend Team" filled /></div>
            </Var>
            <Var label="filled=false">
              <div className="w-[180px]"><Dropdown theme="on-color" headline="Team" value="select…" filled={false} /></div>
            </Var>
          </VarGroup>
          <VarGroup label="default">
            <Var label="filled=true">
              <div className="w-[180px]"><Dropdown theme="default" headline="Category" value="Design" filled /></div>
            </Var>
            <Var label="filled=false">
              <div className="w-[180px]"><Dropdown theme="default" headline="Category" value="select…" filled={false} /></div>
            </Var>
          </VarGroup>
        </div>
      </Section>

      {/* Graph */}
      <Section title="Graph">
        <VarRow>
          <Var label="default">
            <div className="bg-card-green p-m rounded-l"><Graph /></div>
          </Var>
          <Var label="custom bars">
            <div className="bg-card-yellow p-m rounded-l"><Graph bars={[{ height: 60 }, { height: 82 }]} /></div>
          </Var>
        </VarRow>
      </Section>

      {/* SwitchGroup */}
      <Section title="Switch Group">
        <SwitchGroup
          tabs={['Team', 'Campaign', 'Profile']}
          active={switchGroupTab}
          onChange={setSwitchGroupTab}
        />
      </Section>

      {/* MenuSwitch */}
      <Section title="MenuSwitch">
        <div className="bg-[#6b6b6b] inline-flex p-m rounded-l">
          <VarGroup label="on dark bg">
            <Var label="active">
              <MenuSwitch text="All teams" active />
            </Var>
            <Var label="inactive">
              <MenuSwitch text="All teams" active={false} />
            </Var>
          </VarGroup>
        </div>
      </Section>

      {/* Btn */}
      <Section title="Button">
        <div className="flex flex-col gap-l">
          {(
            [
              { type: 'secondary',  label: 'More info',     subLabel: undefined,       wrap: false },
              { type: 'on-color',   label: 'More info',     subLabel: undefined,       wrap: true  },
              { type: 'small',      label: 'More info',     subLabel: undefined,       wrap: false },
              { type: 'big',        label: 'More info',     subLabel: undefined,       wrap: false },
              { type: 'node',       label: 'Sarah Johnson', subLabel: 'design lead',   wrap: false },
            ] as const
          ).map(({ type, label, subLabel, wrap }) => (
            <VarGroup key={type} label={type}>
              {(['default', 'hover', 'pressed'] as const).map(state => {
                const forceState: BtnForceState | undefined = state === 'default' ? undefined : state;
                const btn = (
                  <Btn
                    key={state}
                    btnType={type}
                    label={label}
                    subLabel={subLabel}
                    forceState={forceState}
                  />
                );
                return (
                  <Var key={state} label={state}>
                    {wrap ? <div className="bg-[#6b6b6b] p-s rounded-m">{btn}</div> : btn}
                  </Var>
                );
              })}
            </VarGroup>
          ))}
        </div>
      </Section>
    </div>
  );
}
