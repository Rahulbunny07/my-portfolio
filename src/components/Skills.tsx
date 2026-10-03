import { Monitor, Server, Database, Wrench, Workflow } from 'lucide-react'
import { skills } from '../data/content'
import { Reveal, SectionHeading } from './ui'

const icons = { Frontend: Monitor, Backend: Server, Databases: Database, Tools: Wrench, Practices: Workflow } as const

export default function Skills() {
  return (
    <section id="skills" className="border-y border-line bg-surface/40 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="04 · Skills" title="Tools I use day to day." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => {
            const Icon = icons[g.group as keyof typeof icons]
            return (
              <Reveal key={g.group} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-accent" />
                    <h3 className="font-display text-lg font-semibold">{g.group}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="rounded-lg border border-line bg-raised px-3 py-1.5 text-sm text-ink/90">{s}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
