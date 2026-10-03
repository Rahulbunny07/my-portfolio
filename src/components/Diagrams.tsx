import { useReducedMotion } from 'framer-motion'
import type { CaseStudy } from '../data/content'

type BoxProps = { x: number; y: number; w: number; h: number; title: string; sub?: string; accent?: boolean }

function Box({ x, y, w, h, title, sub, accent }: BoxProps) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} className={accent ? 'fill-accent/10 stroke-accent' : 'fill-raised stroke-line'} strokeWidth={1.2} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" className="fill-ink font-sans" fontSize={12.5} fontWeight={600}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" className="fill-muted font-mono" fontSize={9.5}>
          {sub}
        </text>
      )}
    </g>
  )
}

function Flow({ d, dur = 2.4, begin = 0, label, lx, ly }: { d: string; dur?: number; begin?: number; label?: string; lx?: number; ly?: number }) {
  const reduce = useReducedMotion()
  return (
    <g>
      <path d={d} className="stroke-line" strokeWidth={1.5} fill="none" markerEnd="url(#arrow)" />
      {!reduce && (
        <circle r={3.5} className="fill-accent">
          <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} />
        </circle>
      )}
      {label && (
        <text x={lx} y={ly} textAnchor="middle" className="fill-accent font-mono" fontSize={9.5}>
          {label}
        </text>
      )}
    </g>
  )
}

function Defs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
      </marker>
    </defs>
  )
}

function Pipeline() {
  return (
    <svg viewBox="0 0 640 230" className="h-auto w-full" role="img" aria-label="Diagram: worker process streams progress to a Spring Boot service, which relays it over WebSocket to a Redux middleware and the React UI">
      <Defs />
      <Box x={10} y={40} w={128} h={62} title="Worker process" sub="VM backup job" />
      <Box x={180} y={40} w={138} h={62} title="Spring Boot" sub="relay · persist" accent />
      <Box x={360} y={40} w={128} h={62} title="Redux middleware" sub="queue · route" accent />
      <Box x={530} y={40} w={100} h={62} title="React UI" sub="live table" />
      <Box x={180} y={150} w={138} h={52} title="Job store" sub="SQLite" />
      <Flow d="M138 71 L178 71" dur={1.6} label="stdout JSON" lx={158} ly={30} />
      <Flow d="M318 71 L358 71" dur={1.6} begin={0.5} label="WebSocket" lx={338} ly={30} />
      <Flow d="M488 71 L528 71" dur={1.6} begin={1} label="dispatch" lx={508} ly={30} />
      <Flow d="M249 102 L249 148" dur={2.2} begin={0.8} />
      <text x={330} y={180} className="fill-muted font-mono" fontSize={9.5}>status · recovery points</text>
    </svg>
  )
}

function Export() {
  return (
    <svg viewBox="0 0 640 240" className="h-auto w-full" role="img" aria-label="Diagram: UI filters go through Redux-Saga and a WebSocket export action to a Java export engine that produces CSV, Excel and PDF files">
      <Defs />
      <Box x={10} y={88} w={120} h={62} title="Logs view" sub="tab · filters · dates" />
      <Box x={165} y={88} w={120} h={62} title="Redux-Saga" sub="build request" accent />
      <Box x={320} y={88} w={130} h={62} title="Export engine" sub="Java module" accent />
      <Box x={500} y={18} w={130} h={46} title="CSV" />
      <Box x={500} y={96} w={130} h={46} title="Excel" sub="Apache POI" />
      <Box x={500} y={174} w={130} h={46} title="PDF" sub="PDFBox" />
      <Flow d="M130 119 L163 119" dur={1.4} />
      <Flow d="M285 119 L318 119" dur={1.4} begin={0.4} label="WS action" lx={302} ly={80} />
      <Flow d="M450 108 C475 108, 470 41, 498 41" dur={1.8} begin={0.9} />
      <Flow d="M450 119 L498 119" dur={1.6} begin={1.1} />
      <Flow d="M450 130 C475 130, 470 197, 498 197" dur={1.8} begin={1.3} />
      <text x={225} y={190} textAnchor="middle" className="fill-muted font-mono" fontSize={9.5}>download link returned to the UI</text>
    </svg>
  )
}

function Claim() {
  return (
    <svg viewBox="0 0 640 240" className="h-auto w-full" role="img" aria-label="Diagram: two threads try to claim the same pending job with a conditional update; only one updates a row and starts the backup">
      <Defs />
      <Box x={10} y={30} w={110} h={52} title="Thread A" />
      <Box x={10} y={150} w={110} h={52} title="Thread B" />
      <rect x={175} y={70} width={250} height={92} rx={12} className="fill-accent/10 stroke-accent" strokeWidth={1.2} />
      <text x={300} y={96} textAnchor="middle" className="fill-ink font-mono" fontSize={10.5} fontWeight={600}>UPDATE job SET status = 'IN_PROGRESS'</text>
      <text x={300} y={116} textAnchor="middle" className="fill-ink font-mono" fontSize={10.5}>WHERE id = ? AND status = 'PENDING'</text>
      <text x={300} y={142} textAnchor="middle" className="fill-muted font-mono" fontSize={9.5}>atomic · inside transaction + lock</text>
      <Flow d="M120 56 C150 56, 150 96, 173 96" dur={1.8} />
      <Flow d="M120 176 C150 176, 150 136, 173 136" dur={1.8} begin={0.15} />
      <rect x={480} y={30} width={150} height={52} rx={12} className="fill-ok/10 stroke-ok" strokeWidth={1.2} />
      <text x={555} y={52} textAnchor="middle" className="fill-ok font-sans" fontSize={12.5} fontWeight={600}>1 row updated</text>
      <text x={555} y={69} textAnchor="middle" className="fill-muted font-mono" fontSize={9.5}>starts backup</text>
      <rect x={480} y={150} width={150} height={52} rx={12} className="fill-raised stroke-line" strokeWidth={1.2} />
      <text x={555} y={172} textAnchor="middle" className="fill-muted font-sans" fontSize={12.5} fontWeight={600}>0 rows updated</text>
      <text x={555} y={189} textAnchor="middle" className="fill-muted font-mono" fontSize={9.5}>skips · no duplicate</text>
      <Flow d="M425 100 C450 100, 450 56, 478 56" dur={1.8} begin={1} />
      <path d="M425 132 C450 132, 450 176, 478 176" className="stroke-line" strokeWidth={1.5} strokeDasharray="4 4" fill="none" markerEnd="url(#arrow)" />
    </svg>
  )
}

function Handshake() {
  const rows: { y: number; dir: 'r' | 'l'; label: string; note?: string }[] = [
    { y: 62, dir: 'r', label: 'connect (TLS)' },
    { y: 96, dir: 'r', label: 'key handshake' },
    { y: 130, dir: 'l', label: 'per-session key' },
    { y: 172, dir: 'r', label: 'critical action + HMAC', note: 'held in queue until key arrives' },
    { y: 206, dir: 'l', label: 'signed response · verified' },
  ]
  return (
    <svg viewBox="0 0 640 236" className="h-auto w-full" role="img" aria-label="Sequence diagram: browser connects, requests a session key, queues critical actions until the key arrives, then sends HMAC-signed actions that the server verifies">
      <Defs />
      <Box x={60} y={6} w={150} h={36} title="React UI" accent />
      <Box x={430} y={6} w={150} h={36} title="Java service" accent />
      <line x1={135} y1={42} x2={135} y2={226} className="stroke-line" strokeDasharray="3 5" />
      <line x1={505} y1={42} x2={505} y2={226} className="stroke-line" strokeDasharray="3 5" />
      {rows.map((r, i) => {
        const d = r.dir === 'r' ? `M137 ${r.y} L503 ${r.y}` : `M503 ${r.y} L137 ${r.y}`
        return (
          <g key={r.label}>
            <Flow d={d} dur={2.2} begin={i * 0.35} />
            <text x={320} y={r.y - 7} textAnchor="middle" className="fill-ink font-mono" fontSize={10}>{r.label}</text>
            {r.note && <text x={150} y={r.y + 16} className="fill-warn font-mono" fontSize={9}>{r.note}</text>}
          </g>
        )
      })}
    </svg>
  )
}

export default function Diagram({ kind }: { kind: CaseStudy['diagram'] }) {
  if (kind === 'pipeline') return <Pipeline />
  if (kind === 'export') return <Export />
  if (kind === 'claim') return <Claim />
  return <Handshake />
}
