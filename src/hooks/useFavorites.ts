import { useCallback, useEffect, useState } from "react";
import { loadFavorites, saveFavorites, toggleFavorite } from "../utils/favorites";

export interface Favorites {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
}

/**
 * Holds the favorite champion ids in state and keeps localStorage in sync with it.
 * Call it once, high in the tree, and pass the result down, so every page sees the same list.
 */
export function useFavorites(): Favorites {
  // The function form reads localStorage only on the first render, not on every render.
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => loadFavorites());

  // localStorage is outside React, so writing to it is a side effect that belongs in useEffect.
  useEffect(() => {
    saveFavorites(favoriteIds);
  }, [favoriteIds]);

  const toggle = useCallback((id: string) => {
    setFavoriteIds((current) => toggleFavorite(current, id));
  }, []);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  return { favoriteIds, isFavorite, toggle };
}
