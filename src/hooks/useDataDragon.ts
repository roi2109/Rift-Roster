import { useCallback } from "react";
import {
  fetchChampionDetail,
  fetchChampions,
  fetchItems,
  type ChampionDetailResult,
  type ChampionList,
  type ItemList,
} from "../services/dataDragon";
import { useFetch, type FetchState } from "./useFetch";

// fetchChampions and fetchItems are module-level functions, so they are already stable.
export function useChampions(): FetchState<ChampionList> {
  return useFetch(fetchChampions);
}

export function useChampionDetail(id: string): FetchState<ChampionDetailResult> {
  // useCallback returns the same function until `id` changes, so the request re-runs only then.
  const load = useCallback(
    (signal: AbortSignal) => fetchChampionDetail(id, signal),
    [id],
  );
  return useFetch(load);
}

export function useItems(): FetchState<ItemList> {
  return useFetch(fetchItems);
}
