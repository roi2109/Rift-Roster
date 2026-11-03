import type { Champion, ChampionRole, Skin } from "../types/champion";
import type { Item, ItemData } from "../types/item";

/** "All" means the role/tag filter is turned off. */
export interface ChampionFilter {
  query: string;
  role: ChampionRole | "All";
}

export interface ItemFilter {
  query: string;
  tag: string | "All";
}

const SUMMONERS_RIFT_MAP_ID = "11";

function matchesQuery(name: string, query: string): boolean {
  return name.toLowerCase().includes(query.trim().toLowerCase());
}

/** Keeps champions whose name contains the query and who have the chosen role. */
export function filterChampions(
  champions: Champion[],
  filter: ChampionFilter,
): Champion[] {
  return champions.filter(
    (champion) =>
      matchesQuery(champion.name, filter.query) &&
      (filter.role === "All" || champion.tags.includes(filter.role)),
  );
}

/** Keeps items whose name contains the query and that carry the chosen tag. */
export function filterItems(items: Item[], filter: ItemFilter): Item[] {
  return items.filter(
    (item) =>
      matchesQuery(item.name, filter.query) &&
      (filter.tag === "All" || item.tags.includes(filter.tag)),
  );
}

/** Turns the API's `{ "3031": {...} }` record into an array, copying each key onto the item as `id`. */
export function toItemList(data: Record<string, ItemData>): Item[] {
  return Object.entries(data).map(([id, item]) => ({ ...item, id }));
}

/**
 * True for items a player can actually buy on Summoner's Rift.
 * Filters out hidden items, other game modes and champion-only items (e.g. Kalista's spear).
 */
export function isShopItem(item: ItemData): boolean {
  return (
    item.gold.purchasable &&
    item.maps[SUMMONERS_RIFT_MAP_ID] === true &&
    item.inStore !== false &&
    item.requiredChampion === undefined
  );
}

/** Keeps real skins and drops chromas, which are listed in `skins` too but have no splash art. */
export function withoutChromas(skins: Skin[]): Skin[] {
  return skins.filter((skin) => skin.parentSkin === undefined);
}

/**
 * Looks up the favorite ids in the full champion list, in the order they were favorited.
 * Ids that no longer match a champion (e.g. renamed in a patch) are skipped.
 */
export function selectFavorites(champions: Champion[], favoriteIds: string[]): Champion[] {
  const byId = new Map(champions.map((champion) => [champion.id, champion]));
  return favoriteIds.flatMap((id) => {
    const champion = byId.get(id);
    return champion === undefined ? [] : [champion];
  });
}

/**
 * Keeps one item per name. Data Dragon lists some items twice for other game modes
 * (e.g. Thornmail as "3075" and "323075"); the lowest id is the standard version.
 */
export function uniqueByName(items: Item[]): Item[] {
  const byName = new Map<string, Item>();
  for (const item of items) {
    const kept = byName.get(item.name);
    if (kept === undefined || Number(item.id) < Number(kept.id)) {
      byName.set(item.name, item);
    }
  }
  return [...byName.values()];
}

export type ItemSort = "name" | "price-asc" | "price-desc";

/** Returns a sorted copy; ties on price fall back to the name so the order is always stable. */
export function sortItems(items: Item[], sort: ItemSort): Item[] {
  const byName = (a: Item, b: Item) => a.name.localeCompare(b.name);
  return [...items].sort((a, b) => {
    if (sort === "name") {
      return byName(a, b);
    }
    const difference = sort === "price-asc" ? a.gold.total - b.gold.total : b.gold.total - a.gold.total;
    return difference !== 0 ? difference : byName(a, b);
  });
}
