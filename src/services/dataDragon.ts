// The only place in the app that talks to the Riot Data Dragon API.
import type { Champion, ChampionDetail } from "../types/champion";
import type { DataDragonResponse } from "../types/dataDragon";
import type { Item, ItemData } from "../types/item";
import { isShopItem, toItemList, uniqueByName } from "../utils/filters";

const BASE_URL = "https://ddragon.leagueoflegends.com";
const LOCALE = "en_US";

export interface ChampionList {
  version: string;
  champions: Champion[];
}

export interface ChampionDetailResult {
  version: string;
  champion: ChampionDetail;
}

export interface ItemList {
  version: string;
  items: Item[];
}

/** An error that remembers the HTTP status, so callers can tell "not found" apart from other failures. */
class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`Request failed with status ${status}`);
    this.status = status;
  }
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new HttpError(response.status);
  }
  // response.json() is untyped; we trust the API to match the interfaces in src/types.
  const body: unknown = await response.json();
  return body as T;
}

// Every data URL contains the patch version, so it is fetched once and shared by all requests.
// It is not tied to a component's AbortSignal, so one cancelled page can't break the cache for the others.
let versionPromise: Promise<string> | null = null;

export function getLatestVersion(): Promise<string> {
  if (versionPromise === null) {
    versionPromise = getJson<string[]>(`${BASE_URL}/api/versions.json`)
      .then((versions) => versions[0])
      .catch((error: unknown) => {
        versionPromise = null; // allow a retry after a failure
        throw error;
      });
  }
  return versionPromise;
}

export async function fetchChampions(signal?: AbortSignal): Promise<ChampionList> {
  const version = await getLatestVersion();
  const response = await getJson<DataDragonResponse<Champion>>(
    `${BASE_URL}/cdn/${version}/data/${LOCALE}/champion.json`,
    signal,
  );
  return { version, champions: Object.values(response.data) };
}

export async function fetchChampionDetail(
  id: string,
  signal?: AbortSignal,
): Promise<ChampionDetailResult> {
  const notFound = new Error(`Champion "${id}" was not found. Ids are case-sensitive, e.g. "Ahri".`);
  const version = await getLatestVersion();
  let response: DataDragonResponse<ChampionDetail>;
  try {
    response = await getJson<DataDragonResponse<ChampionDetail>>(
      `${BASE_URL}/cdn/${version}/data/${LOCALE}/champion/${id}.json`,
      signal,
    );
  } catch (error: unknown) {
    // Data Dragon answers a missing champion file with 403, not 404.
    if (error instanceof HttpError && (error.status === 403 || error.status === 404)) {
      throw notFound;
    }
    throw error;
  }
  const champion = response.data[id];
  if (champion === undefined) {
    throw notFound;
  }
  return { version, champion };
}

export async function fetchItems(signal?: AbortSignal): Promise<ItemList> {
  const version = await getLatestVersion();
  const response = await getJson<DataDragonResponse<ItemData>>(
    `${BASE_URL}/cdn/${version}/data/${LOCALE}/item.json`,
    signal,
  );
  return { version, items: uniqueByName(toItemList(response.data).filter(isShopItem)) };
}

// Image URLs. Square icons and item icons depend on the patch version; splash art does not.
export function championIconUrl(version: string, imageFile: string): string {
  return `${BASE_URL}/cdn/${version}/img/champion/${imageFile}`;
}

export function championSplashUrl(championId: string, skinNum: number): string {
  return `${BASE_URL}/cdn/img/champion/splash/${championId}_${skinNum}.jpg`;
}

export function spellIconUrl(version: string, imageFile: string): string {
  return `${BASE_URL}/cdn/${version}/img/spell/${imageFile}`;
}

export function passiveIconUrl(version: string, imageFile: string): string {
  return `${BASE_URL}/cdn/${version}/img/passive/${imageFile}`;
}

export function itemIconUrl(version: string, imageFile: string): string {
  return `${BASE_URL}/cdn/${version}/img/item/${imageFile}`;
}
