import { Link } from "react-router-dom";
import ChampionGrid from "../components/ChampionGrid";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useChampions } from "../hooks/useDataDragon";
import type { Favorites } from "../hooks/useFavorites";
import { selectFavorites } from "../utils/filters";

interface FavoritesPageProps {
  favorites: Favorites;
}

function FavoritesPage({ favorites }: FavoritesPageProps) {
  // Only ids are saved, so the full champion data is fetched and the favorites are picked out of it.
  const state = useChampions();

  // Recomputed on every render, so un-starring a champion removes its card right away.
  const favoriteChampions =
    state.status === "success" ? selectFavorites(state.data.champions, favorites.favoriteIds) : [];

  return (
    <section>
      <h1>Favorites</h1>
      {state.status === "loading" && <Loader label="Loading favorites…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && favoriteChampions.length === 0 && (
        <div className="empty-state">
          <p>You have no favorite champions yet.</p>
          <p>
            Tap the ☆ on any champion to save it here. <Link to="/">Browse champions</Link>
          </p>
        </div>
      )}
      {state.status === "success" && favoriteChampions.length > 0 && (
        <>
          <p className="result-count">
            {favoriteChampions.length} favorite {favoriteChampions.length === 1 ? "champion" : "champions"}
          </p>
          <ChampionGrid
            champions={favoriteChampions}
            version={state.data.version}
            isFavorite={favorites.isFavorite}
            onToggleFavorite={favorites.toggle}
          />
        </>
      )}
    </section>
  );
}

export default FavoritesPage;
