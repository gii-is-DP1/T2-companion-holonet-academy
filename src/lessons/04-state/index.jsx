import { useState } from 'react';
import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';

/**
 * LESSON 4 — Internal state, hooks and declarative UI
 * (T2, slides 36 alternative 2, 37, 38 and 41)
 *
 * A lightsaber hilt owns its own state: is it ignited, and what colour is the
 * kyber crystal? We never touch the DOM to turn the blade on. We describe
 * what the hilt looks like FOR EACH STATE, and then we change the state.
 */

const CRYSTALS = ['blue', 'green', 'purple', 'red'];

function Lightsaber({ owner }) {
  // useState returns [current value, setter]. The setter is what triggers
  // a re-render (slide 39: "2 reasons for triggering a render ... state update").
  const [ignited, setIgnited] = useState(false);
  const [crystal, setCrystal] = useState('blue');

  return (
    <div className="saber-box">
      <p className="saber-owner">{owner}</p>

      {/* DECLARATIVE: we do not write "if ignited then add a div".
          We describe the blade as a function of `ignited`. */}
      <div className={`saber ${ignited ? `on ${crystal}` : 'off'}`}>
        <div className="hilt" />
        {ignited && <div className="blade" />}
      </div>

      <div className="row">
        <button className="primary" onClick={() => setIgnited(!ignited)}>
          {ignited ? 'Retract' : 'Ignite'}
        </button>
        {CRYSTALS.map((c) => (
          <button
            key={c}
            disabled={c === crystal}
            onClick={() => setCrystal(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * The snapshot trap of slide 40. Both buttons look like they do the same
 * thing; they do not. `count` is a *snapshot* captured when this render
 * happened, so `setCount(count + 1)` three times all compute the same value.
 * The updater form `setCount(c => c + 1)` queues three real increments.
 */
function ForceLightning() {
  const [bolts, setBolts] = useState(0);

  function unlimitedPowerWrong() {
    setBolts(bolts + 1);
    setBolts(bolts + 1);
    setBolts(bolts + 1); // => +1 in total. The value is a snapshot!
  }

  function unlimitedPowerRight() {
    setBolts((b) => b + 1);
    setBolts((b) => b + 1);
    setBolts((b) => b + 1); // => +3. Each updater sees the previous result.
  }

  return (
    <div>
      <p className="output">Bolts fired: {bolts}</p>
      <div className="row">
        <button onClick={unlimitedPowerWrong}>Three times, snapshot (+1)</button>
        <button onClick={unlimitedPowerRight}>Three times, updater (+3)</button>
        <button onClick={() => setBolts(0)}>Reset</button>
      </div>
    </div>
  );
}

/**
 * Objects and arrays in state must be treated as READ-ONLY (slide 41).
 * We never push into the array: we build a NEW array with the spread syntax.
 */
function JediCouncil() {
  const [council, setCouncil] = useState({
    chapter: 'High Council',
    members: ['Yoda', 'Mace Windu'],
  });

  function admitWrong() {
    // MUTATION. React compares the object reference; it is the same object,
    // so React sees no change and the UI does not update.
    council.members.push('Anakin Skywalker');
    setCouncil(council);
  }

  function admitRight() {
    setCouncil({
      ...council, // copy the other fields
      members: [...council.members, 'Anakin Skywalker'], // new array
    });
  }

  return (
    <div>
      <p className="output">
        {council.chapter}: {council.members.join(', ')}
      </p>
      <div className="row">
        <button onClick={admitWrong}>Admit by mutating (nothing happens)</button>
        <button className="primary" onClick={admitRight}>
          Admit with spread syntax
        </button>
        <button onClick={() => setCouncil({ ...council, members: ['Yoda', 'Mace Windu'] })}>
          Reset
        </button>
      </div>
      <p className="hint">
        Press "Admit by mutating" first and then "Admit with spread syntax":
        Anakin appears <em>twice</em>. The mutation did happen — it silently
        corrupted the state and only surfaced on the next legitimate update.
        This is why these bugs are so hard to track down.
      </p>
    </div>
  );
}

export default function StateLesson() {
  return (
    <Lesson
      slide="slides 36-41 — Internal state, hooks, declarative UI"
      title="4 · State: igniting a lightsaber"
      idea="Components are pure functions, so persistent memory comes from hooks. We describe the UI for each state and then change the state — we never touch the DOM."
    >
      <Demo title="Declarative UI">
        <div className="row wrap">
          <Lightsaber owner="Luke Skywalker" />
        </div>
      </Demo>

      <Demo title="State is a snapshot (slide 40)">
        <ForceLightning />
      </Demo>

      <Demo title="Treat objects and arrays as immutable (slide 41)">
        <JediCouncil />
      </Demo>

      <Note>
        <ul>
          <li>
            <strong>Trigger → Render → Commit</strong> (slide 39). Clicking
            calls <code>setIgnited</code> (trigger), React calls{' '}
            <code>Lightsaber</code> again (render) and only then patches the
            DOM nodes that actually differ (commit).
          </li>
          <li>
            <strong>Never mutate state.</strong> The "Admit by mutating" button
            is the single most common bug in DP1 projects. React compares
            references, so a mutated array looks unchanged.
          </li>
          <li>
            Hooks may only be called at the top level of a component, never
            inside an <code>if</code> or a loop — React identifies them by
            call order.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Add a <code>battles</code> counter to <code>Lightsaber</code> that
            increases every time the blade is ignited.
          </li>
          <li>
            Make the red crystal also add a <code>sith</code> class and a
            warning message, without adding a second state variable. (Hint:
            derive it, do not store it.)
          </li>
          <li>
            Rewrite <code>unlimitedPowerWrong</code> so it works while still
            calling <code>setBolts</code> three times.
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
