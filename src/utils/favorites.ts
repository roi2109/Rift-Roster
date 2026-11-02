// Reads and writes the list of favorite champion ids in localStorage.

export const FAVORITES_KEY = "riftroster:favorites";

/** The two Storage methods we use. Tests pass a simple fake instead of the real localStorage. */
export type KeyValueStorage = Pick<Storage, "getItem" | "setItem">;

/** Returns localStorage, or null when the browser blocks it (e.g. some private modes). */
function browserStorage(): KeyValueStorage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

/**
 * Turns the stored text back into a list of ids.
 * Anything unexpected (missing, broken JSON, not an array) gives an empty list instead of crashing the app.
 */
export function parseFavorites(raw: string | null): string[] {
  if (raw === null) {
    return [];
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) {
    return [];
  }
  const ids = parsed.filter((value): value is string => typeof value === "string");
  return [...new Set(ids)];
}

export function loadFavorites(storage: KeyValueStorage | null = browserStorage()): string[] {
  if (storage === null) {
    return [];
  }
  try {
    return parseFavorites(storage.getItem(FAVORITES_KEY));
  } catch {
    return [];
  }
}

export function saveFavorites(
  ids: string[],
  storage: KeyValueStorage | null = browserStorage(),
): void {
  if (storage === null) {
    return;
  }
  try {
    storage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // Storage is full or blocked: favorites still work for this visit, they just won't be remembered.
  }
}

/** Adds the id if it is missing, removes it if it is there. Returns a new array and never changes the old one. */
export function toggleFavorite(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];
}
