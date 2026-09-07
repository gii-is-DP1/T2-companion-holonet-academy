# HoloNet Academy

Runnable, commented React examples for **DP1 · T2 — Introduction to the design
of Presentation Layers** (Diseño y Pruebas 1, Universidad de Sevilla).

Every concept of the core-React part of the lesson is a small Star Wars themed
demo you can run, read and break. The source comments are the real teaching
material: the browser shows *what* happens, the code explains *why*.

```
   "Do. Or do not. There is no try."  — and yet, npm run dev.
```

## Quick start

```bash
npm install
npm run dev
```

- Frontend: <http://localhost:3000>
- Mock backend (json-server): <http://localhost:4000>

`npm run dev` starts both at once. If you prefer separate terminals, use
`npm run web` and `npm run api`.

Requires Node 18 or newer.

## What is in here

| # | Lesson | T2 slides | Concept |
|---|--------|-----------|---------|
| 1 | Modules — the Jedi holocron | 23 | ES modules, `export`/`import`, information hiding, what "private" means in JS |
| 2 | Components — the Mos Eisley Cantina | 24–30, 33–35 | JSX, composition, decomposing a UI into components, `key` in lists |
| 3 | Props — the Rebel hangar | 36, 48 | Props as read-only parameters, one-way data flow, reusing one component |
| 4 | State & hooks — igniting a lightsaber | 36–41 | `useState`, declarative UI, state as a snapshot, immutable objects and arrays |
| 5 | State is local — two astromechs | 42–43, 46 | One state per instance, state tied to tree position and `key` |
| 6 | Lifting state up — the trench run | 44–47 | Single source of truth, value props down, callback props up, controlled children |
| 7 | Context — the Force | 48–49 | Prop drilling, `createContext`, provider, custom hook as public API |
| 8 | Fetching — the HoloNet registry | 55–57, 75–81 | `useEffect`, dependency array, cleanup, custom hook, container/presentational |

Lessons 1–2 are about **decomposition**. Lessons 3–6 are about **state**: who
owns it and how it travels. Lessons 7–8 are the two escape hatches you will
actually need in your project: shared state without prop drilling, and talking
to the backend.

## Layout

```
holonet-academy/
├── api/db.json                  Mock backend data (json-server)
├── docs/teaching-notes.md       Notes for the lecturer: timings, questions, common mistakes
├── index.html                   The single page of the SPA
├── vite.config.js               Dev server + /api proxy to json-server
└── src/
    ├── main.jsx                 <BrowserRouter> setup (slide 52)
    ├── App.jsx                  Sidebar + routes
    ├── styles.css               Deliberately small stylesheet
    ├── ui/Lesson.jsx            Shared presentational helpers
    └── lessons/
        ├── registry.js          The list of lessons (menu + routes come from here)
        ├── 01-modules/
        ├── 02-components/
        ├── 03-props/
        ├── 04-state/
        ├── 05-state-is-local/
        ├── 06-lifting-state-up/
        ├── 07-context/
        └── 08-fetching/
```

## How to work through it

1. Open a lesson in the browser **and** its folder in the editor side by side.
2. Look for the commented-out lines. Several lessons contain a line that
   produces an instructive error on purpose — uncomment it and read the message.
3. Do the *"Your turn, Padawan"* exercise at the bottom of each page before
   moving on.

### Deliberate mistakes to find and fix

| Lesson | Where | What it teaches |
|---|---|---|
| 1 | commented `import { decryptKyberSignature }` | Non-exported means non-existent from the outside |
| 3 | commented `name = 'Death Star'` inside `StarshipCard` | Props are read-only |
| 4 | "Three times, snapshot (+1)" button | State is a snapshot of the render, not a live variable |
| 4 | "Admit by mutating" button | React compares references: mutating state changes nothing on screen |
| 8 | stop `npm run api` and reload | Loading and error states are not optional |

## The mock backend

`json-server` serves `api/db.json` with a 400 ms delay so the loading state is
actually visible. Available collections:

- `GET /api/starships` (`?faction=Empire`, `?_sort=crew`, …)
- `GET /api/characters`
- `GET /api/planets/:id`

Vite proxies `/api/*` to `localhost:4000`, so the frontend code calls
`fetch('/api/starships')` — the same shape it will use against the Spring Boot
backend of your project. Swapping this mock for the real API changes exactly
one file: `src/lessons/08-fetching/api.js`.

## Not covered here

By design this repository stops at the core of React. The following parts of T2
are left for the lab sessions and the project itself: react-router in depth
(params, guards, nested routes), static resources and bundling, reducers, and
the backend layers (`Service`, `Repository`, entities).

---

Material prepared for the students of Diseño y Pruebas 1.
Star Wars is a trademark of Lucasfilm Ltd.; it is used here only as a familiar
setting for teaching examples.
