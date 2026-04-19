/**
 * API base path. In Vite dev, `/api` is proxied to the FastAPI backend (see vite.config.js).
 * Override with `VITE_API_BASE_URL` (e.g. `http://127.0.0.1:8000`) if you prefer direct calls.
 */
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  (import.meta.env.DEV ? "/api" : "http://127.0.0.1:8000");

export const ALPHABET_SUBMODULES = [
  { id: 0, title: "A - E", letters: ["A", "B", "C", "D", "E"] },
  { id: 1, title: "F - J", letters: ["F", "G", "H", "I", "J"] },
  { id: 2, title: "K - O", letters: ["K", "L", "M", "N", "O"] },
  { id: 3, title: "P - T", letters: ["P", "Q", "R", "S", "T"] },
  { id: 4, title: "U - Z", letters: ["U", "V", "W", "X", "Y", "Z"] },
];
