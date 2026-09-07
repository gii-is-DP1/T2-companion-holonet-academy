import { Lesson, Demo, Note, Challenge } from '../../ui/Lesson.jsx';
import { ForceProvider, useForce } from './ForceContext.jsx';

/**
 * LESSON 7 — Prop drilling and React context (T2, slides 48, 49 and 62)
 *
 * Left column: the problem. The user name must reach a component four levels
 * deep, so THREE intermediate components have to carry a prop they do not
 * care about at all. That is prop drilling.
 *
 * Right column: the same tree, using a context. The intermediate components
 * become blissfully unaware.
 */

// ---------------------------------------------------------------------------
// BEFORE — prop drilling: `user` travels through every floor of the temple.
// ---------------------------------------------------------------------------
function TempleDrilled({ user }) {
  return (
    <div className="tower">
      <span className="floor">Jedi Temple</span>
      <ArchivesDrilled user={user} />
    </div>
  );
}
function ArchivesDrilled({ user }) {
  // This component does not use `user` at all. It only forwards it.
  return (
    <div className="tower">
      <span className="floor">Archives</span>
      <CouncilRoomDrilled user={user} />
    </div>
  );
}
function CouncilRoomDrilled({ user }) {
  // Neither does this one.
  return (
    <div className="tower">
      <span className="floor">Council room</span>
      <NameplateDrilled user={user} />
    </div>
  );
}
function NameplateDrilled({ user }) {
  return (
    <p className="nameplate">
      {user.rank} {user.name}
    </p>
  );
}

// ---------------------------------------------------------------------------
// AFTER — context: only the component that needs the data asks for it.
// ---------------------------------------------------------------------------
function TempleContext() {
  return (
    <div className="tower">
      <span className="floor">Jedi Temple</span>
      <ArchivesContext />
    </div>
  );
}
function ArchivesContext() {
  // No props at all. Clean.
  return (
    <div className="tower">
      <span className="floor">Archives</span>
      <CouncilRoomContext />
    </div>
  );
}
function CouncilRoomContext() {
  return (
    <div className="tower">
      <span className="floor">Council room</span>
      <NameplateContext />
    </div>
  );
}
function NameplateContext() {
  // Reaches straight into the nearest provider above it.
  const { user, alignment } = useForce();
  return (
    <p className={`nameplate ${alignment}`}>
      {user.rank} {user.name} · {alignment} side
    </p>
  );
}

function ForceControls() {
  const { turn, promote, alignment } = useForce();
  return (
    <div className="row">
      <button onClick={promote}>Promote</button>
      <button className="primary" onClick={turn}>
        Turn to the {alignment === 'light' ? 'dark' : 'light'} side
      </button>
    </div>
  );
}

export default function ContextLesson() {
  const staticUser = { name: 'Rey', rank: 'Padawan' };

  return (
    <Lesson
      slide="slides 48-49 — Prop drilling and context"
      title="7 · Context: the Force binds the galaxy together"
      idea="Context lets a deep component read shared data without every ancestor carrying it as a prop."
    >
      <div className="split">
        <Demo title="Prop drilling (the problem)">
          <TempleDrilled user={staticUser} />
          <p className="hint">
            Three components carry <code>user</code> for nothing. Add a fourth
            floor and you edit four files.
          </p>
        </Demo>

        <Demo title="Context (the solution)">
          {/* Everything inside the provider can feel the Force. */}
          <ForceProvider>
            <TempleContext />
            <ForceControls />
          </ForceProvider>
        </Demo>
      </div>

      <Note>
        <ul>
          <li>
            <strong>Context is not a replacement for props.</strong> Use props
            by default; reach for a context only for data that is genuinely
            global to a subtree: the authenticated user, the theme, the current
            locale, a JWT token.
          </li>
          <li>
            <strong>Custom hook as the public API.</strong> Consumers import{' '}
            <code>useForce()</code>, never the context object. This is the
            module pattern of lesson 1 applied to state management, and it is
            the "Hook" design pattern of the wrap-up slide.
          </li>
          <li>
            <strong>Every consumer re-renders</strong> when the context value
            changes — hence the <code>useMemo</code> in{' '}
            <code>ForceContext.jsx</code>. A context that changes on every
            keystroke is a performance trap.
          </li>
          <li>
            In your DP1 project this is exactly how you will expose the logged-in
            user, and how a route guard decides whether to render a page or
            redirect to <code>/login</code>.
          </li>
        </ul>
      </Note>

      <Challenge>
        <ol>
          <li>
            Render <code>&lt;NameplateContext /&gt;</code> outside the provider
            and read the error thrown by <code>useForce()</code>. Why is that
            better than returning <code>null</code>?
          </li>
          <li>
            Add a <code>SithHolocron</code> component that only renders when
            the alignment is <code>dark</code>, without passing any prop.
          </li>
          <li>
            Extend the context with a <code>login(name)</code> function, then
            build a component that hides its children unless someone is logged
            in — a minimal route guard.
          </li>
        </ol>
      </Challenge>
    </Lesson>
  );
}
