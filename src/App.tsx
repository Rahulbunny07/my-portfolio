import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { profile } from './data/content'

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-line py-8">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono text-xs">Built with React, TypeScript & Tailwind</p>
        </div>
      </footer>
    </>
  )
}
