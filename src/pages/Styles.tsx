import { colors, fontSizes, indents, radius, fonts } from '../tokens/tokens';

// ── Typography class maps ─────────────────────────────────────────────────

const fontCls: Record<keyof typeof fonts, string> = {
  antiqa:  'font-antiqa',
  grotesk: 'font-grotesk',
  pixel:   'font-pixel',
};

const sizeCls: Record<keyof typeof fontSizes, string> = {
  h1:          'text-h1 leading-h1',
  h2:          'text-h2 leading-h2',
  description: 'text-desc leading-desc',
  h3:          'text-h3 leading-h3',
  h4:          'text-h4 leading-h4',
  textPixel:   'text-pixel leading-pixel',
  textGrotesk: 'text-grotesk leading-grotesk',
  textBold:    'text-grotesk leading-grotesk',
  caps:        'text-caps leading-caps',
};

const weightCls: Record<number, string> = {
  400: 'font-normal',
  600: 'font-semibold',
  700: 'font-bold',
};

const roundedCls: Record<keyof typeof radius, string> = {
  s:    'rounded-s',
  m:    'rounded-m',
  l:    'rounded-l',
  over: 'rounded-over',
};

// ── Color groups ──────────────────────────────────────────────────────────

type CE = { hex: string; tw: string };
type CG = { label: string; entries: [string, CE][] };

const colorGroups: CG[] = [
  { label: 'Base',
    entries: (['black','gray','lines','superYellow','bgBase'] as const).map(k => [k, colors[k]]) },
  { label: 'Text & Icons',
    entries: (['textPrimary','textSecondary','textOnColor','textBrown','textGreen','textYellowDark'] as const).map(k => [k, colors[k]]) },
  { label: 'Controls',
    entries: (['controlSecondary','controlOnColorWhite','controlOnColorBrown','controlOnColorYellowDark'] as const).map(k => [k, colors[k]]) },
  { label: 'Card backgrounds',
    entries: (['cardWhite','cardRed','cardGreen','cardYellow','cardPink','cardViolet'] as const).map(k => [k, colors[k]]) },
  { label: 'On-card backgrounds',
    entries: (['onCardRed','onCardGreen','onCardYellowDark','onCardYellow','onCardPink','onCardViolet'] as const).map(k => [k, colors[k]]) },
  { label: 'Tech / Status',
    entries: (['techPurple','techGreen','techRed','techGray'] as const).map(k => [k, colors[k]]) },
  { label: 'Progress Bar',
    entries: (['barFilled','barEmpty'] as const).map(k => [k, colors[k]]) },
];

function Swatch({ label, entry }: { label: string; entry: CE }) {
  return (
    <div className="flex flex-col gap-[6px] w-[100px]">
      <div
        className="w-[100px] h-16 rounded-m"
        style={{
          background: entry.hex,
          border: entry.hex === '#ffffff' ? '1px solid var(--color-lines)' : 'none',
        }}
      />
      <div className="text-pixel leading-[1.4]">
        <div className="font-semibold text-primary font-grotesk">{label}</div>
        <div className="text-secondary font-mono">{entry.hex}</div>
        <div className="text-[9px] text-secondary font-mono">{entry.tw}</div>
      </div>
    </div>
  );
}

// ── Section shell ─────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-14">
      <div className="font-grotesk text-grotesk font-semibold tracking-widest uppercase text-secondary mb-m pb-xxs border-b border-lines">
        {title}
      </div>
      {children}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export default function Styles() {
  return (
    <div className="min-h-screen bg-base px-12 py-10 font-grotesk text-primary">

      <h1 className="font-antiqa text-h2 leading-h2 font-normal mb-12">Styles</h1>

      {/* ── Colors ─────────────────────────────────────────────────────── */}
      <Section title="Colors">
        <div className="flex flex-col gap-8">
          {colorGroups.map(group => (
            <div key={group.label}>
              <div className="text-grotesk font-semibold text-secondary mb-3">{group.label}</div>
              <div className="flex gap-4 flex-wrap">
                {group.entries.map(([key, entry]) => (
                  <Swatch key={key} label={key} entry={entry as CE} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Typography ─────────────────────────────────────────────────── */}
      <Section title="Typography">
        <div className="flex flex-col">
          {/* header row */}
          <div className="grid gap-6 pb-xxs border-b border-lines text-[9px] font-semibold text-secondary"
               style={{ gridTemplateColumns: '1fr 160px 48px 40px 60px' }}>
            <span>Name</span><span>Font</span><span>Size</span><span>LH</span><span>Weight</span>
          </div>

          {(Object.keys(fontSizes) as (keyof typeof fontSizes)[]).map(key => {
            const t = fontSizes[key];
            const label = key === 'description' ? 'Description'
                        : key === 'textPixel'   ? 'text - pixel'
                        : key === 'textGrotesk' ? 'text - grotesk'
                        : key === 'textBold'    ? 'text - bold'
                        : key.toUpperCase();
            return (
              <div key={key}
                   className="grid gap-6 py-m border-b border-lines items-center"
                   style={{ gridTemplateColumns: '1fr 160px 48px 40px 60px' }}>
                {/* sample at actual size */}
                <span className={`${fontCls[t.font as keyof typeof fonts]} ${sizeCls[key]} ${weightCls[t.weight]} overflow-hidden whitespace-nowrap block`}>
                  {label}
                </span>
                <span className="text-grotesk text-secondary">{fonts[t.font as keyof typeof fonts].family}</span>
                <span className="text-grotesk text-secondary">{t.px}</span>
                <span className="text-grotesk text-secondary">{t.lh}</span>
                <span className="text-grotesk text-secondary">{t.weight}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Spacing ────────────────────────────────────────────────────── */}
      <Section title="Indents (Spacing)">
        <div className="flex flex-wrap gap-4 items-end">
          {(Object.entries(indents) as [string, { px: number; tw: string }][])
            .filter(([, v]) => v.px > 0)
            .map(([key, val]) => (
              <div key={key} className="flex flex-col items-center gap-[6px]">
                <div
                  className="w-8 bg-yellow rounded-[2px]"
                  style={{ height: val.px, minHeight: 2 }}
                />
                <div className="text-[9px] text-center text-secondary leading-[1.4]">
                  <div className="font-semibold">{key}</div>
                  <div>{val.px}px</div>
                  <div className="font-mono">{val.tw}</div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4 text-[9px] text-secondary">
          Negative: <code className="font-mono">-p-xs (−8px)</code> · <code className="font-mono">−1px</code>
        </div>
      </Section>

      {/* ── Border radius ───────────────────────────────────────────────── */}
      <Section title="Border Radius">
        <div className="flex gap-6 flex-wrap items-end">
          {(Object.keys(radius) as (keyof typeof radius)[]).map(key => {
            const val = radius[key];
            return (
              <div key={key} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-yellow ${roundedCls[key]}`} />
                <div className="text-[9px] text-center text-secondary leading-[1.4]">
                  <div className="font-semibold">{key}</div>
                  <div>{val.px === 999 ? 'pill' : `${val.px}px`}</div>
                  <div className="font-mono">{val.tw}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

    </div>
  );
}
