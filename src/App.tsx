import { useEffect, useRef, useState } from 'react'
import negarPrimaryLockup from './assets/Negar-Team-Primary-Lockup.png'
import { constraints, projects, type Perspective, type Project } from './data/projects'
import { copy, localeNames, localizedProject, pageMetadata, promptCopy, type Locale } from './i18n'

const locales: Locale[] = ['en', 'ru', 'zh']
const perspectives: Perspective[] = ['products', 'questions', 'systems']
type Theme = 'light' | 'dark'

function projectLabel(project: Project, perspective: Perspective, locale: Locale) {
  const label = copy[locale].projectPerspective[perspective]
  if (perspective === 'questions') return `${label} / ${project.category}`
  if (perspective === 'systems') return `${label} / ${project.system}`
  return `${label} / ${project.name}`
}

function Thread({ active, label }: { active: Perspective; label: string }) {
  const route = 'M592 0 C590 140 598 150 510 195 C435 235 333 218 300 286 C267 352 342 403 452 411 C588 421 690 377 760 443 C832 511 729 570 610 594 C477 621 393 671 443 737 C488 796 663 765 777 815 C880 861 830 944 722 976 C607 1010 471 1005 426 1083 C380 1164 476 1213 587 1230 C701 1246 774 1291 731 1350 C700 1391 646 1407 600 1450'
  return <svg className="map-thread" viewBox="0 0 1200 1450" preserveAspectRatio="none" aria-hidden="true">
    <path className="thread-base" d={route} />
    <path className="thread-active" d={route} />
    {[[300, 286], [760, 443], [610, 594], [777, 815], [426, 1083], [731, 1350]].map(([cx, cy], index) => <circle key={index} className={`thread-node node-${index + 1}`} cx={cx} cy={cy} r="7" />)}
    <text x="800" y="820" className={`thread-tag ${active === 'systems' ? 'is-active' : ''}`}>{label}</text>
  </svg>
}

function initialLocale(): Locale {
  try {
    const requested = new URLSearchParams(window.location.search).get('lang')
    if (requested === 'ru' || requested === 'zh' || requested === 'en') return requested
    const saved = localStorage.getItem('negar-locale')
    return saved === 'ru' || saved === 'zh' || saved === 'en' ? saved : 'en'
  } catch {
    return 'en'
  }
}

function savedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem('negar-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Fall back to the operating system preference when storage is unavailable.
  }
  return null
}

function initialTheme(): Theme {
  return savedTheme() ?? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

function setHeadLink(rel: string, href: string, hreflang?: string) {
  const selector = `link[rel="${rel}"]${hreflang ? `[hreflang="${hreflang}"]` : ''}`
  let link = document.head.querySelector<HTMLLinkElement>(selector)
  if (!link) {
    link = document.createElement('link')
    link.rel = rel
    if (hreflang) link.hreflang = hreflang
    document.head.append(link)
  }
  link.href = href
}

function setHeadMeta(attribute: 'name' | 'property', name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.append(meta)
  }
  meta.content = content
}

function localizedUrl(siteUrl: URL, locale: Locale) {
  const url = new URL(siteUrl.href)
  url.search = ''
  url.hash = ''
  if (locale !== 'en') url.searchParams.set('lang', locale)
  return url.href
}

function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const themeOverride = useRef(savedTheme() !== null)
  const [perspective, setPerspective] = useState<Perspective>('questions')
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const t = copy[locale]
  const translatedPrompts = promptCopy[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-Hans' : locale
    document.title = pageMetadata[locale].title
    const localizedPage = new URL(window.location.href)
    if (locale === 'en') localizedPage.searchParams.delete('lang')
    else localizedPage.searchParams.set('lang', locale)
    if (localizedPage.href !== window.location.href) {
      window.history.replaceState(window.history.state, '', localizedPage.href)
    }
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageMetadata[locale].description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageMetadata[locale].title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', pageMetadata[locale].ogDescription)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', pageMetadata[locale].ogLocale)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageMetadata[locale].title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', pageMetadata[locale].ogDescription)
    const siteUrl = import.meta.env.VITE_SITE_URL
    if (siteUrl) {
      try {
        const origin = new URL(siteUrl)
        const canonicalUrl = localizedUrl(origin, locale)
        setHeadLink('canonical', canonicalUrl)
        setHeadLink('alternate', localizedUrl(origin, 'en'), 'en')
        setHeadLink('alternate', localizedUrl(origin, 'ru'), 'ru')
        setHeadLink('alternate', localizedUrl(origin, 'zh'), 'zh-Hans')
        setHeadLink('alternate', localizedUrl(origin, 'en'), 'x-default')
        setHeadMeta('property', 'og:url', canonicalUrl)
      } catch {
        // Leave domain-specific SEO links unset until VITE_SITE_URL is valid.
      }
    }
    try {
      localStorage.setItem('negar-locale', locale)
    } catch {
      // Language switching remains available when storage is disabled.
    }
  }, [locale])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#172321' : '#f4f2ed')
  }, [theme])

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const followSystemTheme = () => {
      if (!themeOverride.current) setTheme(systemTheme.matches ? 'dark' : 'light')
    }
    systemTheme.addEventListener('change', followSystemTheme)
    return () => systemTheme.removeEventListener('change', followSystemTheme)
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    themeOverride.current = true
    setTheme(nextTheme)
    try {
      localStorage.setItem('negar-theme', nextTheme)
    } catch {
      // Theme switching remains available when storage is disabled.
    }
  }

  function nextPrompt() {
    if (step === translatedPrompts.length - 1) setShowResult(true)
    else setStep(step + 1)
  }

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label={t.home}><img className="brand-lockup brand-lockup--header" src={negarPrimaryLockup} alt="" /></a>
      <div className="header-actions">
        <a className="header-index" href="#questions">{t.header} <span aria-hidden="true">↘</span></a>
        <div className="header-controls">
          <fieldset className="locale-switch">
            <legend className="visually-hidden">{t.languageLabel}</legend>
            {locales.map(item => <label key={item} lang={item === 'zh' ? 'zh-Hans' : item}><input type="radio" name="locale" value={item} aria-label={localeNames[item]} checked={locale === item} onChange={() => setLocale(item)} /><span aria-hidden="true">{item.toUpperCase()}</span></label>)}
          </fieldset>
          <button className="theme-toggle" type="button" aria-label={theme === 'dark' ? t.theme.switchToLight : t.theme.switchToDark} title={theme === 'dark' ? t.theme.switchToLight : t.theme.switchToDark} onClick={toggleTheme}>{theme === 'dark' ? t.theme.light : t.theme.dark}</button>
        </div>
      </div>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-index mono">{t.hero.index} <span>{t.hero.indexDate}</span></div>
        <h1 id="hero-title">{t.hero.title[0]}<br />{t.hero.title[1]}<br /><em>{t.hero.title[2]}</em></h1>
        <div className="hero-bottom">
          <p>{t.hero.summary}</p>
          <div className="hero-meta">{t.hero.fields.map((field, index) => <span className="hero-meta-item" key={field}>{index > 0 && <i aria-hidden="true" />}{field}</span>)}</div>
        </div>
        <a className="enter-link" href="#origin"><span>{t.hero.enter}</span><span aria-hidden="true">↓</span></a>
        <div className="hero-foot mono"><span>{t.hero.foot[0]}</span><span>{t.hero.foot[1]}</span></div>
      </section>

      <div className="map-world">
        <Thread active={perspective} label={t.questions.system} />
        <section className="origin section-wrap" id="origin" aria-labelledby="origin-title">
          <div className="section-kicker mono"><span>01</span><span>{t.origin.kicker}</span></div>
          <div className="origin-copy">
            <h2 id="origin-title">{t.origin.heading}</h2>
            <p>{t.origin.habit}</p>
            <p className="big-thought">{t.origin.thought.split('\n')[0]}<br /><em>{t.origin.thought.split('\n')[1]}</em></p>
            <p className="outcomes">{t.origin.outcomes.map(line => <span key={line}>{line}<br /></span>)}</p>
          </div>
          <p className="margin-note note-origin">{t.origin.note}</p>
        </section>

        <section className="questions section-wrap" id="questions" aria-labelledby="questions-title">
          <div className="section-kicker mono"><span>02</span><span>{t.questions.kicker}</span><span className="kicker-note">{t.questions.kickerNote}</span></div>
          <div className="questions-intro"><h2 id="questions-title">{t.questions.heading}</h2>
            <fieldset className="perspective-control"><legend>{t.questions.view}</legend><div className="perspective-control-options" role="radiogroup" aria-label={t.questions.choose}>{perspectives.map(item => <label className="perspective-option" key={item}><input type="radio" name="perspective" value={item} checked={perspective === item} onChange={() => setPerspective(item)} /><span>{t.questions.perspectives[item]}</span></label>)}</div></fieldset>
          </div>
          <div className="project-list" data-perspective={perspective}>
            {projects.map((sourceProject, index) => {
              const project = localizedProject(sourceProject, locale)
              return <article key={project.id} className={`project project-${project.id} ${project.featured ? 'is-featured' : ''}`}>
                <div className="project-index mono"><span>Q{String(index + 1).padStart(2, '0')}</span><span>{project.category}</span></div>
                <div className="project-question"><span className="question-dot" aria-hidden="true" /><p>{project.question}</p></div>
                <div className="project-answer">
                  <div className="answer-label mono">{t.questions.form} <span aria-hidden="true">↳</span></div>
                  <h3 lang="en">{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-system"><span>{projectLabel(project, perspective, locale)}</span><span>{project.stage}</span></div>
                  <a href={project.url} target="_blank" rel="noreferrer">{project.action}<span aria-hidden="true"> ↗</span></a>
                </div>
              </article>
            })}
          </div>
          <div className="unknown-node" role="group" aria-label={t.questions.unknownLabel}>
            <span className="mono">UNKNOWN_05</span><span className="unknown-orbit" aria-hidden="true">?</span><p>{t.questions.unknown}</p><small>{t.questions.askAgain}</small>
          </div>
          <p className="map-caption mono">{t.questions.caption}</p>
        </section>
      </div>

      <section className="interrupt" aria-labelledby="interrupt-title">
        <div className="interrupt-top mono"><span>{t.interrupt.top[0]}</span><span>{t.interrupt.top[1]}</span><span>{t.interrupt.top[2]}</span></div>
        <div className="interrupt-content"><span className="interrupt-mark" aria-hidden="true">Ⅱ</span><p className="mono">{t.interrupt.question}</p><h2 id="interrupt-title">{t.interrupt.title[0]}<br />{t.interrupt.title[1]}<br /><em>{t.interrupt.title[2]}</em></h2><span className="interrupt-note">{t.interrupt.note}</span></div>
      </section>

      <section className="constraints section-wrap" aria-labelledby="constraints-title">
        <div className="section-kicker mono"><span>03</span><span>{t.constraints.kicker}</span></div>
        <div className="constraints-head"><h2 id="constraints-title">{t.constraints.title[0]}<br />{t.constraints.title[1]}</h2><p>{t.constraints.aside[0]}<br />{t.constraints.aside[1]}</p></div>
        <ol className="constraint-list">{constraints.map(([code], index) => { const [name, description] = t.constraints.items[index]; return <li key={code}><span className="mono">{code}</span><h3>{name}</h3><p>{description}</p><span className="constraint-link" aria-hidden="true">↘</span></li> })}</ol>
      </section>

      <section className="decision section-wrap" aria-labelledby="decision-title">
        <div className="decision-aside"><span className="mono">{t.test.asideLabel}</span><p>{t.test.aside[0]}<br />{t.test.aside[1]}</p></div>
        <div className="decision-main"><div className="section-kicker mono"><span>04</span><span>{t.test.kicker}</span></div><h2 id="decision-title">{t.test.title[0]}<br /><em>{t.test.title[1]}</em></h2>
          {!showResult ? <div className="test-console" aria-live="polite"><div className="test-progress mono">{t.test.question} {String(step + 1).padStart(2, '0')} <span>/ {String(translatedPrompts.length).padStart(2, '0')}</span></div><p className="test-statement">“{translatedPrompts[step].statement}”</p><div className="test-response"><span className="mono">{t.test.currentRead}</span><strong>{translatedPrompts[step].response}</strong></div><button type="button" className="test-next" onClick={nextPrompt}>{step === translatedPrompts.length - 1 ? t.test.seeResult : t.test.next} <span aria-hidden="true">→</span></button></div> : <div className="test-result" aria-live="polite"><span className="mono">{t.test.conclusion}</span><p>{t.test.result[0]}<br /><em>{t.test.result[1]}</em></p><button type="button" className="text-button" onClick={() => { setStep(0); setShowResult(false) }}>{t.test.again} <span aria-hidden="true">↺</span></button></div>}
        </div>
      </section>

      <section className="domains section-wrap" aria-labelledby="domains-title">
        <div className="section-kicker mono"><span>05</span><span>{t.domains.kicker}</span></div><h2 id="domains-title">{t.domains.title[0]}<br />{t.domains.title[1]}</h2>
        <div className="domain-flow">{t.domains.items.map(([verb, name, description], index) => <div key={name}><span className="mono">0{index + 1} / {verb}</span><h3>{name}</h3><p>{description}</p></div>)}</div>
        <p className="margin-note note-domains">{t.domains.note}</p>
      </section>

      <section className="margin-section section-wrap" aria-labelledby="margin-title">
        <div className="margin-rule" aria-hidden="true" /><div className="margin-label mono">{t.margin.label}</div><div className="margin-copy"><h2 id="margin-title">{t.margin.title[0]}<br /><em>{t.margin.title[1]}</em></h2><p>{t.margin.paragraphs[0]}</p><p>{t.margin.paragraphs[1]}</p><span>{t.margin.author}</span></div>
      </section>

      <section className="closing section-wrap" aria-labelledby="closing-title">
        <div className="closing-signal mono"><span>{t.closing.signal}</span><span aria-hidden="true">↘</span></div><img className="brand-lockup brand-lockup--footer" src={negarPrimaryLockup} alt="Negar Team" /><h2 id="closing-title">{t.closing.title[0]}<br />{t.closing.title[1]}<br /><em>{t.closing.title[2]}<br />{t.closing.title[3]}</em></h2><p>{t.closing.paragraphs.map(line => <span key={line}>{line}<br /></span>)}</p><p className="invitation">{t.closing.invitation[0]}<br />{t.closing.invitation[1]}</p>
        <div className="closing-links"><a href="https://github.com/tahamoeini/negarteam" target="_blank" rel="noreferrer">{t.closing.github} <span aria-hidden="true">↗</span></a><a href="https://github.com/tahamoeini" target="_blank" rel="noreferrer">{t.closing.more} <span aria-hidden="true">↗</span></a></div>
        <footer><span>{t.closing.footer[0]}</span><span>{t.closing.footer[1]}</span><a href="#top">{t.closing.back} ↑</a></footer>
      </section>
    </main>
  </>
}

export default App
