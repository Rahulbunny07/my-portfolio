import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { caseStudies } from '../data/content'
import Diagram from './Diagrams'
import { Reveal, SectionHeading } from './ui'

export default function Work() {
  const [active, setActive] = useState(caseStudies[0].id)
  const reduce = useReducedMotion()
  const study = caseStudies.find((c) => c.id === active)!

  return (
    <section id="work" className="border-y border-line bg-surface/40 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="02 · Selected work"
          title="A few problems I've worked on, and how they were solved."
          intro="Production work at IDrive, described at an architecture level. Each one notes my role, because these were team efforts."
        />

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Reveal className="min-w-0">
            <div role="tablist" aria-label="Case studies" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
              {caseStudies.map((c, i) => {
                const selected = c.id === active
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${c.id}`}
                    onClick={() => setActive(c.id)}
                    className={`group relative min-w-[240px] shrink-0 rounded-2xl border p-4 text-left transition-colors lg:min-w-0 ${
                      selected ? 'border-accent/50 bg-surface' : 'border-line bg-transparent hover:bg-surface'
                    }`}
                  >
                    {selected && !reduce && (
                      <motion.span layoutId="tab-glow" className="absolute inset-0 -z-10 rounded-2xl bg-accent/[0.06]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className="font-mono text-[11px] text-muted">0{i + 1} · {c.kicker}</span>
                    <span className={`mt-1.5 block text-sm font-semibold leading-snug ${selected ? 'text-ink' : 'text-ink/80'}`}>{c.title}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <div className="card overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.article
                  key={study.id}
                  id={`panel-${study.id}`}
                  role="tabpanel"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-x-auto border-b border-line bg-bg/50 p-4 [scrollbar-width:thin] sm:p-6">
                    <div className="min-w-[560px]">
                      <Diagram kind={study.diagram} />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-accent-ink">My role: {study.role}</span>
                      {study.stack.map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">{study.title}</h3>
                    <p className="mt-2 text-muted">{study.summary}</p>

                    <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.3fr]">
                      <div>
                        <p className="eyebrow !text-muted">The problem</p>
                        <p className="mt-3 text-[15px] leading-relaxed">{study.problem}</p>
                        <p className="eyebrow mt-8 !text-muted">Outcome</p>
                        <p className="mt-3 text-[15px] leading-relaxed">{study.outcome}</p>
                      </div>
                      <div>
                        <p className="eyebrow !text-muted">Approach</p>
                        <ul className="mt-3 space-y-3">
                          {study.approach.map((a) => (
                            <li key={a} className="flex gap-3 text-[15px] leading-relaxed">
                              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
