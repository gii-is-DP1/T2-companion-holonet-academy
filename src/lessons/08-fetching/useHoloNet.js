import { useEffect, useState } from 'react';

/**
 * LESSON 8 (part 2) — a CUSTOM HOOK.
 *
 * The three state variables (data / loading / error) and the useEffect that
 * fills them are the same for every screen that reads from the backend.
 * A custom hook is just a function whose name starts with `use` and which
 * calls other hooks: it lets us reuse *stateful logic* instead of markup.
 *
 * This is the "Hook" design pattern listed in the T2 wrap-up slide.
 */
export function useHoloNet(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController + cleanup: if the component disappears (or the
    // dependencies change) before the answer arrives, we cancel the request
    // and never call setState on a component that is no longer there.
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    fetcher({ signal: controller.signal })
      .then((result) => {
        setData(result);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return; // expected, not a failure
        setError(err.message);
        setIsLoading(false);
      });

    // The function returned by useEffect is the CLEANUP. React runs it before
    // the next effect and when the component unmounts.
    return () => controller.abort();

    // The dependency array of slide 57: re-run the effect only when these
    // values change. An empty array => run once, after the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, isLoading, error };
}
