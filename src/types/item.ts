import type { DataDragonImage } from "./dataDragon";

export interface ItemGold {
  /** Cost of the item itself, without its components. */
  base: number;
  /** Full cost including all components. */
  total: number;
  sell: number;
  purchasable: boolean;
}

/** An item as stored in `item.json`. Its id is the record key, not a field. */
export interface ItemData {
  name: string;
  /** HTML markup with stats and passives. */
  description: string;
  plaintext: string;
  image: DataDragonImage;
  gold: ItemGold;
  /** Category tags such as "Damage", "SpellDamage", "Health", "Boots". */
  tags: string[];
  /** Flat stat values, e.g. `{ FlatPhysicalDamageMod: 75 }`. */
  stats: Record<string, number>;
  /** Map id → whether the item is available on that map ("11" is Summoner's Rift). */
  maps: Record<string, boolean>;
  /** Ids of the items this one is built from. */
  from?: string[];
  /** Ids of the items this one builds into. */
  into?: string[];
  inStore?: boolean;
  requiredChampion?: string;
}

/** An item as used inside the app, with its id copied onto the object. */
export interface Item extends ItemData {
  id: string;
}
