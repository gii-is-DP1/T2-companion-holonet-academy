import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';

/**
 * LESSON 3 — Props (T2, slide 36, alternative 1, and slide 48)
 *
 * Props are how a parent hands data down to a child. They are READ-ONLY and
 * they flow in ONE direction only: top -> down. A starship gets its
 * specification from the hangar; it cannot rewrite its own blueprint.
 */

const FLEET = [
  {
    id: 'md',
    name: 'Millennium Falcon',
    className: 'YT-1300 light freighter',
    crew: 2,
    hyperdrive: 0.5,
    pilot: 'Han Solo',
  },
  {
    id: 'xw',
    name: 'T-65B X-wing',
    className: 'Starfighter',
    crew: 1,
    hyperdrive: 1.0,
    pilot: 'Luke Skywalker',
  },
  {
    id: 'sd',
    name: 'Slave I',
    className: 'Firespray-31 patrol craft',
    crew: 1,
    hyperdrive: 3.0,
    pilot: 'Boba Fett',
  },
];

// Destructuring the props object in the parameter list — the style used in
// the slides. `pilot` has a default value for when the parent omits it.
function StarshipCard({ name, className, crew, hyperdrive, pilot = 'unassigned' }) {
  // ------------------------------------------------------------------
  // Props are read-only. Uncomment the next line: in StrictMode React
  // will complain, and even when it does not, the change is silently lost
  // because the parent re-renders with its own value again.
  //     name = 'Death Star';
  // ------------------------------------------------------------------
  return (
    <div className="ship-card">
      <h3>{name}</h3>
      <dl>
        <dt>Class</dt>
        <dd>{className}</dd>
        <dt>Crew</dt>
        <dd>{crew}</dd>
        <dt>Hyperdrive</dt>
        <dd>class {hyperdrive.toFixed(1)}</dd>
        <dt>Pilot</dt>
        <dd>{pilot}</dd>
      </dl>
    </div>
  );
}

// Exactly the same component written with the single `props` object,
// as shown at the bottom of slide 36. Both styles are equivalent.
function StarshipCardAlt(props) {
  return (
    <div className="ship-card muted">
      <h3>{props.name}</h3>
      <p>{props.className}</p>
    </div>
  );
}

function Hangar({ ships }) {
  return (
    <div className="hangar">
      {ships.map((ship) => (
        // The SAME component is reused three times with different props.
        // This is reuse and composability, slide 35.
        <StarshipCard
          key={ship.id}
          name={ship.name}
          className={ship.className}
          crew={ship.crew}
          hyperdrive={ship.hyperdrive}
          pilot={ship.pilot}
        />
      ))}
    </div>
  );
}

export default function PropsLesson() {
  return (
    <Lesson
      slide="slide 36 — State from outside (props)"
      title="3 · Props: the Rebel hangar"
      idea="Props are the parameters of a component. The parent owns the data, the child only reads it."
    >
      <Demo title="Three cards, one component">
        <Hangar ships={FLEET} />
      </Demo>

      <Demo title="The same idea with a single props object">
        <StarshipCardAlt name="TIE/ln fighter" className="Imperial starfighter" />
      </Demo>

      <Note>
        <ul>
          <li>
            <strong>One-way data flow.</strong> If a card needs to change the
            fleet, it cannot do it by itself — it must ask the parent through a
            callback prop. We will see exactly that in lesson 6.
          </li>
          <li>
            <strong>Spreading props</strong> is shorter but hides the contract:{' '}
            <code>&lt;StarshipCard {'{...ship}'} /&gt;</code> works here, yet
            writing the props explicitly documents what the child actually
            needs. Prefer explicitness while you are learning.
          </li>
          <li>
            When a chain of components passes props down only to hand them
            over to a grandchild, you have <em>prop drilling</em> (slide 49).
            Lesson 7 fixes it.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Add a <code>fast</code> boolean prop and render a badge when the
            hyperdrive class is below 1.0. Compute it in the parent, not in
            the card. Why is that the better place?
          </li>
          <li>
            Uncomment the <code>name = 'Death Star'</code> line inside{' '}
            <code>StarshipCard</code> and explain what you observe.
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
