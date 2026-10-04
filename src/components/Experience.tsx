import { Briefcase } from 'lucide-react'
import { experience } from '../data/content'
import { Reveal, SectionHeading } from './ui'

export default function Experience() {
  const [main, ...earlier] = experience

  return (
    <section id="experience" className="border-y border-line bg-surface/40 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="04 · Experience" title="From UI fixes to core backend services." />

        <Reveal>
          <div className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-raised">
                  <Briefcase className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{main.company}</h3>
                  <p className="text-muted">{main.role} · {main.location}</p>
                </div>
              </div>
              <span className="chip font-mono">{main.period}</span>
            </div>
            <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">{main.product}</p>

            <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" aria-hidden="true" />
              {main.phases.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <li className="relative pl-8 md:pl-0 md:pt-8">
                    <span className={`absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 md:top-0 ${i === main.phases.length - 1 ? 'border-accent bg-accent' : 'border-accent bg-bg'}`} />
                    <p className="font-mono text-xs text-accent">{p.period}</p>
                    <h4 className="mt-1.5 font-display text-lg font-semibold">{p.title}</h4>
                    <ul className="mt-3 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="text-sm leading-relaxed text-muted">{pt}</li>
                      ))}
                    </ul>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>

        {earlier.map((e) => (
          <Reveal key={e.company} delay={0.05}>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-line px-6 py-5">
              <div>
                <p className="font-semibold">{e.company}</p>
                <p className="text-sm text-muted">{e.role}</p>
              </div>
              <span className="font-mono text-xs text-muted">{e.period}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
