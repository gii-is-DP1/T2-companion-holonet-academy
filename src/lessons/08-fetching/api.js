/**
 * LESSON 8 (part 1) — the data-access module.
 *
 * Slide 57: "It is a good practice to delegate the implementation of the
 * fetching into a different method (even in a different file)."
 *
 * Every call to the mock backend goes through here. The components never
 * see a URL, never see `fetch`, never see an HTTP status code. If tomorrow
 * we move to axios, or add the JWT header from local storage, this is the
 * only file that changes.
 */

const BASE = '/api'; // proxied to json-server on :4000 — see vite.config.js

async function get(path, { signal } = {}) {
  const response = await fetch(`${BASE}${path}`, {
    signal,
    headers: {
      'Content-Type': 'application/json',
      // In your DP1 project the JWT would be attached right here:
      // Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
  if (!response.ok) {
    throw new Error(`The HoloNet answered ${response.status} for ${path}`);
  }
  return response.json();
}

export function fetchStarships(options) {
  return get('/starships', options);
}

export function fetchCharacters(options) {
  return get('/characters', options);
}

export function fetchPlanet(id, options) {
  return get(`/planets/${id}`, options);
}
