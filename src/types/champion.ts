import type { DataDragonImage } from "./dataDragon";

export type ChampionRole =
  | "Assassin"
  | "Fighter"
  | "Mage"
  | "Marksman"
  | "Support"
  | "Tank";

/** Riot's 0–10 ratings shown on the champion select screen. */
export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

/** A champion as returned by the list endpoint (`champion.json`). */
export interface Champion {
  /** Text id used in URLs and image paths, e.g. "MonkeyKing". */
  id: string;
  /** Numeric id as a string, e.g. "62". */
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: DataDragonImage;
  tags: ChampionRole[];
  /** Resource bar type, e.g. "Mana", "Energy", "None". */
  partype: string;
  stats: ChampionStats;
}

/** One of the Q / W / E / R abilities. */
export interface Skill {
  id: string;
  name: string;
  description: string;
  maxrank: number;
  cooldown: number[];
  cost: number[];
  costType: string;
  image: DataDragonImage;
}

export interface Passive {
  name: string;
  description: string;
  image: DataDragonImage;
}

export interface Skin {
  id: string;
  /** Index used to build the splash art URL, e.g. `Ahri_1.jpg`. */
  num: number;
  name: string;
  chromas: boolean;
  /** Set only on chromas (color variants): the `num` of the skin they recolor. Chromas have no splash art. */
  parentSkin?: number;
}

/** A champion as returned by the per-champion endpoint (`champion/{id}.json`). */
export interface ChampionDetail extends Champion {
  lore: string;
  allytips: string[];
  enemytips: string[];
  skins: Skin[];
  spells: Skill[];
  passive: Passive;
}
