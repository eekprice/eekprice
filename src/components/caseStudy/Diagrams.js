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

const DIAGRAMS = { workstreams: Workstreams, workflow: Workflow, keystone: KeystonePhases };

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
