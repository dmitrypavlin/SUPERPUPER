import Profile from '../components/molecules/Profile';
import Node from '../components/molecules/Node';
import CampaignPreview from '../components/molecules/CampaignPreview';
import ProjectPreview from '../components/molecules/ProjectPreview';
import ExperiencePreview from '../components/molecules/ExperiencePreview';
import Team from '../components/molecules/Team';
import CardMetricGraph from '../components/molecules/CardMetricGraph';
import CardMetricCount from '../components/molecules/CardMetricCount';
import Attempt from '../components/molecules/Attempt';
import Notify from '../components/molecules/Notify';

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

export default function Molecules() {
  return (
    <div className="min-h-screen bg-base px-l pt-x pb-xxl">
      <h1 className="font-antiqa text-h2 leading-h2 text-primary mb-xxl">Molecules</h1>

      {/* Profile */}
      <Section title="Profile">
        <div className="flex flex-col gap-l">
          <VarGroup label="long">
            <Var label="long">
              <div className="w-[741px]">
                <Profile size="long" />
              </div>
            </Var>
          </VarGroup>
          <VarGroup label="short">
            <Var label="short">
              <Profile size="short" />
            </Var>
            <Var label="short-outlined">
              <Profile size="short-outlined" />
            </Var>
          </VarGroup>
        </div>
      </Section>

      {/* Node */}
      <Section title="Node">
        <Node />
      </Section>

      {/* Team */}
      <Section title="Team">
        <div className="max-w-[462px]">
          <Team />
        </div>
      </Section>

      {/* Campaign Preview */}
      <Section title="Campaign Preview">
        <div className="max-w-[696px]">
          <CampaignPreview />
        </div>
      </Section>

      {/* Project Preview */}
      <Section title="Project Preview">
        <div className="max-w-[696px]">
          <ProjectPreview />
        </div>
      </Section>

      {/* Experience Preview */}
      <Section title="Experience Preview">
        <div className="max-w-[696px]">
          <ExperiencePreview />
        </div>
      </Section>

      {/* Card Metric */}
      <Section title="Card Metric">
        <VarRow>
          <Var label="graph">
            <CardMetricGraph />
          </Var>
          <Var label="count">
            <CardMetricCount />
          </Var>
        </VarRow>
      </Section>

      {/* Attempt */}
      <Section title="Attempt">
        <div className="flex flex-col gap-m max-w-[830px]">
          <Var label="first">
            <Attempt type="first" />
          </Var>
          <Var label="next">
            <Attempt type="next" />
          </Var>
        </div>
      </Section>

      {/* Notify */}
      <Section title="Notify">
        <div className="flex flex-col gap-m max-w-[830px]">
          <Var label="showBtn=false">
            <Notify />
          </Var>
          <Var label="showBtn=true">
            <Notify showBtn />
          </Var>
        </div>
      </Section>
    </div>
  );
}
