import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type BranchColor = 'root' | 'green' | 'brown' | 'red';
type IconKey = 'grid' | 'person' | 'list' | 'doc' | 'flow';

const BRANCH_BG: Record<BranchColor, string> = {
  root:  'bg-card-violet',
  green: 'bg-card-green',
  brown: 'bg-card-yellow',
  red:   'bg-card-pink',
};

const BRANCH_LINE: Record<BranchColor, string> = {
  root:  '#9747ff', // tech-purple
  green: '#00867b', // tech-green
  brown: '#646905', // yellow-dark
  red:   '#cc0000', // tech-red
};

const ROOT_ID = '/design';
const SIBLING_LINE = '#9a9a9a';

type SiteNode = { id: string; label: string; icon: IconKey; branch: BranchColor };

const NODES: SiteNode[] = [
  { id: '/design',                    label: 'Overview',          icon: 'grid',   branch: 'root' },
  { id: '/design/employee',           label: 'Employee',          icon: 'person', branch: 'green' },
  { id: '/design/team',               label: 'Team',               icon: 'person', branch: 'brown' },
  { id: '/design/team/campaigns',     label: 'Team Campaigns',    icon: 'list',   branch: 'brown' },
  { id: '/design/campaign/add',       label: 'Add Campaign',      icon: 'list',   branch: 'brown' },
  { id: '/design/campaign',           label: 'Campaign',          icon: 'list',   branch: 'brown' },
  { id: '/design/campaign/wizard',    label: 'Campaign Wizard',   icon: 'doc',    branch: 'brown' },
  { id: '/design/candidate',          label: 'Candidate',         icon: 'person', branch: 'brown' },
  { id: '/design/negotiate',          label: 'Negotiate',         icon: 'doc',    branch: 'brown' },
  { id: '/design/templates',          label: 'All Templates',     icon: 'flow',   branch: 'red' },
  { id: '/design/automation',         label: 'Automation Editor', icon: 'flow',   branch: 'red' },
];

const EDGES: { from: string; to: string }[] = [
  { from: '/design',                 to: '/design/team' },
  { from: '/design',                 to: '/design/employee' },
  { from: '/design/team',            to: '/design/team/campaigns' },
  { from: '/design/team/campaigns',  to: '/design/campaign/add' },
  { from: '/design/team/campaigns',  to: '/design/campaign' },
  { from: '/design/campaign/add',    to: '/design/campaign/wizard' },
  { from: '/design/campaign',        to: '/design/candidate' },
  { from: '/design/candidate',       to: '/design/negotiate' },
  { from: '/design/templates',       to: '/design/automation' },
];

const SIBLING_LINKS: [string, string][] = [
  ['/design', '/design/templates'],
];

const LEVELS: string[][] = [
  ['/design', '/design/templates'],
  ['/design/employee', '/design/team', '/design/automation'],
  ['/design/team/campaigns'],
  ['/design/campaign/add', '/design/campaign'],
  ['/design/campaign/wizard', '/design/candidate'],
  ['/design/negotiate'],
];

const NODE_BY_ID = Object.fromEntries(NODES.map(n => [n.id, n]));

function NodeIcon({ icon }: { icon: IconKey }) {
  switch (icon) {
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" className="size-7 opacity-70">
          <rect x="3" y="3" width="8" height="8" rx="2" fill="black" />
          <rect x="13" y="3" width="8" height="8" rx="2" fill="black" />
          <rect x="3" y="13" width="8" height="8" rx="2" fill="black" />
          <rect x="13" y="13" width="8" height="8" rx="2" fill="black" />
        </svg>
      );
    case 'person':
      return (
        <svg viewBox="0 0 24 24" className="size-7 opacity-70">
          <circle cx="12" cy="8" r="4" fill="black" />
          <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7L4 21Z" fill="black" />
        </svg>
      );
    case 'list':
      return (
        <svg viewBox="0 0 24 24" className="size-7 opacity-70" fill="none">
          <line x1="4" y1="6" x2="20" y2="6" stroke="black" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="4" y1="18" x2="14" y2="18" stroke="black" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'doc':
      return (
        <svg viewBox="0 0 24 24" className="size-7 opacity-70" fill="none">
          <path d="M6 3h9l4 4v14H6V3Z" stroke="black" strokeWidth="2" strokeLinejoin="round" />
          <line x1="9" y1="12" x2="16" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="16" x2="16" y2="16" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'flow':
      return (
        <svg viewBox="0 0 24 24" className="size-7 opacity-70" fill="none">
          <circle cx="5" cy="6" r="2.6" fill="black" />
          <circle cx="19" cy="6" r="2.6" fill="black" />
          <circle cx="12" cy="18" r="2.6" fill="black" />
          <path d="M7.3 7.3 17 5.5M7 7 11 16M17 7 13 16" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function SiteMap() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [paths, setPaths] = useState<{ id: string; d: string; color: string; markerKey: BranchColor }[]>([]);
  const [siblingPaths, setSiblingPaths] = useState<{ id: string; d: string }[]>([]);

  useLayoutEffect(() => {
    function computePaths() {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const next = EDGES.map(edge => {
        const fromEl = iconRefs.current[edge.from];
        const toEl = iconRefs.current[edge.to];
        if (!fromEl || !toEl) return null;
        const fr = fromEl.getBoundingClientRect();
        const tr = toEl.getBoundingClientRect();
        const x1 = fr.left + fr.width / 2 - cRect.left;
        const y1 = fr.bottom - cRect.top;
        const x2 = tr.left + tr.width / 2 - cRect.left;
        const y2 = tr.top - cRect.top;
        const midY = (y1 + y2) / 2;
        const markerKey: BranchColor = edge.from === ROOT_ID ? 'root' : NODE_BY_ID[edge.to].branch;
        const color = BRANCH_LINE[markerKey];
        return {
          id: `${edge.from}->${edge.to}`,
          d: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
          color,
          markerKey,
        };
      }).filter((p): p is { id: string; d: string; color: string; markerKey: BranchColor } => p !== null);

      setPaths(next);

      const siblingNext = SIBLING_LINKS.map(([a, b]) => {
        const aEl = iconRefs.current[a];
        const bEl = iconRefs.current[b];
        if (!aEl || !bEl) return null;
        const ar = aEl.getBoundingClientRect();
        const br = bEl.getBoundingClientRect();
        const aIsLeft = ar.left < br.left;
        const x1 = (aIsLeft ? ar.right : ar.left) - cRect.left;
        const y1 = ar.top + ar.height / 2 - cRect.top;
        const x2 = (aIsLeft ? br.left : br.right) - cRect.left;
        const y2 = br.top + br.height / 2 - cRect.top;
        return { id: `${a}~${b}`, d: `M ${x1} ${y1} L ${x2} ${y2}` };
      }).filter((p): p is { id: string; d: string } => p !== null);

      setSiblingPaths(siblingNext);
    }

    computePaths();
    window.addEventListener('resize', computePaths);
    return () => window.removeEventListener('resize', computePaths);
  }, []);

  return (
    <div className="min-h-screen bg-base">
      <div className="overflow-x-auto">
        <div ref={containerRef} className="relative inline-flex flex-col items-center gap-[110px] min-w-full px-xxl py-xxl">
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              {(Object.keys(BRANCH_LINE) as BranchColor[]).map(b => (
                <marker key={b} id={`arrow-${b}`} markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto">
                  <path d="M0,0 L9,4.5 L0,9 Z" fill={BRANCH_LINE[b]} />
                </marker>
              ))}
            </defs>
            {siblingPaths.map(p => (
              <path key={p.id} d={p.d} stroke={SIBLING_LINE} strokeWidth={1.5} strokeDasharray="6 5" fill="none" />
            ))}
            {paths.map(p => (
              <path
                key={p.id}
                d={p.d}
                stroke={p.color}
                strokeWidth={2}
                fill="none"
                markerEnd={`url(#arrow-${p.markerKey})`}
              />
            ))}
          </svg>

          {LEVELS.map((levelIds, levelIndex) => (
            <div key={levelIndex} className="relative flex items-start gap-x">
              {levelIds.map(id => {
                const node = NODE_BY_ID[id];
                const isActive = pathname === node.id;
                return (
                  <div key={node.id} className="relative flex flex-col items-center gap-s w-[150px]">
                    <button
                      ref={(el) => { iconRefs.current[node.id] = el; }}
                      onClick={() => navigate(node.id)}
                      className={`size-16 rounded-m flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.12)] transition-transform duration-150 hover:scale-105 ${BRANCH_BG[node.branch]} ${isActive ? 'ring-[3px] ring-offset-2 ring-black' : ''}`}
                    >
                      <NodeIcon icon={node.icon} />
                    </button>
                    <div className="relative flex flex-col items-center gap-[2px] bg-card-white rounded-s px-xs py-xxs shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                      <span className="font-grotesk text-h4 font-semibold text-primary text-center whitespace-nowrap">{node.label}</span>
                      <span className="font-pixel text-pixel text-secondary tracking-[1px] whitespace-nowrap">{node.id}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
