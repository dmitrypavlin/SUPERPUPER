import { useNavigate } from 'react-router-dom';

type CardIconKey = 'swatches' | 'atom' | 'molecule' | 'organism' | 'template' | 'sitemap';

const CARDS: { label: string; path: string; icon: CardIconKey; bg: string }[] = [
  { label: 'Styles',    path: '/styles',    icon: 'swatches', bg: 'bg-card-yellow' },
  { label: 'Atoms',     path: '/atoms',     icon: 'atom',      bg: 'bg-card-red' },
  { label: 'Molecules', path: '/molecules', icon: 'molecule',  bg: 'bg-card-pink' },
  { label: 'Organisms', path: '/organisms', icon: 'organism',  bg: 'bg-card-violet' },
  { label: 'Design',    path: '/design',    icon: 'template',  bg: 'bg-card-green' },
  { label: 'Site Map',  path: '/sitemap',   icon: 'sitemap',   bg: 'bg-control' },
];

function CardIcon({ icon }: { icon: CardIconKey }) {
  switch (icon) {
    case 'swatches':
      return (
        <svg viewBox="0 0 24 24" className="size-8">
          <circle cx="6" cy="12" r="4.5" fill="black" />
          <circle cx="14" cy="12" r="4.5" fill="black" fillOpacity="0.55" />
          <circle cx="20.5" cy="12" r="3" fill="black" fillOpacity="0.3" />
        </svg>
      );
    case 'atom':
      return (
        <svg viewBox="0 0 24 24" className="size-8" fill="none">
          <circle cx="11" cy="12" r="8.5" stroke="black" strokeWidth="2" />
          <circle cx="20" cy="5" r="2.8" fill="black" />
        </svg>
      );
    case 'molecule':
      return (
        <svg viewBox="0 0 24 24" className="size-8" fill="none">
          <path d="M6 18 18 18 12 6 Z" stroke="black" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" fill="black" />
          <circle cx="18" cy="18" r="3" fill="black" />
          <circle cx="12" cy="6" r="3" fill="black" />
        </svg>
      );
    case 'organism':
      return (
        <svg viewBox="0 0 24 24" className="size-8">
          {[4, 11.5, 19].flatMap(cy =>
            [4, 11.5, 19].map(cx => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" fill="black" />)
          )}
        </svg>
      );
    case 'template':
      return (
        <svg viewBox="0 0 24 24" className="size-8" fill="none">
          <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="black" strokeWidth="2" strokeDasharray="3.5 3.5" />
        </svg>
      );
    case 'sitemap':
      return (
        <svg viewBox="0 0 24 24" className="size-8" fill="none">
          <circle cx="12" cy="4.2" r="2.4" fill="black" />
          <circle cx="4.5" cy="19" r="2.4" fill="black" />
          <circle cx="19.5" cy="19" r="2.4" fill="black" />
          <path d="M12 6.6V13M12 13 4.5 16.8M12 13 19.5 16.8" stroke="black" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base">

      {/* Cover */}
      <div className="bg-black flex flex-col items-center justify-center gap-xs py-xxl px-l">
        <span className="font-pixel text-[min(13vw,110px)] leading-none tracking-[4px] text-yellow text-center">
          SUPERPUPER
        </span>
        <span className="font-antiqa text-h2 leading-h2 text-on-color text-center italic">
          Design System
        </span>
      </div>

      {/* Card grid */}
      <div className="max-w-[1040px] mx-auto px-l py-xxl grid grid-cols-3 gap-l">
        {CARDS.map(c => (
          <button
            key={c.label}
            onClick={() => navigate(c.path)}
            className="bg-card-white rounded-l p-x flex flex-col gap-l items-start text-left cursor-pointer transition-all duration-150 ease-out hover:brightness-[0.96] active:brightness-[0.91] active:scale-[0.99]"
          >
            <div className={`size-20 rounded-m flex items-center justify-center ${c.bg}`}>
              <CardIcon icon={c.icon} />
            </div>
            <span className="font-antiqa text-h2 leading-h2 text-primary">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
