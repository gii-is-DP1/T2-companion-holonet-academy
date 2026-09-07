import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { LESSONS } from './lessons/registry.js';

/**
 * The application shell: a side navigation bar plus the routed content.
 * This is the react-router setup of slides 52-53 — one <Route> per lesson,
 * and <NavLink> instead of <a> so that navigating does NOT reload the page
 * (that is what makes this a Single Page Application).
 */

function Home() {
  return (
    <article className="lesson">
      <header>
        <p className="slide-ref">Design &amp; Tests 1 · Universidad de Sevilla</p>
        <h1>HoloNet Academy</h1>
        <p className="idea">
          Runnable examples for T2 — Introduction to the design of Presentation
          Layers. Pick a lesson on the left; read the code next to the running
          demo. Every file is commented and every lesson ends with an exercise.
        </p>
      </header>

      <section className="note">
        <h2>How to use this repository</h2>
        <ol>
          <li>
            Open the lesson in the browser <em>and</em> its folder in the editor
            at the same time. The comments in the source are the real content.
          </li>
          <li>
            Break things on purpose. Most lessons contain a commented-out line
            that produces an instructive error.
          </li>
          <li>
            Do the "Your turn, Padawan" exercise before moving on.
          </li>
        </ol>
      </section>

      <section className="note">
        <h2>The road so far</h2>
        <p>
          Lessons 1-2 are about <strong>decomposition</strong>: cutting the UI
          into modules and components. Lessons 3-6 are about{' '}
          <strong>state</strong>: who owns it and how it travels. Lessons 7-8
          are about the two escape hatches you will need in your project:
          shared state without prop drilling, and talking to the backend.
        </p>
      </section>
    </article>
  );
}

export default function App() {
  return (
    <div className="layout">
      <nav className="sidebar">
        <p className="brand">HoloNet Academy</p>
        <p className="brand-sub">DP1 · T2 Presentation Layers</p>
        <ul>
          <li>
            <NavLink to="/" end>
              Start here
            </NavLink>
          </li>
          {LESSONS.map((lesson, i) => (
            <li key={lesson.slug}>
              <NavLink to={`/lessons/${lesson.slug}`}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                {lesson.title}
                <span className="slides">T2 {lesson.slides}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          {LESSONS.map(({ slug, Component }) => (
            <Route key={slug} path={`/lessons/${slug}`} element={<Component />} />
          ))}
          {/* Anything else goes back home — a minimal 404 policy. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
