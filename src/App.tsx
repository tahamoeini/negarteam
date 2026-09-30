import { useState } from 'react'
import negarLogotype from './assets/Negar-Team-Logotype.png'
import negarPrimaryLockup from './assets/Negar-Team-Primary-Lockup.png'
import { constraints, projects, prompts, type Perspective, type Project } from './data/projects'

const perspectives: { id: Perspective; label: string }[] = [
  { id: 'products', label: 'Products' },
  { id: 'questions', label: 'Questions' },
  { id: 'systems', label: 'Systems' },
]

function projectLabel(project: Project, perspective: Perspective) {
  if (perspective === 'questions') return `QUESTION / ${project.category}`
  if (perspective === 'systems') return `SYSTEM / ${project.system}`
  return `PRODUCT / ${project.name}`
}

function Thread({ active }: { active: Perspective }) {
  return <svg className="map-thread" viewBox="0 0 1200 1450" preserveAspectRatio="none" aria-hidden="true">
    <path className="thread-base" d="M592 0 C590 140 598 150 510 195 C435 235 333 218 300 286 C267 352 342 403 452 411 C588 421 690 377 760 443 C832 511 729 570 610 594 C477 621 393 671 443 737 C488 796 663 765 777 815 C880 861 830 944 722 976 C607 1010 471 1005 426 1083 C380 1164 476 1213 587 1230 C701 1246 774 1291 731 1350 C700 1391 646 1407 600 1450" />
    <path className="thread-active" d="M592 0 C590 140 598 150 510 195 C435 235 333 218 300 286 C267 352 342 403 452 411 C588 421 690 377 760 443 C832 511 729 570 610 594 C477 621 393 671 443 737 C488 796 663 765 777 815 C880 861 830 944 722 976 C607 1010 471 1005 426 1083 C380 1164 476 1213 587 1230 C701 1246 774 1291 731 1350 C700 1391 646 1407 600 1450" />
    {[[300, 286], [760, 443], [610, 594], [777, 815], [426, 1083], [731, 1350]].map(([cx, cy], index) => <circle key={index} className={`thread-node node-${index + 1}`} cx={cx} cy={cy} r="7" />)}
    <text x="800" y="820" className={`thread-tag ${active === 'systems' ? 'is-active' : ''}`}>SYSTEM / IN PROGRESS</text>
  </svg>
}

function App() {
  const [perspective, setPerspective] = useState<Perspective>('questions')
  const [step, setStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const nextPrompt = () => {
    if (step === prompts.length - 1) setShowResult(true)
    else setStep(step + 1)
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Negar Team, home"><img className="wordmark-logotype" src={negarLogotype} alt="" /></a>
      <a className="header-index" href="#questions">A map of what we’re figuring out <span>↘</span></a>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-index mono">FIELD NOTES <span>001 — ONGOING</span></div>
        <h1 id="hero-title">Some things begin<br />as products.<br /><em>Some begin as questions.</em></h1>
        <div className="hero-bottom">
          <p>Negar is where we find out<br />which is which.</p>
          <div className="hero-meta"><span>Technology</span><i /> <span>Products</span><i /> <span>Systems</span><i /> <span>Research</span><i /> <span>Experiments</span></div>
        </div>
        <a className="enter-link" href="#origin"><span>Enter the map</span><span aria-hidden="true">↓</span></a>
        <div className="hero-foot mono"><span>NO MASTER PLAN</span><span>JUST A RECURRING QUESTION</span></div>
      </section>

      <div className="map-world">
        <Thread active={perspective} />
        <section className="origin section-wrap" id="origin" aria-labelledby="origin-title">
          <div className="section-kicker mono"><span>01</span><span>THERE WAS NO MASTER PLAN</span></div>
          <div className="origin-copy">
            <h2 id="origin-title">Negar didn’t begin<br />with a market category.</h2>
            <p>It grew from a habit:</p>
            <p className="big-thought">when something doesn’t make sense,<br /><em>investigate it.</em></p>
            <p className="outcomes">Sometimes the answer is software.<br />Sometimes infrastructure.<br />Sometimes research.<br />Sometimes an experiment.<br />And sometimes the original question was wrong.</p>
          </div>
          <p className="margin-note note-origin">Those are usually<br />the interesting ones.</p>
        </section>

        <section className="questions section-wrap" id="questions" aria-labelledby="questions-title">
          <div className="section-kicker mono"><span>02</span><span>CURRENT QUESTIONS</span><span className="kicker-note">the question comes first</span></div>
          <div className="questions-intro"><h2 id="questions-title">A few things<br />we’re trying to make sense of.</h2>
            <fieldset className="perspective-control"><legend>View this map as</legend><div role="group" aria-label="Choose map perspective">{perspectives.map(item => <button key={item.id} type="button" aria-pressed={perspective === item.id} onClick={() => setPerspective(item.id)}>{item.label}</button>)}</div></fieldset>
          </div>
          <div className="project-list" data-perspective={perspective}>
            {projects.map((project, index) => <article key={project.id} className={`project project-${project.id} ${project.featured ? 'is-featured' : ''}`}>
              <div className="project-index mono"><span>Q{String(index + 1).padStart(2, '0')}</span><span>{project.category.toUpperCase()}</span></div>
              <div className="project-question"><span className="question-dot" aria-hidden="true" /><p>{project.question}</p></div>
              <div className="project-answer">
                <div className="answer-label mono">CURRENT FORM <span>↳</span></div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="project-system"><span>{projectLabel(project, perspective)}</span><span>{project.stage}</span></div>
                <a href={project.url} target="_blank" rel="noreferrer">{project.action}<span aria-hidden="true"> ↗</span></a>
              </div>
            </article>)}
          </div>
          <div className="unknown-node" role="group" aria-label="Unfinished question node">
            <span className="mono">UNKNOWN_05</span><span className="unknown-orbit" aria-hidden="true">?</span><p>There should always be something<br />here we can’t explain yet.</p><small>Ask again in six months.</small>
          </div>
          <p className="map-caption mono">SAME BODY OF WORK. DIFFERENT LEVELS OF ZOOM.</p>
        </section>
      </div>

      <section className="interrupt" aria-labelledby="interrupt-title">
        <div className="interrupt-top mono"><span>— SIGNAL PAUSED —</span><span>SYSTEM INTERRUPT</span><span>— RESUME WHEN READY —</span></div>
        <div className="interrupt-content"><span className="interrupt-mark" aria-hidden="true">Ⅱ</span><p className="mono">A QUESTION BEFORE THE NEXT QUESTION</p><h2 id="interrupt-title">Are we solving the problem,<br />or merely making the existing<br /><em>solution more sophisticated?</em></h2><span className="interrupt-note">We ask this one a lot.</span></div>
      </section>

      <section className="constraints section-wrap" aria-labelledby="constraints-title">
        <div className="section-kicker mono"><span>03</span><span>CONSTRAINTS WE CHOOSE</span></div>
        <div className="constraints-head"><h2 id="constraints-title">A few conditions<br />for making things.</h2><p>Not a values poster.<br />More like rules the system has to live with.</p></div>
        <ol className="constraint-list">{constraints.map(([code, name, description]) => <li key={code}><span className="mono">{code}</span><h3>{name}</h3><p>{description}</p><span className="constraint-link" aria-hidden="true">↘</span></li>)}</ol>
      </section>

      <section className="decision section-wrap" aria-labelledby="decision-title">
        <div className="decision-aside"><span className="mono">A SMALL THOUGHT EXPERIMENT</span><p>Product ideas are cheap.<br />Good questions take longer.</p></div>
        <div className="decision-main"><div className="section-kicker mono"><span>04</span><span>THE NEGAR TEST</span></div><h2 id="decision-title">Would Negar<br /><em>build it?</em></h2>
          {!showResult ? <div className="test-console" aria-live="polite"><div className="test-progress mono">QUESTION {String(step + 1).padStart(2, '0')} <span>/ {String(prompts.length).padStart(2, '0')}</span></div><p className="test-statement">“{prompts[step].statement}”</p><div className="test-response"><span className="mono">CURRENT READ</span><strong>{prompts[step].response}</strong></div><button type="button" className="test-next" onClick={nextPrompt}>{step === prompts.length - 1 ? 'See where this leads' : 'Next condition'} <span aria-hidden="true">→</span></button></div> : <div className="test-result" aria-live="polite"><span className="mono">CONCLUSION / STILL OPEN</span><p>Technology isn’t the thesis.<br /><em>The problem is.</em></p><button type="button" className="text-button" onClick={() => { setStep(0); setShowResult(false) }}>Run that thought again ↺</button></div>}
        </div>
      </section>

      <section className="domains section-wrap" aria-labelledby="domains-title">
        <div className="section-kicker mono"><span>05</span><span>FORMS THE WORK CAN TAKE</span></div><h2 id="domains-title">Not everything<br />we build is an app.</h2>
        <div className="domain-flow"><div><span className="mono">01 / USE</span><h3>Products</h3><p>Things people can actually use.</p></div><div><span className="mono">02 / DEPEND</span><h3>Infrastructure</h3><p>Things other things can depend on.</p></div><div><span className="mono">03 / UNDERSTAND</span><h3>Research</h3><p>Questions worth understanding before building.</p></div><div><span className="mono">04 / TEST</span><h3>Experiments</h3><p>Ideas that deserve time to be tested.</p></div></div>
        <p className="margin-note note-domains">Some experiments survive.</p>
      </section>

      <section className="margin-section section-wrap" aria-labelledby="margin-title">
        <div className="margin-rule" aria-hidden="true" /><div className="margin-label mono">A NOTE IN THE MARGIN</div><div className="margin-copy"><h2 id="margin-title">I don’t get bored easily.<br /><em>I get bothered when things don’t make sense.</em></h2><p>Negar has gradually become the place where I do something about that.</p><p>Sometimes that becomes software. Sometimes research. Sometimes an experiment. And sometimes it becomes a question we’re still trying to answer.</p><span>— Taha</span></div>
      </section>

      <section className="closing section-wrap" aria-labelledby="closing-title">
        <div className="closing-signal mono"><span>ALL BRANCHES RETURN TO THE QUESTION</span><span>↘</span></div><img className="closing-wordmark" src={negarPrimaryLockup} alt="Negar Team" /><h2 id="closing-title">Negar is not a collection<br />of products.<br /><em>It’s a way of looking<br />at problems.</em></h2><p>Some things here are products.<br />Some are experiments.<br />Some are questions that haven’t found their product yet.</p><p className="invitation">If any of them are questions you’re thinking about too,<br />we’d like to hear from you.</p>
        <div className="closing-links"><a href="https://github.com/tahamoeini/negarteam" target="_blank" rel="noreferrer">Negar on GitHub <span>↗</span></a><a href="https://github.com/tahamoeini" target="_blank" rel="noreferrer">More open work <span>↗</span></a></div>
        <footer><span>NEGAR TEAM / INDEPENDENT WORKS</span><span>Lead. Laugh. Learn. Build what makes sense.</span><a href="#top">Back to the question ↑</a></footer>
      </section>
    </main>
  </>
}

export default App
