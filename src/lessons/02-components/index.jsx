import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';

/**
 * LESSON 2 — Components and UI decomposition (T2, slides 24 to 30 and 33 to 35)
 *
 * We are building the Mos Eisley Cantina board. Instead of one big blob of
 * JSX we cut the interface along the seams of the *information* it shows,
 * exactly like the FilterableProductTable example of slide 27.
 *
 *   CantinaBoard              <- the screen
 *     +-- CantinaHeader       <- title + house rules
 *     +-- SpeciesSection      <- one per species (repeated)
 *           +-- PatronRow     <- one per patron (repeated)
 *
 * Rule of thumb from the slides: one component = one responsibility.
 * If you cannot name a component in three words, it is doing too much.
 */

const PATRONS = [
  { id: 1, name: 'Han Solo', species: 'Human', drink: 'Corellian ale', armed: true },
  { id: 2, name: 'Greedo', species: 'Rodian', drink: 'Bespin port', armed: true },
  { id: 3, name: 'Ponda Baba', species: 'Aqualish', drink: 'Jawa juice', armed: true },
  { id: 4, name: 'Luke Skywalker', species: 'Human', drink: 'Blue milk', armed: false },
  { id: 5, name: 'Muftak', species: 'Talz', drink: 'Blue milk', armed: false },
];

// --- Leaf component: knows how to draw ONE patron and nothing else ---------
function PatronRow({ patron }) {
  return (
    <li className="patron">
      <span className="patron-name">{patron.name}</span>
      <span className="patron-drink">{patron.drink}</span>
      {/* Conditional rendering with && — a very common JSX idiom */}
      {patron.armed && <span className="badge danger">blaster</span>}
    </li>
  );
}

// --- Section component: groups patrons of one species ---------------------
function SpeciesSection({ species, patrons }) {
  return (
    <section className="species">
      <h3>
        {species} <span className="badge">{patrons.length}</span>
      </h3>
      <ul>
        {/* `key` tells React which item is which between two renders.
            Slide 42: component state is tied to its position in the tree
            OR to its key. Using the array index here would be a bug waiting
            to happen as soon as the list is sorted or filtered. */}
        {patrons.map((p) => (
          <PatronRow key={p.id} patron={p} />
        ))}
      </ul>
    </section>
  );
}

function CantinaHeader({ title, subtitle }) {
  return (
    <header className="cantina-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </header>
  );
}

// --- Screen component: composes the others --------------------------------
function CantinaBoard({ patrons }) {
  const speciesList = [...new Set(patrons.map((p) => p.species))].sort();

  return (
    <div className="cantina">
      <CantinaHeader
        title="Mos Eisley Cantina"
        subtitle="We don't serve their kind here — droids stay outside."
      />
      {speciesList.map((species) => (
        <SpeciesSection
          key={species}
          species={species}
          patrons={patrons.filter((p) => p.species === species)}
        />
      ))}
    </div>
  );
}

export default function ComponentsLesson() {
  return (
    <Lesson
      slide="slides 24-30 — Components and decomposition"
      title="2 · Components: the Mos Eisley Cantina"
      idea="A component is a JavaScript function that returns a piece of UI. Composing small components is how we get reuse and separation of concerns in the view."
    >
      <Demo>
        <CantinaBoard patrons={PATRONS} />
      </Demo>

      <Note>
        <ul>
          <li>
            Four components, four responsibilities. <code>PatronRow</code> does
            not know that species sections exist; <code>SpeciesSection</code>{' '}
            does not know how a patron is drawn.
          </li>
          <li>
            Every component here is a <strong>pure function</strong> of its
            props: same props in, same markup out. That is the fundamental
            equation of slide 35, <code>UI = f(state)</code>.
          </li>
          <li>
            The decomposition follows the data, not the pixels. That is the
            method of slide 27: draw boxes around the UI, and the boxes that
            correspond to one piece of the model become components.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Extract the <code>&lt;span className="badge danger"&gt;</code> into
            its own <code>ThreatBadge</code> component. Is the code better or
            worse? Why?
          </li>
          <li>
            Add a <code>CantinaFooter</code> showing how many patrons are
            armed, without touching <code>PatronRow</code>.
          </li>
          <li>
            Do the exercise of slide 30 on this screen: write down, in plain
            English, the responsibility of each component in one sentence.
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
