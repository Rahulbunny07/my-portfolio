import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { profile, stats } from '../data/content'
import LiveConsole from './LiveConsole'
import { GithubIcon, LinkedinIcon } from './ui'

export default function Hero() {
  const reduce = useReducedMotion()
  const fade = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />

      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 backdrop-blur">
            <span className="h-2 w-2 animate-blink rounded-full bg-ok" />
            <span className="font-mono text-[11px] text-muted">Full-Stack Engineer · Bangalore</span>
          </motion.div>

          <motion.h1 {...fade(0.08)} className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.3rem]">
            Building <span className="text-accent">real-time</span>,<br />reliable software.
            <span className="mt-3 block text-2xl font-medium tracking-tight text-muted sm:text-3xl lg:text-[2rem]">From React UI to Java backend.</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I'm {profile.name.split(' ')[0]}, a {profile.role.toLowerCase()} with 4+ years on enterprise backup and
            disaster-recovery software at IDrive. I work across React, TypeScript, Java and Spring Boot on
            real-time WebSocket features, data integrity and application security.
          </motion.p>

          <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              See my work <ArrowRight className="h-4 w-4" />
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
              <Download className="h-4 w-4" /> Resume
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-raised hover:text-ink">
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-raised hover:text-ink">
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </motion.div>

        </div>

        <motion.div className="min-w-0" {...(reduce ? {} : { initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } })}>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold">Live demo: real-time backup progress over WebSockets</p>
            <span className="chip shrink-0 font-mono !text-[10px]">simulated</span>
          </div>
          <LiveConsole />
          <p className="mt-3 text-center text-xs text-muted">
            A simplified version of the kind of pipeline I work on. Click <span className="font-mono">drop connection</span> to see it recover.
          </p>
        </motion.div>
      </div>

      <div className="container-page mt-20 sm:mt-24">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line/60 [gap:1px] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-5 py-6 sm:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
              <dd className="mt-1.5 text-[13px] leading-snug text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
