import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { AIX_COLOUR } from "@/lib/ai-transformation";
import { cn } from "@/lib/utils";

const accent = `var(--prism-colour-${AIX_COLOUR})`;
const fg = "var(--foreground)";
const muted = "var(--muted-foreground)";
const LOOP = 15; // seconds — one calm business → intelligence → impact cycle

type Zone = "inputs" | "engine" | "outcomes" | null;

/* ---------- geometry (desktop viewBox 600 × 520) ---------- */
const CORE = { x: 318, y: 262 };

const systems = [
  { id: "rev", label: "REVENUE & CUSTOMERS", x: 34, y: 34, colour: 3 },
  { id: "ops", label: "OPERATIONS", x: 8, y: 126, colour: 5 },
  { id: "fin", label: "FINANCE", x: 0, y: 218, colour: 4 },
  { id: "ppl", label: "PEOPLE", x: 8, y: 310, colour: 6 },
  { id: "tech", label: "ENTERPRISE TECHNOLOGY", x: 34, y: 402, colour: 2 },
] as const;
const PW = 150;
const PH = 76;

const outcomes = [
  { id: "grow", label: "GROW", sub: "Revenue growth", x: 462, y: 58 },
  { id: "opt", label: "OPTIMISE", sub: "Cost optimisation", x: 478, y: 164 },
  { id: "acc", label: "ACCELERATE", sub: "Productivity", x: 478, y: 270 },
  { id: "dec", label: "DECIDE", sub: "Better decisions", x: 462, y: 376 },
] as const;
const OW = 124;
const OH = 82;

const capabilities = [
  { short: "REASON", full: "AI Reasoning", a: -90 },
  { short: "PREDICT", full: "Predictive Intelligence", a: -18 },
  { short: "AUTOMATE", full: "Intelligent Automation", a: 54 },
  { short: "ACT", full: "AI Agents", a: 126 },
  { short: "ORCHESTRATE", full: "Workflow Orchestration", a: 198 },
];

const inPath = (s: (typeof systems)[number]) => {
  const sx = s.x + PW;
  const sy = s.y + PH / 2;
  return `M${sx},${sy} C${sx + 70},${sy} ${CORE.x - 110},${CORE.y + (sy - CORE.y) * 0.25} ${CORE.x - 58},${CORE.y + (sy - CORE.y) * 0.12}`;
};
const outPath = (o: (typeof outcomes)[number]) => {
  const ex = o.x;
  const ey = o.y + OH / 2;
  return `M${CORE.x + 58},${CORE.y + (ey - CORE.y) * 0.12} C${CORE.x + 110},${CORE.y + (ey - CORE.y) * 0.3} ${ex - 60},${ey} ${ex},${ey}`;
};

/* keyTimes helpers for a seamless loop: active between fractions a→b of LOOP */
const span = (a: number, b: number) => ({
  keyPoints: "0;0;1;1",
  keyTimes: `0;${a};${b};1`,
});
const pulse = (a: number, peak: number, b: number) => ({
  values: "0;0;1;0;0",
  keyTimes: `0;${a};${peak};${b};1`,
});

/* ---------- miniature panel visuals ---------- */
function PanelArt({ id, x, y }: { id: string; x: number; y: number }) {
  const ox = x + 12;
  const oy = y + 30;
  const s = { stroke: fg, strokeOpacity: 0.55, fill: "none", strokeWidth: 1 } as const;
  switch (id) {
    case "rev": // sales funnel + interactions
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={ox + i * 6} y={oy + i * 9} width={70 - i * 12} height={6} rx={1.5} fill={fg} fillOpacity={0.5 - i * 0.1} />
          ))}
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={ox + 96 + i * 12} cy={oy + 14 + (i % 2) * 10} r={3} {...s} />
          ))}
        </g>
      );
    case "ops": // supplier network + inventory
      return (
        <g>
          <path d={`M${ox + 6},${oy + 30} L${ox + 30},${oy + 8} L${ox + 56},${oy + 26} L${ox + 30},${oy + 8} L${ox + 18},${oy + 34}`} {...s} />
          {([[6, 30], [30, 8], [56, 26], [18, 34]] as const).map(([dx, dy], i) => (
            <circle key={i} cx={ox + dx} cy={oy + dy} r={2.5} fill={fg} fillOpacity={0.7} />
          ))}
          <rect x={ox + 76} y={oy + 12} width={46} height={6} rx={3} fill={fg} fillOpacity={0.12} />
          <rect x={ox + 76} y={oy + 12} width={30} height={6} rx={3} fill={fg} fillOpacity={0.5} />
          <rect x={ox + 76} y={oy + 26} width={46} height={6} rx={3} fill={fg} fillOpacity={0.12} />
          <rect x={ox + 76} y={oy + 26} width={38} height={6} rx={3} fill={fg} fillOpacity={0.35} />
        </g>
      );
    case "fin": // cash-flow trend
      return (
        <g>
          <line x1={ox} y1={oy + 36} x2={ox + 126} y2={oy + 36} stroke={fg} strokeOpacity={0.15} />
          <path d={`M${ox},${oy + 28} L${ox + 18},${oy + 22} L${ox + 36},${oy + 26} L${ox + 56},${oy + 14} L${ox + 76},${oy + 18} L${ox + 98},${oy + 8} L${ox + 126},${oy + 10}`} {...s} strokeOpacity={0.75} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={ox + 4 + i * 21} y={oy + 38} width={12} height={2} fill={fg} fillOpacity={0.25} />
          ))}
        </g>
      );
    case "ppl": // workforce dashboard
      return (
        <g>
          {[18, 28, 22, 34, 26, 30, 20].map((h, i) => (
            <rect key={i} x={ox + i * 11} y={oy + 38 - h} width={6} height={h} rx={1} fill={fg} fillOpacity={0.22 + (i % 3) * 0.12} />
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={ox + 92} cy={oy + 6 + i * 13} r={3.5} {...s} />
              <rect x={ox + 100} y={oy + 4 + i * 13} width={24 - i * 5} height={4} rx={2} fill={fg} fillOpacity={0.3} />
            </g>
          ))}
        </g>
      );
    default: // enterprise stack
      return (
        <g>
          {["ERP", "CRM", "DATA", "APPS"].map((t, i) => (
            <g key={t}>
              <rect x={ox + i * 32} y={oy + 8} width={28} height={22} rx={3} fill={fg} fillOpacity={0.05} stroke={fg} strokeOpacity={0.25} />
              <text x={ox + i * 32 + 14} y={oy + 22} textAnchor="middle" fontSize={6.5} fill={fg} fillOpacity={0.7} letterSpacing="0.08em">
                {t}
              </text>
            </g>
          ))}
        </g>
      );
  }
}

function OutcomeArt({ id, x, y, begin, reduce }: { id: string; x: number; y: number; begin: number; reduce: boolean }) {
  const ox = x + 12;
  const oy = y + 44;
  const a = begin / LOOP;
  const b = Math.min((begin + 2.4) / LOOP, 0.97);
  const draw = (from: number, to: number) =>
    reduce ? null : (
      <animate attributeName="stroke-dashoffset" dur={`${LOOP}s`} repeatCount="indefinite" values={`${from};${from};${to};${to};${from}`} keyTimes={`0;${a};${b};0.96;1`} />
    );
  switch (id) {
    case "grow":
      return (
        <path d={`M${ox},${oy + 24} L${ox + 22},${oy + 18} L${ox + 44},${oy + 20} L${ox + 68},${oy + 8} L${ox + 100},${oy}`} fill="none" stroke={accent} strokeWidth={1.6} strokeLinecap="round" strokeDasharray="120" strokeDashoffset={reduce ? 0 : 120}>
          {draw(120, 0)}
        </path>
      );
    case "opt":
      return (
        <g>
          <rect x={ox} y={oy + 2} width={100} height={6} rx={3} fill={fg} fillOpacity={0.14} />
          <line x1={ox + 3} y1={oy + 19} x2={ox + 97} y2={oy + 19} stroke={accent} strokeWidth={6} strokeLinecap="round" strokeDasharray="94" strokeDashoffset={reduce ? 40 : 0}>
            {reduce ? null : (
              <animate attributeName="stroke-dashoffset" dur={`${LOOP}s`} repeatCount="indefinite" values="0;0;40;40;0" keyTimes={`0;${a};${b};0.96;1`} />
            )}
          </line>
        </g>
      );
    case "acc":
      return (
        <g>
          <line x1={ox + 4} y1={oy + 12} x2={ox + 96} y2={oy + 12} stroke={fg} strokeOpacity={0.15} />
          <line x1={ox + 4} y1={oy + 12} x2={ox + 96} y2={oy + 12} stroke={accent} strokeWidth={1.6} strokeDasharray="92" strokeDashoffset={reduce ? 0 : 92}>
            {draw(92, 0)}
          </line>
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={ox + 4 + i * 30.6} cy={oy + 12} r={4} fill="var(--background)" stroke={accent} strokeWidth={1.2} />
          ))}
        </g>
      );
    default:
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x={ox} y={oy + i * 9} width={62 - i * 14} height={4} rx={2} fill={fg} fillOpacity={0.25} />
          ))}
          <circle cx={ox + 90} cy={oy + 12} r={10} fill="none" stroke={accent} strokeWidth={1.3} />
          <path d={`M${ox + 85},${oy + 12} l4,4 l7,-8`} fill="none" stroke={accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" strokeDashoffset={reduce ? 0 : 20}>
            {draw(20, 0)}
          </path>
        </g>
      );
  }
}

/* ---------- intelligence core ---------- */
function Core({ reduce, active, r = 1 }: { reduce: boolean; active: boolean; r?: number }) {
  const tri = (s: number, rot = 0) => {
    const pts = [0, 120, 240].map((d) => {
      const rad = ((d - 90 + rot) * Math.PI) / 180;
      return `${(Math.cos(rad) * s * r).toFixed(1)},${(Math.sin(rad) * s * r).toFixed(1)}`;
    });
    return pts.join(" ");
  };
  const hex = (s: number) =>
    [0, 60, 120, 180, 240, 300]
      .map((d) => {
        const rad = ((d - 90) * Math.PI) / 180;
        return `${(Math.cos(rad) * s * r).toFixed(1)},${(Math.sin(rad) * s * r).toFixed(1)}`;
      })
      .join(" ");

  return (
    <g>
      <circle r={96 * r} fill="url(#aix-halo)" />
      {/* faceted outer prism */}
      <polygon points={hex(78)} fill="url(#aix-facet)" stroke={fg} strokeOpacity={active ? 0.4 : 0.22} strokeWidth={0.8} />
      {[0, 60, 120, 180, 240, 300].map((d) => {
        const rad = ((d - 90) * Math.PI) / 180;
        return <line key={d} x1={0} y1={0} x2={Math.cos(rad) * 78 * r} y2={Math.sin(rad) * 78 * r} stroke={fg} strokeOpacity={0.08} />;
      })}
      <g>
        {reduce ? null : <animateTransform attributeName="transform" type="rotate" values="0;8;0;-8;0" dur="24s" repeatCount="indefinite" />}
        <polygon points={tri(64)} fill="none" stroke={fg} strokeOpacity={0.35} strokeWidth={0.9} />
      </g>
      <g>
        {reduce ? null : <animateTransform attributeName="transform" type="rotate" values="180;172;180;188;180" dur="18s" repeatCount="indefinite" />}
        <polygon points={tri(48)} fill={accent} fillOpacity={0.06} stroke={accent} strokeOpacity={0.6} strokeWidth={0.9} />
      </g>
      <polygon points={hex(30)} fill="url(#aix-inner)" stroke={fg} strokeOpacity={0.3} strokeWidth={0.7} />
      {/* spectral refraction — restrained */}
      {[1, 3, 4, 6].map((c, i) => (
        <line key={c} x1={-10 * r} y1={(-6 + i * 4) * r} x2={22 * r} y2={(-14 + i * 9) * r} stroke={`var(--prism-colour-${c})`} strokeOpacity={0.45} strokeWidth={0.8} />
      ))}
      <circle r={9 * r} fill={accent} fillOpacity={0.9}>
        {reduce ? null : (
          <animate attributeName="r" dur={`${LOOP}s`} repeatCount="indefinite" values={`${8 * r};${8 * r};${12 * r};${8 * r};${8 * r}`} keyTimes="0;0.3;0.42;0.6;1" />
        )}
      </circle>
      <circle r={3.5 * r} fill={fg} />
      {/* processing nodes */}
      {[0, 72, 144, 216, 288].map((d, i) => {
        const rad = ((d - 90) * Math.PI) / 180;
        return (
          <circle key={d} cx={Math.cos(rad) * 48 * r} cy={Math.sin(rad) * 48 * r} r={2.2} fill={fg} fillOpacity={0.35}>
            {reduce ? null : <animate attributeName="fill-opacity" dur={`${LOOP}s`} repeatCount="indefinite" {...{ values: "0.25;0.25;1;0.25;0.25", keyTimes: `0;${0.3 + i * 0.03};${0.36 + i * 0.03};${0.46 + i * 0.03};1` }} />}
          </circle>
        );
      })}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <radialGradient id="aix-halo">
        <stop offset="0%" stopColor={accent} stopOpacity={0.28} />
        <stop offset="60%" stopColor={accent} stopOpacity={0.06} />
        <stop offset="100%" stopColor={accent} stopOpacity={0} />
      </radialGradient>
      <linearGradient id="aix-facet" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={fg} stopOpacity={0.1} />
        <stop offset="50%" stopColor={accent} stopOpacity={0.07} />
        <stop offset="100%" stopColor={fg} stopOpacity={0.02} />
      </linearGradient>
      <radialGradient id="aix-inner">
        <stop offset="0%" stopColor={fg} stopOpacity={0.18} />
        <stop offset="100%" stopColor={accent} stopOpacity={0.08} />
      </radialGradient>
      <linearGradient id="aix-panel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={fg} stopOpacity={0.07} />
        <stop offset="100%" stopColor={fg} stopOpacity={0.02} />
      </linearGradient>
    </defs>
  );
}

/* ---------- desktop / tablet composition ---------- */
function DesktopEngine({ reduce }: { reduce: boolean }) {
  const [zone, setZone] = useState<Zone>(null);
  const inOp = zone === "inputs" ? 0.55 : zone ? 0.1 : 0.2;
  const outOp = zone === "outcomes" ? 0.7 : zone ? 0.12 : 0.28;

  return (
    <svg viewBox="0 0 600 520" className="h-auto w-full overflow-visible" role="img" aria-label="Business systems flow into the Prism AI intelligence engine and emerge as business impact: grow, optimise, accelerate, decide.">
      <Defs />

      {/* stage labels */}
      {[
        { t: "BUSINESS SYSTEMS", x: 34, z: "inputs" },
        { t: "AI INTELLIGENCE", x: CORE.x - 50, z: "engine" },
        { t: "BUSINESS IMPACT", x: 462, z: "outcomes" },
      ].map((l) => (
        <text key={l.t} x={l.x} y={18} fontSize={8.5} letterSpacing="0.22em" fill={zone === l.z ? fg : muted} className="font-display transition-[fill] duration-500">
          {l.t}
        </text>
      ))}

      {/* inbound pathways */}
      {systems.map((s, i) => (
        <g key={s.id}>
          <path id={`aix-in-${s.id}`} d={inPath(s)} fill="none" stroke={fg} strokeOpacity={inOp} strokeWidth={0.8} className="transition-[stroke-opacity] duration-500" />
          {reduce ? null : (
            <circle r={2.2} fill={`var(--prism-colour-${s.colour})`}>
              <animateMotion dur={`${LOOP}s`} repeatCount="indefinite" calcMode="linear" {...span(0.04 + i * 0.035, 0.3 + i * 0.02)}>
                <mpath href={`#aix-in-${s.id}`} />
              </animateMotion>
              <animate attributeName="opacity" dur={`${LOOP}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${0.04 + i * 0.035};${0.06 + i * 0.035};${0.28 + i * 0.02};${0.3 + i * 0.02};1`} />
            </circle>
          )}
        </g>
      ))}

      {/* outbound pathways */}
      {outcomes.map((o, i) => (
        <g key={o.id}>
          <path id={`aix-out-${o.id}`} d={outPath(o)} fill="none" stroke={accent} strokeOpacity={outOp} strokeWidth={0.9} className="transition-[stroke-opacity] duration-500" />
          {reduce ? null : (
            <circle r={2.4} fill={accent}>
              <animateMotion dur={`${LOOP}s`} repeatCount="indefinite" calcMode="linear" {...span(0.48 + i * 0.03, 0.64 + i * 0.03)}>
                <mpath href={`#aix-out-${o.id}`} />
              </animateMotion>
              <animate attributeName="opacity" dur={`${LOOP}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${0.48 + i * 0.03};${0.5 + i * 0.03};${0.62 + i * 0.03};${0.64 + i * 0.03};1`} />
            </circle>
          )}
        </g>
      ))}

      {/* business systems */}
      <g onMouseEnter={() => setZone("inputs")} onMouseLeave={() => setZone(null)}>
        {systems.map((s) => (
          <g key={s.id}>
            <rect x={s.x} y={s.y} width={PW} height={PH} rx={8} fill="var(--background)" />
            <rect x={s.x} y={s.y} width={PW} height={PH} rx={8} fill="url(#aix-panel)" stroke={fg} strokeOpacity={zone === "inputs" ? 0.32 : 0.14} className="transition-[stroke-opacity] duration-500" />
            <circle cx={s.x + 13} cy={s.y + 15} r={2.4} fill={`var(--prism-colour-${s.colour})`} />
            <text x={s.x + 21} y={s.y + 18} fontSize={7} letterSpacing="0.16em" fill={muted} className="font-display">
              {s.label}
            </text>
            <PanelArt id={s.id} x={s.x} y={s.y} />
          </g>
        ))}
      </g>

      {/* intelligence engine */}
      <g transform={`translate(${CORE.x} ${CORE.y})`} onMouseEnter={() => setZone("engine")} onMouseLeave={() => setZone(null)} className="cursor-default">
        <circle r={130} fill="transparent" />
        <Core reduce={reduce} active={zone === "engine"} />
        {capabilities.map((c) => {
          const rad = (c.a * Math.PI) / 180;
          const R = 108;
          const x = Math.cos(rad) * R;
          const y = Math.sin(rad) * R;
          const anchor = "middle";
          const dy = Math.sin(rad) < -0.5 ? -4 : 12;
          const showFull = zone === "engine";
          return (
            <g key={c.short}>
              <line x1={Math.cos(rad) * 80} y1={Math.sin(rad) * 80} x2={Math.cos(rad) * 98} y2={Math.sin(rad) * 98} stroke={fg} strokeOpacity={0.25} />
              <circle cx={Math.cos(rad) * 98} cy={Math.sin(rad) * 98} r={2} fill={accent} />
              <text x={x} y={y + dy} textAnchor={anchor} fontSize={7.5} letterSpacing="0.18em" fill={fg} fillOpacity={0.85} className="font-display">
                {c.short}
              </text>
              <text x={x} y={y + (dy < 0 ? -14 : 23)} textAnchor={anchor} fontSize={7} fill={muted} opacity={showFull ? 1 : 0} className="transition-opacity duration-500">
                {c.full}
              </text>
            </g>
          );
        })}
      </g>

      {/* business impact */}
      <g onMouseEnter={() => setZone("outcomes")} onMouseLeave={() => setZone(null)}>
        {outcomes.map((o, i) => {
          const begin = (0.62 + i * 0.03) * LOOP;
          return (
            <g key={o.id}>
              <rect x={o.x} y={o.y} width={OW} height={OH} rx={8} fill="var(--background)" />
              <rect x={o.x} y={o.y} width={OW} height={OH} rx={8} fill="url(#aix-panel)" stroke={accent} strokeOpacity={zone === "outcomes" ? 0.6 : 0.22} className="transition-[stroke-opacity] duration-500">
                {reduce ? null : <animate attributeName="stroke-opacity" dur={`${LOOP}s`} repeatCount="indefinite" {...pulse(begin / LOOP, begin / LOOP + 0.03, begin / LOOP + 0.12)} values="0.22;0.22;0.8;0.22;0.22" />}
              </rect>
              <text x={o.x + 12} y={o.y + 20} fontSize={10} fontWeight={600} letterSpacing="0.16em" fill={fg} className="font-display">
                {o.label}
              </text>
              <text x={o.x + 12} y={o.y + 33} fontSize={7} fill={muted}>
                {o.sub}
              </text>
              <OutcomeArt id={o.id} x={o.x} y={o.y} begin={begin} reduce={reduce} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ---------- mobile composition: BUSINESS → AI → IMPACT, stacked ---------- */
function MobileEngine({ reduce }: { reduce: boolean }) {
  const inputs = [
    { t: "REVENUE", c: 3, x: 20 },
    { t: "OPERATIONS", c: 5, x: 130 },
    { t: "FINANCE", c: 4, x: 240 },
  ];
  const outs = ["GROW", "OPTIMISE", "ACCELERATE", "DECIDE"];
  const cy = 190;
  return (
    <svg viewBox="0 0 360 400" className="h-auto w-full" role="img" aria-label="Business systems flow into the Prism AI intelligence engine and emerge as business impact.">
      <Defs />
      <text x={180} y={14} textAnchor="middle" fontSize={8} letterSpacing="0.22em" fill={muted} className="font-display">BUSINESS SYSTEMS</text>
      {inputs.map((s, i) => {
        const d = `M${s.x + 50},58 C${s.x + 50},110 180,110 180,${cy - 60}`;
        return (
          <g key={s.t}>
            <path id={`aixm-in-${i}`} d={d} fill="none" stroke={fg} strokeOpacity={0.2} strokeWidth={0.8} />
            {reduce ? null : (
              <circle r={2} fill={`var(--prism-colour-${s.c})`}>
                <animateMotion dur={`${LOOP}s`} repeatCount="indefinite" calcMode="linear" {...span(0.05 + i * 0.05, 0.3 + i * 0.03)}>
                  <mpath href={`#aixm-in-${i}`} />
                </animateMotion>
              </circle>
            )}
            <rect x={s.x} y={26} width={100} height={32} rx={7} fill="url(#aix-panel)" stroke={fg} strokeOpacity={0.16} />
            <circle cx={s.x + 12} cy={42} r={2.4} fill={`var(--prism-colour-${s.c})`} />
            <text x={s.x + 20} y={45} fontSize={7.5} letterSpacing="0.14em" fill={fg} fillOpacity={0.8} className="font-display">{s.t}</text>
          </g>
        );
      })}
      <g transform={`translate(180 ${cy})`}>
        <Core reduce={reduce} active={false} r={0.8} />
      </g>
      <text x={180} y={cy + 86} textAnchor="middle" fontSize={7} letterSpacing="0.2em" fill={muted} className="font-display">REASON · PREDICT · AUTOMATE · ACT</text>
      {outs.map((o, i) => {
        const x = 12 + i * 86;
        const d = `M180,${cy + 66} C180,${cy + 110} ${x + 38},${cy + 110} ${x + 38},${cy + 138}`;
        return (
          <g key={o}>
            <path id={`aixm-out-${i}`} d={d} fill="none" stroke={accent} strokeOpacity={0.3} strokeWidth={0.9} />
            {reduce ? null : (
              <circle r={2.2} fill={accent}>
                <animateMotion dur={`${LOOP}s`} repeatCount="indefinite" calcMode="linear" {...span(0.5 + i * 0.03, 0.64 + i * 0.03)}>
                  <mpath href={`#aixm-out-${i}`} />
                </animateMotion>
              </circle>
            )}
            <rect x={x} y={cy + 138} width={76} height={34} rx={7} fill="url(#aix-panel)" stroke={accent} strokeOpacity={0.35} />
            <text x={x + 38} y={cy + 159} textAnchor="middle" fontSize={7.5} fontWeight={600} letterSpacing="0.12em" fill={fg} className="font-display">{o}</text>
          </g>
        );
      })}
      <text x={180} y={396} textAnchor="middle" fontSize={8} letterSpacing="0.22em" fill={muted} className="font-display">BUSINESS IMPACT</text>
    </svg>
  );
}

/**
 * Hero visual — The Prism AI Transformation Engine.
 * Business complexity → AI intelligence → measurable business impact.
 * Pure SVG with native SMIL loops (GPU-light, no runtime dependencies);
 * motion is removed entirely under prefers-reduced-motion.
 */
export function TransformationEngine({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={cn("relative mx-auto w-full max-w-[640px]", className)}>
      <div className="hidden sm:block">
        <DesktopEngine reduce={reduce} />
      </div>
      <div className="mx-auto max-w-[420px] sm:hidden">
        <MobileEngine reduce={reduce} />
      </div>
    </div>
  );
}
