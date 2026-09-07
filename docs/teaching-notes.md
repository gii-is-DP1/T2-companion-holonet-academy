# Teaching notes

Notes for using this repository in a lecture or lab session of DP1 · T2.
Suggested total: one 2-hour lab, or two 1-hour sessions split at lesson 5.

---

## 1 · Modules (T2 slide 23) — 8 min

**Point to make:** "private" in JavaScript is not a keyword, it is the absence
of `export`. That is the whole mechanism behind information hiding here.

- Open `holocron.js` alongside the running page.
- Uncomment the `decryptKyberSignature` import. Read the Vite error out loud.
- Ask: *if I rewrite the encryption tomorrow, how many other files change?*
  (None. That is low coupling, slide 5.)

**Common mistake in projects:** a `utils.js` that exports 30 unrelated
functions. High coupling, zero cohesion. Ask students to name one such file in
their own repo.

---

## 2 · Components (slides 24–30) — 12 min

**Point to make:** the decomposition follows the *data*, not the pixels.

- Run the slide-27 exercise live on the cantina screenshot before showing the
  code: ask the class to draw the boxes.
- Then compare their boxes with `CantinaBoard / SpeciesSection / PatronRow`.
- Discuss `key`: change `key={p.id}` to `key={index}` and sort the list —
  a good moment to preview lesson 5.

**Question to ask:** how would you know a component is doing too much?
(You cannot name it in three words; it changes for two different reasons.)

---

## 3 · Props (slides 36, 48) — 10 min

**Point to make:** props are function parameters. Nothing more magical.

- Uncomment `name = 'Death Star'` and observe.
- Show both syntaxes (destructured vs `props` object) — students will meet
  both in tutorials online.
- Preview prop drilling: "what if the pilot's name lived four levels up?"

---

## 4 · State and hooks (slides 36–41) — 20 min

The densest lesson. Three separate ideas, do not rush them.

1. **Declarative UI.** The lightsaber. Insist: we never write
   `document.querySelector('.blade')`. We describe the blade for each state.
2. **State is a snapshot** (slide 40). The two "unlimited power" buttons.
   Ask the class to predict the result *before* clicking. Most predict +3 for
   both. Let them be wrong; it is the most memorable minute of the session.
3. **Immutability** (slide 41). The Jedi Council. The mutating button appears
   broken — explain that React compares references, so it never sees a change.

**This is the #1 source of bugs in DP1 deliverables.** Say so explicitly.

---

## 5 · State is local (slides 42–43, 46) — 8 min

- Two droids, two counters. Obvious, but it sets up lesson 6.
- The second demo is the interesting one: renaming keeps the state, unmounting
  destroys it. State belongs to the *position in the tree*.
- Exercise 1 (adding a `key`) is worth doing live: it is the standard trick for
  resetting a form.

---

## 6 · Lifting state up (slides 44–47) — 15 min

**Point to make:** data down as values, events up as callbacks. Never sideways.

- Show the "before" demo first and ask what is wrong.
- After lifting, highlight that the children now have *no state at all* — they
  became trivially testable. This is the bridge to container/presentational.
- Warn against over-lifting: it is what produces the problem of lesson 7.

---

## 7 · Context (slides 48–49) — 15 min

- Show the two towers side by side. Count how many components carry `user`
  in each version (3 vs 0).
- Emphasise that `ForceContext` itself is **not exported**: the public API is
  `ForceProvider` + `useForce`. That is lesson 1 applied to state management,
  and it is the "Hook" pattern from the wrap-up slide.
- Connect to the project: this is where the JWT / logged-in user lives, and how
  a route guard decides between rendering a page and redirecting to `/login`.

**Warning to give:** context is not a global variable store. Everything under
the provider re-renders when the value changes.

---

## 8 · Fetching (slides 55–57, 75–81) — 20 min

- Start the API *after* loading the page once, so the class sees the error
  state first. It makes the "three states" rule concrete.
- Walk the data path: `FleetContainer` → `useHoloNet` → `api.js` → HTTP.
  Ask which of those files would change if the backend moved to another URL.
- The dependency array deserves a full minute: empty means once, absent means
  every render (infinite loop with a fetch inside).
- Close with container/presentational: `FleetList` can be tested with a
  hardcoded array; `FleetContainer` cannot. That is the whole justification for
  the pattern.

---

## Wrap-up questions (slide 62)

1. What is the state of a React component, and where does it actually live?
2. When do you use props and when a context?
3. How could react-router plus a context impose a security constraint?
4. Which of the eight lessons corresponds to a design pattern from the
   bibliography, and which pattern?

## If you are short on time

Cut lessons 3 and 5 (they are the most intuitive) and keep 1, 2, 4, 6, 7, 8.
Lesson 4 and lesson 8 are the ones that prevent the most project bugs.
