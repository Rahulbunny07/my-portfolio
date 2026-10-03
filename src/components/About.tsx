import { Layers, ShieldCheck, Activity, Users } from 'lucide-react'
import { profile, education } from '../data/content'
import { Reveal, SectionHeading } from './ui'

const strengths = [
  { icon: Activity, title: 'Real-time systems', text: 'WebSocket pipelines that stream live progress and status between Java services and a React UI.' },
  { icon: Layers, title: 'Full-stack delivery', text: 'Features that span Redux state, WebSocket actions and Spring Boot services, end to end.' },
  { icon: ShieldCheck, title: 'Reliability & security', text: 'Concurrency fixes, session stability and hardening of critical actions in production code.' },
  { icon: Users, title: 'Team player', text: 'Code reviews, release integration and debugging alongside QA, backend and frontend teammates.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading eyebrow="01 · About" title="Engineer who likes the whole stack, and the hard parts of it." />

        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto w-56 lg:w-full">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent/40 via-transparent to-transparent blur-xl" />
              <img
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                width={640}
                height={640}
                loading="lazy"
                className="relative aspect-square w-full rounded-3xl border border-line object-cover"
              />
            </div>
            <div className="card mt-6 p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Education</p>
              <p className="mt-2 text-sm font-semibold">{education.school}</p>
              <p className="mt-1 text-sm text-muted">{education.degree}</p>
              <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
            </div>
          </Reveal>

          <div>
            <Reveal className="space-y-5 text-[17px] leading-relaxed text-muted">
              <p>
                For the past four years I've been part of the team building <span className="text-ink">IDrive BMR</span>, an
                on-prem backup and disaster-recovery appliance used by businesses and managed service providers to protect
                VMware, Hyper-V and physical machines.
              </p>
              <p>
                I started on the <span className="text-ink">React and TypeScript</span> console and gradually moved deeper into the{' '}
                <span className="text-ink">Java and Spring Boot</span> services behind it. Today I'm comfortable taking a problem
                from a confusing symptom in the UI, through WebSocket messages and backend threads, to the actual root cause.
              </p>
              <p>
                I care about software that keeps working when things go wrong: dropped connections, parallel jobs,
                restarts. And I enjoy doing that work with a team, through reviews, shared debugging and careful releases.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {strengths.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="card h-full p-5 transition-colors hover:border-accent/40">
                    <s.icon className="h-5 w-5 text-accent" />
                    <h3 className="mt-3 font-display text-base font-semibold">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
