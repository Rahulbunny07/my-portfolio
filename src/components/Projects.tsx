import { ArrowUpRight, Lock } from 'lucide-react'
import { sideProjects } from '../data/content'
import { GithubIcon, Reveal, SectionHeading } from './ui'

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="03 · Side projects"
          title="Things I build outside work."
          intro="Products and experiments I design and build end to end, from the idea to the database."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {sideProjects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06} className="h-full">
              <article className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-accent/40">
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-raised">
                  <img
                    src={p.image}
                    alt={`${p.name} screenshot`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-[10.5px] text-ink backdrop-blur">
                    {p.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{p.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-[13px] leading-snug text-ink/85">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip !px-2.5 !py-0.5 !text-[11px]">{s}</span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className={l.kind === 'live' ? 'btn-primary !px-3.5 !py-2' : 'btn-ghost !px-3.5 !py-2'}
                      >
                        {l.kind === 'code' ? <GithubIcon className="h-4 w-4" /> : null}
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ))}
                    {p.note && (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <Lock className="h-3.5 w-3.5" /> {p.note}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
