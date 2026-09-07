/**
 * LESSON 1 — ES modules (T2, slide 23)
 *
 * A Jedi holocron is a perfect metaphor for a module: it exposes some
 * teachings to whoever is worthy of opening it, and keeps the rest sealed
 * inside. Everything not exported is PRIVATE to this file. That is
 * *information hiding*, and it is what buys us low coupling.
 */

// ---------------------------------------------------------------------------
// PRIVATE. Not exported => nobody outside this file can reach it.
// Try to `import { decryptKyberSignature } from './holocron.js'` and the app
// will crash with "does not provide an export named ...".
// ---------------------------------------------------------------------------
function decryptKyberSignature(raw) {
  return raw
    .split('')
    .map((c) => String.fromCharCode(c.charCodeAt(0) - 1))
    .join('');
}

const SEALED_ARCHIVE = {
  'jedi-code': 'Uifsf!jt!op!fnpujpo-!uifsf!jt!qfbdf/',
  'sith-code': 'Qfbdf!jt!b!mjf-!uifsf!jt!pomz!qbttjpo/',
};

// ---------------------------------------------------------------------------
// PUBLIC API of the module: this is the *only* thing other modules may use.
// We can rewrite everything above without breaking a single caller.
// ---------------------------------------------------------------------------

/** Named export: a constant. */
export const HOLOCRON_KEEPER = 'Jocasta Nu';

/** Named export: a function. */
export function listTeachings() {
  return Object.keys(SEALED_ARCHIVE);
}

/** Default export: the main operation of the module. */
export default function openHolocron(teachingId) {
  const raw = SEALED_ARCHIVE[teachingId];
  if (!raw) {
    return `The holocron stays sealed. "${teachingId}" is not in the archive.`;
  }
  return decryptKyberSignature(raw);
}
