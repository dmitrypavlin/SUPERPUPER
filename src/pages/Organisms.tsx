import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondRow from '../components/organisms/SecondRow';
import Topmenu from '../components/organisms/Topmenu';
import Header from '../components/organisms/Header';
import Task from '../components/organisms/Task';
import Kanban from '../components/organisms/Kanban';
import CardTop from '../components/organisms/CardTop';

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

export default function Organisms() {
  const navigate = useNavigate();
  const [topmenuFilter, setTopmenuFilter] = useState<'all' | 'templates' | 'off'>('off');
  const [headerFilter, setHeaderFilter] = useState<'all' | 'templates' | 'off'>('off');

  return (
    <div className="min-h-screen bg-base px-l pt-x pb-xxl">
      <h1 className="font-antiqa text-h2 leading-h2 text-primary mb-xxl">Organisms</h1>

      {/* SecondRow */}
      <Section title="SecondRow">
        <div className="flex flex-col gap-m">
          <Var label="default">
            <div className="w-full border border-lines rounded-l overflow-hidden">
              <SecondRow type="default" onBack={() => navigate(-1)} />
            </div>
          </Var>
          <Var label="builder">
            <div className="w-full border border-lines rounded-l overflow-hidden">
              <SecondRow type="builder" onBack={() => navigate(-1)} />
            </div>
          </Var>
        </div>
      </Section>

      {/* Topmenu */}
      <Section title="Topmenu">
        <div className="w-full bg-[#6b6b6b] rounded-l overflow-hidden">
          <Topmenu filter={topmenuFilter} onFilterChange={setTopmenuFilter} />
        </div>
      </Section>

      {/* Header */}
      <Section title="Header">
        <div className="w-full overflow-hidden rounded-l">
          <Header
            filter={headerFilter}
            onFilterChange={setHeaderFilter}
                     />
        </div>
      </Section>

      {/* Task */}
      <Section title="Task">
        <div className="max-w-[692px]">
          <Var label="click the flag to toggle pending/done">
            <Task />
          </Var>
        </div>
      </Section>

      {/* Kanban */}
      <Section title="Kanban">
        <Kanban />
      </Section>

      {/* CardTop */}
      <Section title="CardTop">
        <VarRow>
          <Var label="default (yellow tint)">
            <CardTop type="default" />
          </Var>
          <Var label="visual (photo bg)">
            <CardTop type="visual" />
          </Var>
        </VarRow>
      </Section>
    </div>
  );
}
