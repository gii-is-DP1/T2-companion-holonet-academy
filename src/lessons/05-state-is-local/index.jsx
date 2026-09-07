import { useState } from 'react';
import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';

/**
 * LESSON 5 — State is independent for each component (T2, slides 43 and 46)
 *
 * Two astromech droids of the same model. Same component, two instances,
 * two completely separate memories. R2-D2 beeping does not make R5-D4 beep.
 */

function Astromech({ unit }) {
  const [beeps, setBeeps] = useState(0);

  return (
    <div className="droid">
      <p className="droid-name">{unit}</p>
      <div className={`droid-dome ${beeps > 0 ? 'awake' : ''}`} />
      <button onClick={() => setBeeps(beeps + 1)}>
        Beeped {beeps} times
      </button>
    </div>
  );
}

export default function LocalStateLesson() {
  const [showR5, setShowR5] = useState(true);
  const [swapped, setSwapped] = useState(false);

  return (
    <Lesson
      slide="slides 43 & 46 — State is independent for each component"
      title="5 · Local state: two droids, two memories"
      idea="Each instance of a component gets its own state, tied to its position in the UI tree (or to its key)."
    >
      <Demo title="Counters that update separately">
        <div className="row">
          <Astromech unit="R2-D2" />
          <Astromech unit="R5-D4" />
        </div>
      </Demo>

      <Demo title="Position in the tree owns the state (slide 42)">
        <div className="row">
          <Astromech unit={swapped ? 'BB-8' : 'C1-10P'} />
          {showR5 && <Astromech unit="R4-P17" />}
        </div>
        <div className="row">
          <button onClick={() => setSwapped(!swapped)}>Rename the first droid</button>
          <button onClick={() => setShowR5(!showR5)}>
            {showR5 ? 'Send the second droid away' : 'Bring the second droid back'}
          </button>
        </div>
        <p className="hint">
          Renaming keeps the counter: same component, same position. Sending the
          droid away and bringing it back RESETS it: React destroyed that node
          in the tree, and its state went with it.
        </p>
      </Demo>

      <Note>
        <ul>
          <li>
            State lives in React, <em>outside</em> your component function,
            indexed by the component's position in the tree — or by its{' '}
            <code>key</code> if you gave one. Change the key and you get a
            brand new state, which is a handy way of resetting a form.
          </li>
          <li>
            This is why sharing data between two siblings is impossible from
            where they stand: neither can see the other's memory. Lesson 6.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Give the first droid a <code>key={'{'}swapped ? 'a' : 'b'{'}'}</code>{' '}
            and press "Rename". What changes and why?
          </li>
          <li>
            Explain in one sentence why a droid's counter survives a re-render
            of the lesson but not being removed from the tree.
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
