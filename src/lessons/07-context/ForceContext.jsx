import { createContext, useContext, useMemo, useState } from 'react';

/**
 * LESSON 7 (part 1) — A React context, packaged as a module.
 *
 * The Force surrounds us and binds the galaxy together: any component,
 * however deep in the tree, can feel it without anyone passing it down.
 * That is exactly what a context is.
 *
 * Notice the module design of slide 23 applied here: the context object
 * itself is PRIVATE. We only export the provider component and a custom
 * hook. Consumers never touch `ForceContext` directly, so we could swap the
 * implementation (a reducer, a store, a backend call) without changing them.
 */
const ForceContext = createContext(null);

export function ForceProvider({ children }) {
  const [alignment, setAlignment] = useState('light');
  const [user, setUser] = useState({ name: 'Rey', rank: 'Padawan' });

  // useMemo keeps the context VALUE stable between renders. Without it we
  // would build a new object every render and wake up every consumer.
  const value = useMemo(
    () => ({
      alignment,
      user,
      turn: () => setAlignment((a) => (a === 'light' ? 'dark' : 'light')),
      promote: () =>
        setUser((u) => ({ ...u, rank: u.rank === 'Padawan' ? 'Knight' : 'Master' })),
    }),
    [alignment, user]
  );

  return <ForceContext.Provider value={value}>{children}</ForceContext.Provider>;
}

/**
 * Custom hook — the "Hook pattern" of the T2 wrap-up slide.
 * It hides useContext, and it fails loudly when a component tries to use the
 * Force outside the provider, which is a much better error than `null`.
 */
export function useForce() {
  const force = useContext(ForceContext);
  if (force === null) {
    throw new Error('useForce() must be used inside a <ForceProvider>');
  }
  return force;
}
