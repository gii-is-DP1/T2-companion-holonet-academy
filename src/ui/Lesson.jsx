/**
 * Small presentational helpers used by every lesson.
 *
 * Note that these are themselves a good example of the "Presentational
 * component" idea from slide 75: they know *how* to show things, and they
 * know nothing about *what* is shown or where the data came from.
 */

export function Lesson({ title, slide, idea, children }) {
  return (
    <article className="lesson">
      <header>
        <p className="slide-ref">T2 · {slide}</p>
        <h1>{title}</h1>
        <p className="idea">{idea}</p>
      </header>
      {children}
    </article>
  );
}

/** A bordered area where the live example actually runs. */
export function Demo({ title = 'Live demo', children }) {
  return (
    <section className="demo">
      <h2>{title}</h2>
      <div className="demo-body">{children}</div>
    </section>
  );
}

/** A short explanation block between demos. */
export function Note({ title = 'What to look at', children }) {
  return (
    <section className="note">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

/** The exercise proposed at the end of each lesson. */
export function Challenge({ children }) {
  return (
    <section className="challenge">
      <h2>Your turn, Padawan</h2>
      {children}
    </section>
  );
}
