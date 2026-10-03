import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react'
import { profile } from '../data/content'
import { GithubIcon, LinkedinIcon, Reveal } from './ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const links = [
    { label: 'LinkedIn', href: profile.linkedin, icon: LinkedinIcon },
    { label: 'GitHub', href: profile.github, icon: GithubIcon },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]" />
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">05 · Contact</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Let's build something <span className="text-accent">reliable</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Happy to connect about engineering roles, collaborations or anything WebSockets. The quickest way to reach me is email.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={`mailto:${profile.email}`} className="btn-primary !px-5 !py-3 text-base">
              <Mail className="h-5 w-5" /> {profile.email}
            </a>
            <button onClick={copy} className="btn-ghost !py-3" aria-live="polite">
              {copied ? <Check className="h-4 w-4 text-ok" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="btn-ghost">
                <l.icon className="h-4 w-4" /> {l.label} <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-ghost">
              <Download className="h-4 w-4" /> Resume
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
