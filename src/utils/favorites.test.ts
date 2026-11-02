import { describe, expect, it } from "vitest";
import {
  FAVORITES_KEY,
  loadFavorites,
  parseFavorites,
  saveFavorites,
  toggleFavorite,
  type KeyValueStorage,
} from "./favorites";

/** In-memory stand-in for localStorage. */
function makeStorage(initial: Record<string, string> = {}): KeyValueStorage & { data: Record<string, string> } {
  const data = { ...initial };
  return {
    data,
    getItem: (key) => data[key] ?? null,
    setItem: (key, value) => {
      data[key] = value;
    },
  };
}

describe("parseFavorites", () => {
  it("reads a stored JSON array of ids", () => {
    expect(parseFavorites('["Ahri","Garen"]')).toEqual(["Ahri", "Garen"]);
  });

  it("returns an empty list when nothing is stored or the text is not valid JSON", () => {
    expect(parseFavorites(null)).toEqual([]);
    expect(parseFavorites("{not json")).toEqual([]);
  });

  it("ignores values that are not a list of strings, and removes duplicates", () => {
    expect(parseFavorites('{"Ahri":true}')).toEqual([]);
    expect(parseFavorites('["Ahri", 42, null, "Ahri", "Lux"]')).toEqual(["Ahri", "Lux"]);
  });
});

describe("toggleFavorite", () => {
  it("adds a champion that is not a favorite yet", () => {
    expect(toggleFavorite(["Ahri"], "Lux")).toEqual(["Ahri", "Lux"]);
  });

  it("removes a champion that is already a favorite, without changing the original array", () => {
    const original = ["Ahri", "Lux"];
    expect(toggleFavorite(original, "Ahri")).toEqual(["Lux"]);
    expect(original).toEqual(["Ahri", "Lux"]);
  });
});

describe("loadFavorites / saveFavorites", () => {
  it("saves the list and loads the same list back", () => {
    const storage = makeStorage();
    saveFavorites(["Ahri", "Zed"], storage);
    expect(storage.data[FAVORITES_KEY]).toBe('["Ahri","Zed"]');
    expect(loadFavorites(storage)).toEqual(["Ahri", "Zed"]);
  });

  it("keeps working when storage is unavailable or throws", () => {
    const broken: KeyValueStorage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("quota exceeded");
      },
    };
    expect(loadFavorites(broken)).toEqual([]);
    expect(() => saveFavorites(["Ahri"], broken)).not.toThrow();
    expect(loadFavorites(null)).toEqual([]);
  });
});
