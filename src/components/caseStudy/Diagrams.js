import React from 'react';

// Diagrams for the case study pages, picked by name from a `diagram` block.
// These three come from Erica's doc "Leading UX at Yum Brands" (see
// CaseStudy/yum-ux-leadership.md), redrawn in the site's ink and teal.
// The words inside them are hers. Change them there first.

const INK = 'currentColor';
const ACCENT = '#0d9488';
const edge = { stroke: INK, strokeOpacity: 0.45, strokeWidth: 1.25 };
const hot = { stroke: ACCENT, strokeWidth: 2 };

function Workstreams() {
  const left = 24, wide = 712, gap = 16, pw = 166, py = 116, ph = 170;
  const px = (i) => left + i * (pw + gap);
  const mid = (i) => px(i) + pw / 2;
  const pillars = [
    { name: 'Product audit', lines: [['Audit every product', 'in the suite'], ['Feature inventory', 'Cut duplicate flows']] },
    { name: 'Store research', lines: [['In-store visits, US', 'and international'], ['Personas, journey', 'maps, jobs to be done']], foot: 'Became Project Keystone', hot: true },
    { name: 'Design system', lines: [['One shared library', 'across products'], ['Components, code,', 'and documentation']] },
    { name: 'Design team', lines: [['Senior lead for each', 'product area'], ['Researchers and a', 'design ops role']] },
  ];

  return (
    <svg viewBox="0 0 760 368" role="img" aria-label="Four workstreams to turn many products into one platform: product audit, store research, design system and design team. Store research became Project Keystone." fontSize="11.5" fill={INK}>
      <text x={left} y="30" fontSize="15" fontWeight="600">Four workstreams to turn many products into one platform</text>
      <rect x={left} y="48" width={wide} height="44" rx="8" fill={INK} fillOpacity="0.05" {...edge} />
      <text x={left + wide / 2} y="75" textAnchor="middle" fontSize="14" fontWeight="600">Goal: one scalable Byte platform for international markets</text>
      {pillars.map((p, i) => (
        <g key={p.name}>
          <line x1={mid(i)} y1="92" x2={mid(i)} y2={py} {...(p.hot ? hot : edge)} strokeWidth="1.25" />
          <rect x={px(i)} y={py} width={pw} height={ph} rx="8" fill={p.hot ? ACCENT : 'none'} fillOpacity={p.hot ? 0.12 : 1} {...(p.hot ? hot : edge)} />
          <line x1={px(i) + 16} y1={py + 40} x2={px(i) + pw - 16} y2={py + 40} stroke={INK} strokeOpacity="0.15" />
          <text x={mid(i)} y={py + 26} textAnchor="middle" fontSize="13" fontWeight="600">{p.name}</text>
          {p.lines.map((pair, g) => pair.map((line, l) => (
            <text key={line} x={px(i) + 16} y={py + 62 + g * 42 + l * 16}>{line}</text>
          )))}
          {p.foot && <text x={px(i) + 16} y={py + 152} fontWeight="600">{p.foot}</text>}
        </g>
      ))}
      <rect x={left} y={py + ph + 16} width={wide} height="40" rx="8" fill="none" {...edge} strokeDasharray="4 4" />
      <text x={left + wide / 2} y={py + ph + 40} textAnchor="middle" fontSize="13">Audit and research feed a design sprint to map the first rollout</text>
    </svg>
  );
}

function Workflow() {
  const W = 124, H = 44;
  const X = [212, 356, 500, 644];
  const R = [100, 180, 260, 340];
  const lanes = ['Intake', 'Discover', 'Ideate', 'Deliver'];
  // Each row: the boxes left to right. `crit` marks a critique.
  const rows = [
    [{ t: ['PRD passes', 'UX checklist'] }, { t: ['Epic created'] }, { t: ['Triage and', 'kickoff'] }],
    [{ t: ['Discovery', 'research'] }, { t: ['Discovery', 'design'] }, { t: ['Design crit 30'], crit: true }],
    [{ t: ['Feature', 'ideation'] }, { t: ['Design crit 60'], crit: true }],
    [{ t: ['Hi-fi design'] }, { t: ['Concept', 'validation'] }, { t: ['Design crit 90'], crit: true }, { t: ['Handoff'], bold: true }],
  ];

  return (
    <svg viewBox="0 0 760 428" role="img" aria-label="The design workflow. Intake: PRD passes the UX checklist, epic created, triage and kickoff. Discover: discovery research, discovery design, design crit 30. Ideate: feature ideation, design crit 60. Deliver: hi-fi design, concept validation, design crit 90, handoff." fontSize="13" fill={INK}>
      <defs>
        <marker id="wf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={INK} fillOpacity="0.55" />
        </marker>
      </defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">Every epic followed the same path, with critiques at 30, 60 and 90</text>
      <text x="24" y="54" fontSize="11.5" fillOpacity="0.65">Jira automation created each next story when the last one was marked done</text>
      <g fill="none" {...edge}>
        {rows.map((row, r) => (
          <g key={lanes[r]}>
            {row.slice(1).map((_, i) => (
              <path key={i} d={`M${X[i] + W / 2} ${R[r]}H${X[i + 1] - W / 2}`} markerEnd="url(#wf-arrow)" />
            ))}
            {r < rows.length - 1 && (
              <path d={`M${X[row.length - 1]} ${R[r] + H / 2}V${R[r] + 40}H${X[0]}V${R[r + 1] - H / 2}`} markerEnd="url(#wf-arrow)" />
            )}
          </g>
        ))}
      </g>
      {rows.map((row, r) => (
        <g key={lanes[r]}>
          <text x="24" y={R[r] + 4} fontWeight="600">{lanes[r]}</text>
          {row.map((b, i) => (
            <g key={b.t.join(' ')}>
              <rect x={X[i] - W / 2} y={R[r] - H / 2} width={W} height={H} rx="8" fill={b.crit ? ACCENT : 'none'} fillOpacity={b.crit ? 0.12 : 1} {...(b.crit ? hot : edge)} />
              {b.t.map((line, l) => (
                <text key={line} x={X[i]} y={R[r] + (b.t.length === 1 ? 4 : -3 + l * 16)} textAnchor="middle" fontWeight={b.bold ? 600 : 400}>{line}</text>
              ))}
            </g>
          ))}
        </g>
      ))}
      <text x="24" y="404" fontSize="11.5" fillOpacity="0.65">Both research steps carried the same subtasks: study brief, asset creation, launch, analysis and synthesis.</text>
    </svg>
  );
}

function KeystonePhases() {
  const rows = [
    { label: 'Onboard research vendor', start: 0, end: 1 },
    { label: 'Internal SME interviews', start: 1, end: 3 },
    { label: 'Store visit planning', start: 2, end: 4 },
    { label: 'Research scripts', start: 3, end: 5 },
    { label: 'Leadership and legal review', start: 5, end: 5, hot: true },
    { label: 'Store and virtual fieldwork', start: 5, end: 7, hot: true },
    { label: 'Synthesis and insights', start: 7, end: 8 },
  ];
  const X = (w) => 240 + w * 50;
  const Y = (i) => 112 + 34 * i;

  return (
    <svg viewBox="0 0 760 360" role="img" aria-label={`Project Keystone, planned phases by week. ${rows.map((r) => `${r.label}: week ${r.start === r.end ? r.start : `${r.start} to ${r.end}`}`).join('. ')}.`} fontSize="13" fill={INK}>
      <text x="24" y="30" fontSize="15" fontWeight="600">Fieldwork was planned to start only after leadership and legal reviewed the scripts</text>
      <text x="24" y="50" fontSize="11.5" fillOpacity="0.65">Planned phases by week, from the core team kickoff</text>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((w) => (
        <g key={w}>
          <line x1={X(w)} x2={X(w)} y1="92" y2="330" stroke={INK} strokeOpacity="0.15" />
          <text x={X(w)} y="84" textAnchor="middle" fontSize="11.5" fillOpacity="0.65">{`Wk ${w}`}</text>
        </g>
      ))}
      <line x1={X(0)} x2={X(8)} y1="92" y2="92" {...edge} />
      {rows.map((r, i) => {
        const y = Y(i);
        const one = r.start === r.end;
        const c = r.hot ? ACCENT : INK;
        return (
          <g key={r.label}>
            <text x="24" y={y + 4} fontWeight={r.hot ? 600 : 400}>{r.label}</text>
            {one ? (
              <path d={`M${X(r.start)} ${y - 9}l9 9l-9 9l-9 -9z`} fill={c} />
            ) : (
              <rect x={X(r.start)} y={y - 8} width={X(r.end) - X(r.start)} height="16" rx="8" fill={c} fillOpacity={r.hot ? 0.25 : 0.12} stroke={c} strokeOpacity={r.hot ? 1 : 0.45} strokeWidth={r.hot ? 2 : 1.25} />
            )}
            <text x={X(r.end) + 14} y={y + 4} fontSize="11.5" fillOpacity="0.65">{one ? `Wk ${r.start}` : `Wk ${r.start} to ${r.end}`}</text>
          </g>
        );
      })}
    </svg>
  );
}

// The next four come from Erica's doc "Cutting dropped trade data by 100% at
// Topstep" (see CaseStudy/topstep.md). Same rule: the words are hers.
const BAD = '#dc2626';
const bad = { stroke: BAD, strokeWidth: 1.5 };

function Arrow({ id, color = INK, opacity = 0.55 }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill={color} fillOpacity={opacity} />
    </marker>
  );
}

function TradeBreak() {
  const W = 180, H = 52, rowA = 110, rowB = 206, bx = 252;
  const C = [124, 380, 636];
  const top = ['Trade', 'Account status', 'Payout'];
  const risks = ['Missing data', 'Inaccurate status', 'Payout risk'];

  return (
    <svg viewBox="0 0 760 256" role="img" aria-label="When trade data drops, status and payouts go wrong. Data is lost or delayed between the trade and the account status. That leads to missing data, then an inaccurate status, then payout risk." fontSize="13" fill={INK}>
      <defs>
        <Arrow id="tb-arrow" />
        <Arrow id="tb-arrow-bad" color={BAD} opacity={1} />
      </defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">When trade data drops, status and payouts go wrong</text>
      <g fill="none" {...edge}>
        <path d={`M${C[1] + W / 2} ${rowA}H${C[2] - W / 2}`} markerEnd="url(#tb-arrow)" />
        {C.map((c) => <path key={c} d={`M${c} ${rowA + H / 2}V${rowB - H / 2}`} strokeDasharray="4 4" />)}
      </g>
      <g fill="none" stroke={BAD} strokeWidth="2">
        <path d={`M${C[0] + W / 2} ${rowA}H${C[1] - W / 2}`} strokeDasharray="6 5" />
        <path d={`M${bx - 7} ${rowA - 7}L${bx + 7} ${rowA + 7}M${bx + 7} ${rowA - 7}L${bx - 7} ${rowA + 7}`} />
      </g>
      <g fill="none" {...bad}>
        <path d={`M${C[0] + W / 2} ${rowB}H${C[1] - W / 2}`} markerEnd="url(#tb-arrow-bad)" />
        <path d={`M${C[1] + W / 2} ${rowB}H${C[2] - W / 2}`} markerEnd="url(#tb-arrow-bad)" />
      </g>
      {C.map((c, i) => (
        <g key={top[i]}>
          <rect x={c - W / 2} y={rowA - H / 2} width={W} height={H} rx="8" fill="none" {...edge} />
          <text x={c} y={rowA + 4} textAnchor="middle" fontWeight="600">{top[i]}</text>
          <rect x={c - W / 2} y={rowB - H / 2} width={W} height={H} rx="8" fill={BAD} fillOpacity="0.1" {...bad} />
          <text x={c} y={rowB + 4} textAnchor="middle">{risks[i]}</text>
        </g>
      ))}
      <text x={bx} y={rowA - 38} textAnchor="middle" fontSize="11.5" fillOpacity="0.65">data lost or delayed here</text>
    </svg>
  );
}

function ImpactMap() {
  const cw = 208, xa = 24, xb = 264, xc = 504, y0 = 90, tall = 188;
  const R = [116, 184, 252];
  const trader = [['Account status looks wrong'], ['Payout can be wrong'], ['Dashboards and', 'notifications fall behind']];
  const business = ['Trader trust at risk', 'Payout risk', 'Manual backfill every day'];

  return (
    <svg viewBox="0 0 760 302" role="img" aria-label="One data issue reaches the trader, then the business. System issue: trade data lost or delayed between systems. Trader impact: account status looks wrong, payout can be wrong, dashboards and notifications fall behind. Business impact: trader trust at risk, payout risk, manual backfill every day." fontSize="13" fill={INK}>
      <defs><Arrow id="im-arrow" /></defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">One data issue reaches the trader, then the business</text>
      {[['System issue', xa], ['Trader impact', xb], ['Business impact', xc]].map(([label, x]) => (
        <text key={label} x={x} y="74" fontSize="11.5" fillOpacity="0.65">{label}</text>
      ))}
      <g fill="none" {...edge}>
        {R.map((y) => (
          <g key={y}>
            <path d={`M${xa + cw} ${y}H${xb}`} markerEnd="url(#im-arrow)" />
            <path d={`M${xb + cw} ${y}H${xc}`} markerEnd="url(#im-arrow)" />
          </g>
        ))}
      </g>
      <rect x={xa} y={y0} width={cw} height={tall} rx="8" fill={ACCENT} fillOpacity="0.12" {...hot} />
      {['Trade data lost', 'or delayed', 'between systems'].map((line, i) => (
        <text key={line} x={xa + cw / 2} y={R[1] - 14 + i * 18} textAnchor="middle" fontWeight="600">{line}</text>
      ))}
      {trader.map((lines, i) => (
        <g key={lines[0]}>
          <rect x={xb} y={R[i] - 26} width={cw} height="52" rx="8" fill="none" {...edge} />
          {lines.map((line, l) => (
            <text key={line} x={xb + cw / 2} y={R[i] + (lines.length === 1 ? 4 : -4 + l * 16)} textAnchor="middle">{line}</text>
          ))}
        </g>
      ))}
      <rect x={xc} y={y0} width={cw} height={tall} rx="8" fill="none" {...edge} />
      {business.map((line, i) => (
        <text key={line} x={xc + cw / 2} y={R[i] + 4} textAnchor="middle">{line}</text>
      ))}
    </svg>
  );
}

function MigrationPhases() {
  const bw = 216, y0 = 56, bh = 96;
  const phases = [
    { x: 24, name: 'Foundation', dates: 'Oct to Nov 2025', line: 'Standards, tracing, safety nets' },
    { x: 264, name: 'Trade sync migration', dates: 'Dec 2025 to Jan 2026', line: 'Live in production in January', hot: true },
    { x: 504, name: 'Stabilize and expand', dates: 'Jan to Feb 2026', line: 'Balance updates, more workflows' },
  ];

  return (
    <svg viewBox="0 0 760 176" role="img" aria-label={`Foundation first, then the hardest workflow. ${phases.map((p) => `${p.name}, ${p.dates}: ${p.line}`).join('. ')}.`} fontSize="13" fill={INK}>
      <defs><Arrow id="mp-arrow" /></defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">Foundation first, then the hardest workflow</text>
      <g fill="none" {...edge}>
        <path d={`M${phases[0].x + bw} ${y0 + bh / 2}H${phases[1].x}`} markerEnd="url(#mp-arrow)" />
        <path d={`M${phases[1].x + bw} ${y0 + bh / 2}H${phases[2].x}`} markerEnd="url(#mp-arrow)" />
      </g>
      {phases.map((p) => (
        <g key={p.name}>
          <rect x={p.x} y={y0} width={bw} height={bh} rx="8" fill={p.hot ? ACCENT : 'none'} fillOpacity={p.hot ? 0.12 : 1} {...(p.hot ? hot : edge)} />
          <text x={p.x + 16} y={y0 + 28} fontWeight="600">{p.name}</text>
          <text x={p.x + 16} y={y0 + 48} fontSize="11.5" fillOpacity="0.65">{p.dates}</text>
          <text x={p.x + 16} y={y0 + 74} fontSize="11.5">{p.line}</text>
        </g>
      ))}
    </svg>
  );
}

function DataOwnership() {
  const pw = 332, y0 = 56, ph = 180, bw = 132, bh = 64, by = 120;
  const panels = [
    { x: 24, name: 'Before', link: 'raw data replication', a: 'holds trade data', b: 'holds a copy', foot: 'Same data in two places' },
    { x: 404, name: 'Proposed', link: 'business events', a: 'owns trade data', b: 'reacts to events', foot: 'Payouts first, then dashboards', hot: true },
  ];

  return (
    <svg viewBox="0 0 760 260" role="img" aria-label="Proposed: one owner for trade data, events for everything else. Before: the trading system holds trade data and sends raw data replication downstream, which holds a copy, so the same data is in two places. Proposed: the trading system owns trade data and sends business events downstream, which reacts to events. Payouts first, then dashboards." fontSize="13" fill={INK}>
      <defs><Arrow id="do-arrow" /></defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">Proposed: one owner for trade data, events for everything else</text>
      {panels.map((p) => (
        <g key={p.name}>
          <rect x={p.x} y={y0} width={pw} height={ph} rx="8" fill={p.hot ? ACCENT : 'none'} fillOpacity={p.hot ? 0.08 : 1} {...(p.hot ? hot : edge)} />
          <text x={p.x + 16} y={y0 + 24} fontWeight="600">{p.name}</text>
          <rect x={p.x + 16} y={by} width={bw} height={bh} rx="8" fill="none" {...edge} />
          <rect x={p.x + pw - 16 - bw} y={by} width={bw} height={bh} rx="8" fill="none" {...edge} />
          <path d={`M${p.x + 16 + bw} ${by + bh / 2}H${p.x + pw - 16 - bw}`} fill="none" {...edge} markerEnd="url(#do-arrow)" />
          <text x={p.x + pw / 2} y={by - 10} textAnchor="middle" fontSize="11.5" fillOpacity="0.65">{p.link}</text>
          <text x={p.x + 82} y={by + 28} textAnchor="middle" fontWeight="600">Trading system</text>
          <text x={p.x + 82} y={by + 46} textAnchor="middle" fontSize="11.5" fillOpacity="0.65">{p.a}</text>
          <text x={p.x + pw - 82} y={by + 28} textAnchor="middle" fontWeight="600">Downstream</text>
          <text x={p.x + pw - 82} y={by + 46} textAnchor="middle" fontSize="11.5" fillOpacity="0.65">{p.b}</text>
          <text x={p.x + pw / 2} y={y0 + ph - 16} textAnchor="middle" fontSize="11.5" fillOpacity="0.65">{p.foot}</text>
        </g>
      ))}
    </svg>
  );
}

// The next two are for the aerospace program study (CaseStudy/ge-aerospace.md).
// Erica's draft describes eleven visuals. These are the two that can be drawn
// from her words alone, with nothing made up.
function RequestMap() {
  const W = 168, H = 48, cx = 380, cy = 178;
  // Where each source sits, and where its arrow lands on the team box.
  const sources = [
    { name: 'Sponsor', x: 116, y: 96, to: [cx - 96, cy - 18] },
    { name: 'Customer team', x: 116, y: 250, to: [cx - 96, cy + 18] },
    { name: 'Leadership', x: 380, y: 74, to: [cx, cy - 40] },
    { name: 'Security', x: 644, y: 96, to: [cx + 96, cy - 18] },
    { name: 'Other internal teams', x: 644, y: 250, to: [cx + 96, cy + 18] },
  ];
  const from = (s) => (s.x === cx ? [s.x, s.y + H / 2] : [s.x + (s.x < cx ? W / 2 : -W / 2), s.y]);

  return (
    <svg viewBox="0 0 760 300" role="img" aria-label="Requests came in from every direction: the sponsor, the customer team, leadership, security and other internal teams all sent work straight to the team. There was no intake process." fontSize="13" fill={INK}>
      <defs><Arrow id="rm-arrow" /></defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">Requests came in from every direction</text>
      <g fill="none" {...edge}>
        {sources.map((s) => {
          const [x1, y1] = from(s);
          return <path key={s.name} d={`M${x1} ${y1}L${s.to[0]} ${s.to[1]}`} markerEnd="url(#rm-arrow)" />;
        })}
      </g>
      {sources.map((s) => (
        <g key={s.name}>
          <rect x={s.x - W / 2} y={s.y - H / 2} width={W} height={H} rx="8" fill="none" {...edge} />
          <text x={s.x} y={s.y + 4} textAnchor="middle">{s.name}</text>
        </g>
      ))}
      <rect x={cx - 96} y={cy - 40} width="192" height="80" rx="8" fill={ACCENT} fillOpacity="0.12" {...hot} />
      <text x={cx} y={cy - 2} textAnchor="middle" fontWeight="600">The team</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11.5" fillOpacity="0.65">no intake process</text>
    </svg>
  );
}

function DecisionCard() {
  const bw = 296, bh = 64, xa = 24, xc = 440;
  const plans = [
    { y: 60, name: 'Plan A', line: 'The full delivery' },
    { y: 148, name: 'Plan B', line: 'The smaller fallback' },
  ];
  const mid = 136;

  return (
    <svg viewBox="0 0 760 236" role="img" aria-label="A main plan, a fallback, and a date to decide. Plan A is the full delivery. Plan B is the smaller fallback. A checkpoint is the date that decides between them." fontSize="13" fill={INK}>
      <defs><Arrow id="dc-arrow" /></defs>
      <text x="24" y="34" fontSize="15" fontWeight="600">A main plan, a fallback, and a date to decide</text>
      <g fill="none" {...edge}>
        {plans.map((p) => (
          <path key={p.name} d={`M${xa + bw} ${p.y + bh / 2}H${xa + bw + 60}V${mid}H${xc}`} markerEnd="url(#dc-arrow)" />
        ))}
      </g>
      {plans.map((p) => (
        <g key={p.name}>
          <rect x={xa} y={p.y} width={bw} height={bh} rx="8" fill="none" {...edge} />
          <text x={xa + 16} y={p.y + 27} fontWeight="600">{p.name}</text>
          <text x={xa + 16} y={p.y + 47} fontSize="11.5" fillOpacity="0.65">{p.line}</text>
        </g>
      ))}
      <rect x={xc} y={mid - 44} width={bw} height="88" rx="8" fill={ACCENT} fillOpacity="0.12" {...hot} />
      <text x={xc + 16} y={mid - 10} fontWeight="600">Checkpoint</text>
      <text x={xc + 16} y={mid + 12} fontSize="11.5">The date that decides between them</text>
    </svg>
  );
}

const DIAGRAMS = {
  'request-map': RequestMap,
  'decision-card': DecisionCard,
  workstreams: Workstreams,
  workflow: Workflow,
  keystone: KeystonePhases,
  'trade-break': TradeBreak,
  'impact-map': ImpactMap,
  'migration-phases': MigrationPhases,
  'data-ownership': DataOwnership,
};

// Scrolls sideways on a phone so the words stay big enough to read.
export default function Diagram({ name, caption }) {
  const Drawing = DIAGRAMS[name];
  if (!Drawing) return null;
  return (
    <figure className="m-0">
      <div className="overflow-x-auto" tabIndex={0} role="group" aria-label={caption || 'Diagram'}>
        <div className="min-w-[640px] font-inter text-surface-foreground100-light dark:text-surface-foreground100-dark">
          <Drawing />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm font-inter text-surface-foreground400-light dark:text-surface-foreground400-dark">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
