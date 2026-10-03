import { useEffect, useRef, useState } from 'react'
import { Unplug, PlugZap } from 'lucide-react'

type Job = { id: string; name: string; pct: number; speed: number; status: 'running' | 'done' | 'queued' }
type Frame = { t: number; text: string; kind: 'in' | 'out' | 'sys' }
type Conn = 'connected' | 'reconnecting'

const VMS = ['vm-web-01', 'vm-db-primary', 'vm-files-02', 'vm-erp-app', 'vm-mail-01']

function initialJobs(): Job[] {
  return [
    { id: 'a', name: VMS[0], pct: 38, speed: 182, status: 'running' },
    { id: 'b', name: VMS[1], pct: 71, speed: 240, status: 'running' },
    { id: 'c', name: VMS[2], pct: 0, speed: 0, status: 'queued' },
  ]
}

export default function LiveConsole() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs)
  const [frames, setFrames] = useState<Frame[]>([
    { t: 0, kind: 'sys', text: 'socket open · session key received · subscribed: backupProgress' },
  ])
  const [conn, setConn] = useState<Conn>('connected')
  const [queued, setQueued] = useState(0)
  const [latency, setLatency] = useState(18)
  const connRef = useRef<Conn>('connected')
  const nextVm = useRef(3)
  const rootRef = useRef<HTMLDivElement>(null)
  const visible = useRef(true)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const frameId = useRef(1)
  const push = (f: Omit<Frame, 't'>) => {
    const t = frameId.current++
    setFrames((prev) => [...prev.slice(-5), { ...f, t }])
  }

  const jobsRef = useRef<Job[]>(jobs)
  const queuedRef = useRef(0)

  useEffect(() => {
    const tick = setInterval(() => {
      if (!visible.current) return
      setLatency(12 + Math.round(Math.random() * 14))
      const next = jobsRef.current.map((j) => ({ ...j }))
      const live = connRef.current === 'connected'
      const running = next.filter((j) => j.status === 'running')
      const target = running[Math.floor(Math.random() * running.length)]
      if (target) {
        target.pct = Math.min(100, target.pct + 3 + Math.random() * 7)
        target.speed = Math.round(150 + Math.random() * 120)
        if (live) push({ kind: 'in', text: `{"action":"backupProgress","vm":"${target.name}","pct":${Math.floor(target.pct)},"mbps":${target.speed}}` })
        else setQueued(++queuedRef.current)
        if (target.pct >= 100) {
          target.status = 'done'
          target.speed = 0
          if (live) push({ kind: 'in', text: `{"action":"backupComplete","vm":"${target.name}","status":"COMPLETED"}` })
        }
      }
      const done = next.find((j) => j.status === 'done')
      const waiting = next.find((j) => j.status === 'queued')
      if (done && waiting && Math.random() < 0.5) {
        waiting.status = 'running'
        waiting.speed = 160
        done.status = 'queued'
        done.pct = 0
        done.name = VMS[nextVm.current++ % VMS.length]
      }
      jobsRef.current = next
      setJobs(next)
    }, 900)
    return () => clearInterval(tick)
  }, [])

  const dropConnection = () => {
    if (connRef.current !== 'connected') return
    connRef.current = 'reconnecting'
    setConn('reconnecting')
    queuedRef.current = 0
    setQueued(0)
    push({ kind: 'sys', text: 'socket closed · reconnecting with backoff…' })
    setTimeout(() => {
      connRef.current = 'connected'
      setConn('connected')
      const q = queuedRef.current
      push({ kind: 'out', text: '{"action":"keyHandshake"}  → new session key' })
      push({ kind: 'sys', text: `reconnected · resynced ${q} missed update${q === 1 ? '' : 's'} · state in sync` })
      queuedRef.current = 0
      setQueued(0)
    }, 2600)
  }

  const connected = conn === 'connected'

  return (
    <div ref={rootRef} className="card relative overflow-hidden shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)]">
      <div className="flex items-center justify-between border-b border-line bg-raised/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-muted">backup-console · wss</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px]" aria-live="polite">
          <span className={`h-2 w-2 rounded-full ${connected ? 'bg-ok animate-blink' : 'bg-warn'}`} />
          <span className={connected ? 'text-ok' : 'text-warn'}>{connected ? `connected · ${latency}ms` : 'reconnecting…'}</span>
        </div>
      </div>

      <div className="space-y-3.5 px-4 pb-3 pt-4">
        {jobs.map((j) => (
          <div key={j.id}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-[11.5px]">
              <span className="text-ink">{j.name}</span>
              <span className="text-muted">
                {j.status === 'running' && `${Math.floor(j.pct)}% · ${j.speed} MB/s`}
                {j.status === 'done' && <span className="text-ok">completed</span>}
                {j.status === 'queued' && 'queued'}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-raised">
              <div
                className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                  j.status === 'done' ? 'bg-ok' : connected ? 'bg-accent' : 'bg-warn/70'
                }`}
                style={{ width: `${j.status === 'queued' ? 0 : j.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-bg/60 px-4 py-3">
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">messages</p>
        <div className="h-[110px] overflow-hidden font-mono text-[10px] leading-[1.75] opacity-80" aria-hidden="true">
          {frames.map((f) => (
            <div key={f.t} className="truncate">
              <span className={f.kind === 'in' ? 'text-accent' : f.kind === 'out' ? 'text-warn' : 'text-muted'}>
                {f.kind === 'in' ? '← ' : f.kind === 'out' ? '→ ' : '· '}
              </span>
              <span className={f.kind === 'sys' ? 'text-muted' : 'text-ink/60'}>{f.text}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="font-mono text-[10.5px] text-muted">
            {connected ? 'live · simulated demo' : `buffering · ${queued} update${queued === 1 ? '' : 's'} held`}
          </span>
          <button
            onClick={dropConnection}
            disabled={!connected}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 font-mono text-[10.5px] text-muted transition-colors hover:border-warn hover:text-warn disabled:opacity-50"
          >
            {connected ? <Unplug className="h-3 w-3" /> : <PlugZap className="h-3 w-3" />}
            {connected ? 'drop connection' : 'recovering'}
          </button>
        </div>
      </div>
    </div>
  )
}
