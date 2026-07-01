import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/organisms/Header';
import Btn from '../components/molecules/Btn';
import Input from '../components/molecules/Input';
import TextArea from '../components/molecules/TextArea';
import Icon from '../components/molecules/Icon';

type NodeCategory = 'red' | 'yellow' | 'pink' | 'violet';
type Port = 'left' | 'right';

type LibraryItem = { id: string; category: NodeCategory; name: string; subtitle: string };

type FlowNode = {
  id: string;
  category: NodeCategory;
  x: number;
  y: number;
  title: string;
  subtitle: string;
  fields: { headline: string; main: string; body: string; bye: string };
};

type Connection = {
  id: string;
  from: { nodeId: string; port: Port };
  to: { nodeId: string; port: Port };
};

const LIBRARY_ITEMS: LibraryItem[] = [
  { id: 'start-trigger',      category: 'red',    name: 'Start Trigger',      subtitle: 'Initialize workflow' },
  { id: 'application-review', category: 'red',    name: 'Application Review', subtitle: 'Screen candidates' },
  { id: 'interview',          category: 'red',    name: 'Interview',          subtitle: 'Schedule interviews' },
  { id: 'email-notification', category: 'yellow', name: 'Email Notification', subtitle: 'Send automated emails' },
  { id: 'conditional-logic',  category: 'yellow', name: 'Conditional Logic',  subtitle: 'Branch workflow paths' },
  { id: 'training-module',    category: 'pink',   name: 'Training Module',    subtitle: 'Assign learning paths' },
  { id: 'progress-tracker',   category: 'violet', name: 'Progress Tracker',   subtitle: 'Monitor development' },
];

const TEMPLATE_PILLS = ['Hiring Funnel', 'Onboarding Flow', 'Development Plan'];

const LIBRARY_BG: Record<NodeCategory, string> = {
  red: 'bg-on-red', yellow: 'bg-on-yellow', pink: 'bg-on-pink', violet: 'bg-on-violet',
};
const CANVAS_BG: Record<NodeCategory, string> = {
  red: 'bg-card-red', yellow: 'bg-card-yellow', pink: 'bg-card-pink', violet: 'bg-card-violet',
};

const EMPTY_FIELDS = { headline: '', main: '', body: '', bye: '' };
const NODE_TITLE_BASE_PX = 20;

const SEED_NODES: FlowNode[] = [
  { id: 'n1', category: 'red',    x: 140, y: 80,  title: 'Applicant Screening', subtitle: 'Review resumes and applications',   fields: { ...EMPTY_FIELDS } },
  { id: 'n2', category: 'violet', x: 170, y: 380, title: 'Interview Stage',     subtitle: 'Conduct initial interviews',        fields: { ...EMPTY_FIELDS } },
  { id: 'n3', category: 'pink',   x: 470, y: 190, title: 'Final Decision',      subtitle: 'Select candidate and extend offer', fields: { ...EMPTY_FIELDS } },
];

const SEED_CONNECTIONS: Connection[] = [
  { id: 'c1', from: { nodeId: 'n1', port: 'right' }, to: { nodeId: 'n3', port: 'left' } },
  { id: 'c2', from: { nodeId: 'n2', port: 'right' }, to: { nodeId: 'n3', port: 'left' } },
];

let idCounter = 0;
function uid(prefix: string) {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export default function DesignAutomation() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { name?: string } | null };
  const isEditing = !!state?.name;

  const [automationName, setAutomationName] = useState(state?.name ?? '');
  const [nodes, setNodes] = useState<FlowNode[]>(isEditing ? SEED_NODES : []);
  const [connections, setConnections] = useState<Connection[]>(isEditing ? SEED_CONNECTIONS : []);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [menuNodeId, setMenuNodeId] = useState<string | null>(null);
  const [propsMode, setPropsMode] = useState<'parameters' | 'custom'>('parameters');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [draftConnection, setDraftConnection] = useState<{ from: { nodeId: string; port: Port }; x: number; y: number } | null>(null);
  const [paths, setPaths] = useState<{ id: string; d: string }[]>([]);
  const [hoverPortKey, setHoverPortKey] = useState<string | null>(null);

  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const portRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const selectedNode = nodes.find(n => n.id === selectedNodeId) ?? null;
  const titleBelowThreshold = NODE_TITLE_BASE_PX * zoom < 10;

  function isPortConnected(nodeId: string, port: Port) {
    return connections.some(c =>
      (c.from.nodeId === nodeId && c.from.port === port) ||
      (c.to.nodeId === nodeId && c.to.port === port)
    );
  }

  function isNodeConnected(nodeId: string) {
    return connections.some(c => c.from.nodeId === nodeId || c.to.nodeId === nodeId);
  }

  useEffect(() => { setPropsMode('parameters'); }, [selectedNodeId]);

  useLayoutEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const next: { id: string; d: string }[] = [];
    connections.forEach(c => {
      const fromEl = portRefs.current[`${c.from.nodeId}:${c.from.port}`];
      const toEl = portRefs.current[`${c.to.nodeId}:${c.to.port}`];
      if (!fromEl || !toEl) return;
      const fr = fromEl.getBoundingClientRect();
      const tr = toEl.getBoundingClientRect();
      const x1 = fr.left + fr.width / 2 - wrapRect.left;
      const y1 = fr.top + fr.height / 2 - wrapRect.top;
      const x2 = tr.left + tr.width / 2 - wrapRect.left;
      const y2 = tr.top + tr.height / 2 - wrapRect.top;
      const dx = Math.max(Math.abs(x2 - x1) * 0.5, 40);
      const c1x = x1 + (c.from.port === 'right' ? dx : -dx);
      const c2x = x2 + (c.to.port === 'right' ? dx : -dx);
      next.push({ id: c.id, d: `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}` });
    });
    setPaths(next);
  }, [nodes, connections, zoom, pan]);

  function getDraftPath(): string | null {
    if (!draftConnection) return null;
    const fromEl = portRefs.current[`${draftConnection.from.nodeId}:${draftConnection.from.port}`];
    const wrap = canvasWrapRef.current;
    if (!fromEl || !wrap) return null;
    const wrapRect = wrap.getBoundingClientRect();
    const fr = fromEl.getBoundingClientRect();
    const x1 = fr.left + fr.width / 2 - wrapRect.left;
    const y1 = fr.top + fr.height / 2 - wrapRect.top;
    const x2 = draftConnection.x;
    const y2 = draftConnection.y;
    const dx = Math.max(Math.abs(x2 - x1) * 0.5, 40);
    const c1x = x1 + (draftConnection.from.port === 'right' ? dx : -dx);
    const c2x = x2 - (draftConnection.from.port === 'right' ? dx : -dx);
    return `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const wrap = canvasWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const factor = Math.min(1.2, Math.max(0.8, Math.exp(-e.deltaY * 0.0015)));
    const newZoom = Math.min(2, Math.max(0.4, zoom * factor));
    const contentX = (mouseX - pan.x) / zoom;
    const contentY = (mouseY - pan.y) / zoom;
    setZoom(newZoom);
    setPan({ x: mouseX - contentX * newZoom, y: mouseY - contentY * newZoom });
  }

  function handleNodeMouseDown(e: React.MouseEvent, node: FlowNode) {
    e.stopPropagation();
    setSelectedNodeId(node.id);
    setMenuNodeId(null);
    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startX = node.x;
    const startY = node.y;
    const currentZoom = zoom;

    function onMove(ev: MouseEvent) {
      const dx = (ev.clientX - startClientX) / currentZoom;
      const dy = (ev.clientY - startClientY) / currentZoom;
      setNodes(prev => prev.map(n => n.id === node.id ? { ...n, x: startX + dx, y: startY + dy } : n));
    }
    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handlePortMouseDown(e: React.MouseEvent, nodeId: string, port: Port) {
    e.stopPropagation();
    e.preventDefault();
    const wrap = canvasWrapRef.current;
    if (!wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    setDraftConnection({ from: { nodeId, port }, x: e.clientX - wrapRect.left, y: e.clientY - wrapRect.top });

    function onMove(ev: MouseEvent) {
      setDraftConnection(prev => prev ? { ...prev, x: ev.clientX - wrapRect.left, y: ev.clientY - wrapRect.top } : prev);
      const hoverTarget = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const hoverPortEl = hoverTarget?.closest('[data-port-node]') as HTMLElement | null;
      setHoverPortKey(hoverPortEl ? `${hoverPortEl.getAttribute('data-port-node')}:${hoverPortEl.getAttribute('data-port-side')}` : null);
    }
    function onUp(ev: MouseEvent) {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      const target = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const portEl = target?.closest('[data-port-node]') as HTMLElement | null;
      if (portEl) {
        const toNodeId = portEl.getAttribute('data-port-node')!;
        const toPort = portEl.getAttribute('data-port-side') as Port;
        if (toNodeId !== nodeId) {
          setConnections(prev => {
            const exists = prev.some(c =>
              (c.from.nodeId === nodeId && c.from.port === port && c.to.nodeId === toNodeId && c.to.port === toPort) ||
              (c.to.nodeId === nodeId && c.to.port === port && c.from.nodeId === toNodeId && c.from.port === toPort)
            );
            if (exists) return prev;
            return [...prev, { id: uid('c'), from: { nodeId, port }, to: { nodeId: toNodeId, port: toPort } }];
          });
        }
      }
      setDraftConnection(null);
      setHoverPortKey(null);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleCanvasDrop(e: React.DragEvent) {
    e.preventDefault();
    const wrap = canvasWrapRef.current;
    if (!wrap) return;
    const raw = e.dataTransfer.getData('application/json');
    if (!raw) return;
    let item: LibraryItem;
    try { item = JSON.parse(raw); } catch { return; }
    const rect = wrap.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const localX = (screenX - pan.x) / zoom;
    const localY = (screenY - pan.y) / zoom;
    const newNode: FlowNode = {
      id: uid('n'),
      category: item.category,
      x: localX - 140,
      y: localY - 40,
      title: item.name,
      subtitle: item.subtitle,
      fields: { ...EMPTY_FIELDS },
    };
    setNodes(prev => [...prev, newNode]);
  }

  function deleteNode(nodeId: string) {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from.nodeId !== nodeId && c.to.nodeId !== nodeId));
    setSelectedNodeId(prev => (prev === nodeId ? null : prev));
    setMenuNodeId(null);
  }

  function clearConnectors(nodeId: string) {
    setConnections(prev => prev.filter(c => c.from.nodeId !== nodeId && c.to.nodeId !== nodeId));
    setMenuNodeId(null);
  }

  function updateSelectedField(key: keyof FlowNode['fields'], value: string) {
    if (!selectedNode) return;
    setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, fields: { ...n.fields, [key]: value } } : n));
  }

  const draftPath = getDraftPath();

  return (
    <div className="min-h-screen bg-base" onClick={() => setMenuNodeId(null)}>
      <Header
        showSecondRow
        secondRowType="builder"
        showBar={false}
        transparent
        onBack={() => navigate(-1)}
      />

      <div className="flex gap-xs items-start px-x pt-x pb-[84px] w-full">

        {/* Node library */}
        <div className="bg-card-white rounded-l p-x flex flex-col gap-l shrink-0 w-[350px]">
          <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Automation</span>

          <Input showHeadline headline="Automation name" placeholder="e.g. Marketing Funnel" value={automationName} onChange={setAutomationName} />

          <div className="flex flex-col gap-s w-full">
            <span className="font-grotesk text-h3 leading-h3 text-primary tracking-[-0.4px]">Node library</span>
            <div className="flex flex-col gap-xxxs w-full">
              {LIBRARY_ITEMS.map(item => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => { e.dataTransfer.setData('application/json', JSON.stringify(item)); e.dataTransfer.effectAllowed = 'copy'; }}
                  className={`flex flex-col gap-xs items-start p-s rounded-s w-full cursor-grab active:cursor-grabbing transition-colors duration-150 ${LIBRARY_BG[item.category]}`}
                >
                  <span className="font-grotesk text-grotesk leading-grotesk text-black">{item.name}</span>
                  <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{item.subtitle}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-s w-full">
            <span className="font-grotesk text-h3 leading-h3 text-primary tracking-[-0.4px]">Templates</span>
            <div className="flex flex-wrap gap-xxxs w-full">
              {TEMPLATE_PILLS.map(t => (
                <Btn key={t} btnType="secondary" label={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasWrapRef}
          onWheel={handleWheel}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleCanvasDrop}
          onMouseDown={(e) => { e.stopPropagation(); setSelectedNodeId(null); setMenuNodeId(null); }}
          className="relative flex-1 min-w-px h-[731px] rounded-s overflow-hidden bg-[radial-gradient(circle,#e3e3e3_1px,transparent_1px)] [background-size:24px_24px]"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {paths.map(p => (
              <path key={p.id} d={p.d} stroke="black" strokeWidth={1.5} fill="none" />
            ))}
            {draftPath && <path d={draftPath} stroke="black" strokeWidth={1.5} strokeDasharray="4 4" fill="none" />}
          </svg>

          <div
            className="absolute top-0 left-0"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0' }}
          >
            {nodes.map(node => (
              <div
                key={node.id}
                onMouseDown={(e) => handleNodeMouseDown(e, node)}
                className={`absolute flex flex-col gap-l items-start p-s rounded-m w-[280px] cursor-grab active:cursor-grabbing select-none transition-opacity duration-150 ${CANVAS_BG[node.category]} ${selectedNodeId === node.id ? 'ring-2 ring-black' : ''} ${isNodeConnected(node.id) ? '' : 'opacity-70'}`}
                style={{ left: node.x, top: node.y }}
              >
                {titleBelowThreshold && (
                  <div
                    className="absolute left-0 bottom-full mb-1 px-xs py-xxs rounded-s bg-card-white font-grotesk text-black whitespace-nowrap shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                    style={{ fontSize: 12, lineHeight: 1.2, transform: `scale(${1 / zoom})`, transformOrigin: 'left bottom' }}
                  >
                    {node.title}
                  </div>
                )}

                <div className="flex items-start justify-between w-full relative">
                  <Icon icon="play" className="text-primary" />
                  <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); setMenuNodeId(prev => (prev === node.id ? null : node.id)); }}
                    className="text-primary"
                  >
                    <Icon icon="more" />
                  </button>
                  {menuNodeId === node.id && (
                    <div
                      onMouseDown={(e) => e.stopPropagation()}
                      className="absolute right-0 top-[20px] z-10 flex flex-col bg-card-white rounded-s shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden min-w-[140px]"
                    >
                      <button onClick={() => deleteNode(node.id)} className="px-s py-xs text-left font-pixel text-pixel tracking-[2px] uppercase text-tech-red hover:bg-control whitespace-nowrap">
                        Delete
                      </button>
                      <button onClick={() => clearConnectors(node.id)} className="px-s py-xs text-left font-pixel text-pixel tracking-[2px] uppercase text-primary hover:bg-control whitespace-nowrap">
                        Clear connectors
                      </button>
                    </div>
                  )}
                </div>

                {!titleBelowThreshold && (
                  <div className="flex flex-col gap-s items-start w-full">
                    <span className="font-grotesk text-h3 leading-h3 text-black">{node.title}</span>
                    <span className="font-pixel text-pixel tracking-[2px] uppercase text-primary">{node.subtitle}</span>
                  </div>
                )}

                <div className="flex items-center justify-between w-full">
                  {(['left', 'right'] as const).map(side => {
                    const key = `${node.id}:${side}`;
                    const connected = isPortConnected(node.id, side);
                    const hovered = hoverPortKey === key;
                    return (
                      <div
                        key={side}
                        data-port-node={node.id}
                        data-port-side={side}
                        ref={(el) => { portRefs.current[key] = el; }}
                        onMouseDown={(e) => handlePortMouseDown(e, node.id, side)}
                        className={`size-[10px] rounded-full cursor-crosshair transition-all duration-100 ${connected ? 'bg-black' : 'bg-gray'} ${hovered ? 'ring-2 ring-black ring-offset-2' : ''}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Node properties */}
        <div className="shrink-0 w-[350px]">
          {selectedNode ? (
            <div className="bg-card-white rounded-l p-x flex flex-col gap-l w-full">
              <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Node Properties</span>

              <div className="flex flex-col gap-s w-full">
                <Input
                  showHeadline
                  headline="Node name"
                  value={selectedNode.title}
                  onChange={(v) => setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, title: v } : n))}
                />

                <div className="flex gap-xxxs items-start">
                  <button
                    onClick={() => setPropsMode('parameters')}
                    className={`h-8 flex items-center justify-center px-s rounded-s bg-control font-grotesk text-caps tracking-[1.6px] uppercase ${propsMode === 'parameters' ? 'text-primary' : 'text-secondary'}`}
                  >
                    Parameters
                  </button>
                  <button
                    onClick={() => setPropsMode('custom')}
                    className={`h-8 flex items-center justify-center px-s rounded-s bg-control font-grotesk text-caps tracking-[1.6px] uppercase ${propsMode === 'custom' ? 'text-primary' : 'text-secondary'}`}
                  >
                    Custom code
                  </button>
                </div>

                <TextArea showHeadline headline="Letter headline" className="h-[48px]" value={selectedNode.fields.headline} onChange={(v) => updateSelectedField('headline', v)} />
                <TextArea showHeadline headline="Main text"       className="h-[70px]" value={selectedNode.fields.main}     onChange={(v) => updateSelectedField('main', v)} />
                <TextArea showHeadline headline="Body text"       className="h-[70px]" value={selectedNode.fields.body}     onChange={(v) => updateSelectedField('body', v)} />
                <TextArea showHeadline headline="Bye-bye text"    className="h-[70px]" value={selectedNode.fields.bye}      onChange={(v) => updateSelectedField('bye', v)} />
              </div>

              <Btn btnType="small" label="Save" />
            </div>
          ) : (
            <div className="bg-card-white rounded-l p-x flex flex-col gap-l w-full">
              <span className="font-antiqa text-[40px] tracking-[-0.4px] text-primary">Node Properties</span>
              <span className="font-grotesk text-grotesk leading-grotesk text-secondary">Select a node on the canvas to edit its properties</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
