import { describe, expect, it } from "vitest";
import type { Champion } from "../types/champion";
import type { DataDragonImage } from "../types/dataDragon";
import type { Item, ItemData } from "../types/item";
import {
  filterChampions,
  filterItems,
  isShopItem,
  selectFavorites,
  sortItems,
  toItemList,
  uniqueByName,
  withoutChromas,
} from "./filters";

// Test data builders: only the fields a test cares about are passed in.
const image: DataDragonImage = { full: "x.png", sprite: "s.png", group: "g", x: 0, y: 0, w: 48, h: 48 };

function makeChampion(overrides: Partial<Champion>): Champion {
  return {
    id: "Test",
    key: "0",
    name: "Test",
    title: "the Test",
    blurb: "",
    info: { attack: 0, defense: 0, magic: 0, difficulty: 0 },
    image,
    tags: [],
    partype: "Mana",
    stats: {
      hp: 0, hpperlevel: 0, mp: 0, mpperlevel: 0, movespeed: 0, armor: 0,
      armorperlevel: 0, spellblock: 0, spellblockperlevel: 0, attackrange: 0,
      hpregen: 0, hpregenperlevel: 0, mpregen: 0, mpregenperlevel: 0, crit: 0,
      critperlevel: 0, attackdamage: 0, attackdamageperlevel: 0,
      attackspeedperlevel: 0, attackspeed: 0,
    },
    ...overrides,
  };
}

function makeItemData(overrides: Partial<ItemData>): ItemData {
  return {
    name: "Test Item",
    description: "",
    plaintext: "",
    image,
    gold: { base: 0, total: 0, sell: 0, purchasable: true },
    tags: [],
    stats: {},
    maps: { "11": true },
    ...overrides,
  };
}

function makeItem(id: string, overrides: Partial<ItemData>): Item {
  return { ...makeItemData(overrides), id };
}

const champions: Champion[] = [
  makeChampion({ id: "Ahri", name: "Ahri", tags: ["Mage", "Assassin"] }),
  makeChampion({ id: "Garen", name: "Garen", tags: ["Fighter", "Tank"] }),
  makeChampion({ id: "Annie", name: "Annie", tags: ["Mage"] }),
];

const items: Item[] = [
  makeItem("3031", { name: "Infinity Edge", tags: ["Damage", "CriticalStrike"] }),
  makeItem("3089", { name: "Rabadon's Deathcap", tags: ["SpellDamage"] }),
  makeItem("3071", { name: "Black Cleaver", tags: ["Damage", "Health"] }),
];

const namesOf = (list: { name: string }[]) => list.map((entry) => entry.name);

describe("filterChampions", () => {
  it("returns every champion when the query is empty and the role is All", () => {
    expect(filterChampions(champions, { query: "", role: "All" })).toHaveLength(3);
  });

  it("matches the name case-insensitively and ignores surrounding spaces", () => {
    const result = filterChampions(champions, { query: "  aN ", role: "All" });
    expect(namesOf(result)).toEqual(["Annie"]);
  });

  it("keeps only champions that have the chosen role", () => {
    const result = filterChampions(champions, { query: "", role: "Mage" });
    expect(namesOf(result)).toEqual(["Ahri", "Annie"]);
  });

  it("applies the name query and the role together", () => {
    const result = filterChampions(champions, { query: "a", role: "Tank" });
    expect(namesOf(result)).toEqual(["Garen"]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterChampions(champions, { query: "zed", role: "All" })).toEqual([]);
  });
});

describe("filterItems", () => {
  it("keeps only items that carry the chosen tag", () => {
    const result = filterItems(items, { query: "", tag: "Damage" });
    expect(namesOf(result)).toEqual(["Infinity Edge", "Black Cleaver"]);
  });

  it("applies the name query and the tag together", () => {
    const result = filterItems(items, { query: "edge", tag: "Damage" });
    expect(namesOf(result)).toEqual(["Infinity Edge"]);
  });
});

describe("toItemList", () => {
  it("turns the API record into an array and copies each key into id", () => {
    const result = toItemList({
      "1001": makeItemData({ name: "Boots" }),
      "3031": makeItemData({ name: "Infinity Edge" }),
    });
    expect(result.map((item) => [item.id, item.name])).toEqual([
      ["1001", "Boots"],
      ["3031", "Infinity Edge"],
    ]);
  });
});

describe("isShopItem", () => {
  it("accepts a purchasable Summoner's Rift item", () => {
    expect(isShopItem(makeItemData({}))).toBe(true);
  });

  it("rejects items that are hidden, off the Rift, or champion-only", () => {
    const notPurchasable = makeItemData({ gold: { base: 0, total: 0, sell: 0, purchasable: false } });
    const otherMapOnly = makeItemData({ maps: { "11": false, "12": true } });
    const notInStore = makeItemData({ inStore: false });
    const championOnly = makeItemData({ requiredChampion: "Kalista" });

    for (const item of [notPurchasable, otherMapOnly, notInStore, championOnly]) {
      expect(isShopItem(item)).toBe(false);
    }
  });
});

describe("withoutChromas", () => {
  it("keeps real skins and removes chromas that point to a parent skin", () => {
    const result = withoutChromas([
      { id: "103000", num: 0, name: "default", chromas: false },
      { id: "103004", num: 4, name: "Popstar Ahri", chromas: true },
      { id: "103008", num: 8, name: "Popstar Ahri (Amethyst)", chromas: false, parentSkin: 4 },
    ]);
    expect(result.map((skin) => skin.num)).toEqual([0, 4]);
  });
});

describe("selectFavorites", () => {
  it("returns the favorite champions in the order they were added", () => {
    const result = selectFavorites(champions, ["Annie", "Ahri"]);
    expect(namesOf(result)).toEqual(["Annie", "Ahri"]);
  });

  it("skips saved ids that no longer match a champion", () => {
    const result = selectFavorites(champions, ["Garen", "OldChampion"]);
    expect(namesOf(result)).toEqual(["Garen"]);
  });
});

describe("uniqueByName", () => {
  it("keeps one item per name, preferring the lowest id", () => {
    const result = uniqueByName([
      makeItem("323075", { name: "Thornmail" }),
      makeItem("3075", { name: "Thornmail" }),
      makeItem("3031", { name: "Infinity Edge" }),
    ]);
    expect(result.map((item) => item.id).sort()).toEqual(["3031", "3075"]);
  });
});

describe("sortItems", () => {
  const priced = [
    makeItem("1", { name: "B Sword", gold: { base: 0, total: 3000, sell: 0, purchasable: true } }),
    makeItem("2", { name: "A Ring", gold: { base: 0, total: 400, sell: 0, purchasable: true } }),
    makeItem("3", { name: "C Staff", gold: { base: 0, total: 3000, sell: 0, purchasable: true } }),
  ];

  it("sorts by price from cheapest to most expensive, using the name to break ties", () => {
    expect(namesOf(sortItems(priced, "price-asc"))).toEqual(["A Ring", "B Sword", "C Staff"]);
  });

  it("sorts by price from most expensive and by name, without changing the original array", () => {
    expect(namesOf(sortItems(priced, "price-desc"))).toEqual(["B Sword", "C Staff", "A Ring"]);
    expect(namesOf(sortItems(priced, "name"))).toEqual(["A Ring", "B Sword", "C Staff"]);
    expect(namesOf(priced)).toEqual(["B Sword", "A Ring", "C Staff"]);
  });
});
