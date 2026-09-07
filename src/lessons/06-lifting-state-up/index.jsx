import { useState } from 'react';
import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';

/**
 * LESSON 6 — Lifting state up, passing props down (T2, slides 44, 45 and 47)
 *
 * Scenario: the Death Star trench run. Several gunners must aim at the SAME
 * target. If each gunner keeps its own target in local state, the shots go
 * everywhere. The fix is the one in the slides: move the state UP to the
 * closest common ancestor, and pass down the value plus a callback.
 */

const TARGETS = ['Exhaust port', 'Trench turret', 'Y-wing squadron'];

// PRESENTATIONAL / controlled child: it holds NO state of its own.
// It receives what to show (`target`, `shots`) and what to do (`onFire`).
function GunneryStation({ station, target, shots, onFire }) {
  return (
    <div className="station">
      <h4>{station}</h4>
      <p>
        Locked on: <strong>{target}</strong>
      </p>
      <button className="primary" onClick={onFire}>
        Fire ({shots})
      </button>
    </div>
  );
}

// The common ancestor owns the shared state — the "single source of truth".
function TurbolaserBattery() {
  const [target, setTarget] = useState(TARGETS[0]);
  const [shots, setShots] = useState(0);

  function handleFire() {
    setShots((s) => s + 1);
  }

  return (
    <div>
      <div className="row">
        {TARGETS.map((t) => (
          <button
            key={t}
            className={t === target ? 'primary' : ''}
            onClick={() => {
              setTarget(t);
              setShots(0);
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="row">
        {/* Both children get the same value and the same handler,
            so they are guaranteed to stay in sync. */}
        <GunneryStation station="Dorsal battery" target={target} shots={shots} onFire={handleFire} />
        <GunneryStation station="Ventral battery" target={target} shots={shots} onFire={handleFire} />
      </div>
    </div>
  );
}

// The BEFORE picture: each station keeps its own state and they drift apart.
function LoneGunner({ station }) {
  const [shots, setShots] = useState(0);
  return (
    <div className="station muted">
      <h4>{station}</h4>
      <button onClick={() => setShots(shots + 1)}>Fire ({shots})</button>
    </div>
  );
}

export default function LiftingStateLesson() {
  return (
    <Lesson
      slide="slides 44-47 — Lifting state up, passing props down"
      title="6 · Lifting state up: the trench run"
      idea="When two components must agree on something, that something belongs to their closest common ancestor."
    >
      <Demo title="Before: local state, no coordination">
        <div className="row">
          <LoneGunner station="Dorsal battery" />
          <LoneGunner station="Ventral battery" />
        </div>
        <p className="hint">Each counter lives its own life. Nobody is in charge.</p>
      </Demo>

      <Demo title="After: one source of truth in the parent">
        <TurbolaserBattery />
      </Demo>

      <Note>
        <ul>
          <li>
            Data goes <strong>down</strong> as a value prop (<code>target</code>
            , <code>shots</code>); events go <strong>up</strong> as a function
            prop (<code>onFire</code>). React never lets data flow sideways.
          </li>
          <li>
            The children became <em>controlled</em> components: no local state,
            fully described by their props. They are trivially reusable and
            trivially testable — you can render them with fixed props and
            assert on the output.
          </li>
          <li>
            Do not lift everything by reflex. State that only one component
            cares about should stay in that component (lesson 5); lifting too
            eagerly is what produces the prop drilling of the next lesson.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Add a third station that can only fire when the target is the
            exhaust port. Where does that rule belong?
          </li>
          <li>
            Add a global shot budget of 5. Which component owns it, and what do
            the children need to receive?
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
