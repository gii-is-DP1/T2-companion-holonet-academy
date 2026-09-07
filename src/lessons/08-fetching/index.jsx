import { useCallback, useState } from 'react';
import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';
import { fetchStarships, fetchCharacters } from './api.js';
import { useHoloNet } from './useHoloNet.js';

/**
 * LESSON 8 — Fetching data from the backend (T2, slides 55 to 57)
 * and the Container / Presentational pattern (slides 75 to 81).
 *
 * The Rebel fleet registry, served by the mock HoloNet backend
 * (json-server, api/db.json). Start it with `npm run dev`.
 *
 *   FleetContainer     -> WHAT is shown (fetching, loading, errors)
 *     +-- FleetList    -> HOW it is shown (pure markup, no state)
 *           +-- ShipRow
 *
 * The container knows about HTTP; the presentational components know about
 * CSS. Neither knows about the other's problem. That is the separation of
 * concerns the slides are after — and it makes FleetList testable with a
 * hardcoded array, no server required.
 */

// --- Presentational: leaf ---------------------------------------------------
function ShipRow({ ship }) {
  return (
    <li className="ship-row">
      <span className="ship-name">{ship.name}</span>
      <span className="ship-class">{ship.starshipClass}</span>
      <span className={`badge ${ship.faction === 'Empire' ? 'danger' : ''}`}>
        {ship.faction}
      </span>
      <span className="ship-crew">crew {ship.crew}</span>
    </li>
  );
}

// --- Presentational: list ---------------------------------------------------
// No useState, no useEffect, no fetch. Everything arrives as props.
function FleetList({ ships, isLoading, error }) {
  if (isLoading) return <p className="output">Scanning the HoloNet…</p>;
  if (error) return <p className="output error">Transmission failed: {error}</p>;
  if (!ships || ships.length === 0) return <p className="output">No ships in registry.</p>;

  return (
    <ul className="fleet">
      {ships.map((ship) => (
        <ShipRow key={ship.id} ship={ship} />
      ))}
    </ul>
  );
}

// --- Container --------------------------------------------------------------
function FleetContainer() {
  const [faction, setFaction] = useState('all');

  // useCallback keeps the fetcher stable so the effect does not re-run on
  // every render — only when `faction` actually changes.
  const load = useCallback(
    (options) => fetchStarships(options),
    []
  );

  const { data: ships, isLoading, error } = useHoloNet(load, []);

  const visible =
    faction === 'all' ? ships : ships?.filter((s) => s.faction === faction);

  return (
    <div>
      <div className="row">
        {['all', 'Rebellion', 'Empire'].map((f) => (
          <button
            key={f}
            className={f === faction ? 'primary' : ''}
            onClick={() => setFaction(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <FleetList ships={visible} isLoading={isLoading} error={error} />
    </div>
  );
}

// --- A second consumer of the same hook, to show the reuse ------------------
function CrewRoster() {
  const { data: crew, isLoading, error } = useHoloNet(fetchCharacters, []);

  if (isLoading) return <p className="output">Loading personnel files…</p>;
  if (error) return <p className="output error">{error}</p>;

  return (
    <ul className="crew">
      {crew.map((c) => (
        <li key={c.id}>
          <strong>{c.name}</strong> — {c.role} ({c.homeworld})
        </li>
      ))}
    </ul>
  );
}

export default function FetchingLesson() {
  return (
    <Lesson
      slide="slides 55-57 & 75 — useEffect, custom hooks, container/presentational"
      title="8 · Talking to the backend: the HoloNet registry"
      idea="Side effects (HTTP calls) live in useEffect, wrapped in a custom hook, inside a container component. The presentational components stay pure."
    >
      <Demo title="Fleet registry (container + presentational)">
        <FleetContainer />
      </Demo>

      <Demo title="The same hook, a different screen">
        <CrewRoster />
      </Demo>

      <Note>
        <ul>
          <li>
            <strong>Three states, always.</strong> Every remote call has a
            loading state, an error state and a success state. Forgetting the
            first two is the classic "it works on my machine, on localhost,
            with an empty database" bug.
          </li>
          <li>
            <strong>Cleanup matters.</strong> The <code>AbortController</code>{' '}
            in <code>useHoloNet</code> cancels in-flight requests. Without it,
            navigating away mid-request logs a warning and can show stale data.
          </li>
          <li>
            <strong>The dependency array is not decoration.</strong> An empty
            array means "once". Omitting the array means "after every render",
            which with a fetch inside is an infinite loop.
          </li>
          <li>
            <strong>Filtering happens in the container</strong>, not in the
            list. The list only knows how to draw what it is given.
          </li>
          <li>
            The backend here is <code>json-server</code> reading{' '}
            <code>api/db.json</code>, with a 400 ms delay so you can actually
            see the loading state. In your project it will be Spring Boot, and
            not a single line of this lesson changes except the URL.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Stop the API (<code>npm run api</code>) and reload. Does the UI
            degrade gracefully? Fix it if it does not.
          </li>
          <li>
            Move the faction filter to the server:{' '}
            <code>/starships?faction=Empire</code> is supported by json-server.
            You will need <code>faction</code> in the dependency array. Why?
          </li>
          <li>
            Write a <code>PlanetCard</code> that uses <code>fetchPlanet(id)</code>{' '}
            and refetches when <code>id</code> changes.
          </li>
          <li>
            Test <code>FleetList</code> without a server by rendering it with a
            hardcoded array. Notice you cannot do that with{' '}
            <code>FleetContainer</code> — that is the whole point of the
            pattern.
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
