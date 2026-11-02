import { useState } from "react";
import ChampionFilters from "../components/ChampionFilters";
import ChampionGrid from "../components/ChampionGrid";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useChampions } from "../hooks/useDataDragon";
import type { Favorites } from "../hooks/useFavorites";
import { filterChampions, type ChampionFilter } from "../utils/filters";

interface ChampionsPageProps {
  favorites: Favorites;
}

function ChampionsPage({ favorites }: ChampionsPageProps) {
  const state = useChampions();
  // The filter lives here, the closest parent of both the filter form and the grid.
  const [filter, setFilter] = useState<ChampionFilter>({ query: "", role: "All" });

  // Derived on every render from the fetched list + the filter, so it is never stored in state.
  const visibleChampions =
    state.status === "success" ? filterChampions(state.data.champions, filter) : [];

  return (
    <section>
      <h1>Champions</h1>
      <ChampionFilters filter={filter} onChange={setFilter} />
      {state.status === "loading" && <Loader label="Loading champions…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && (
        <>
          <p className="result-count">
            Showing {visibleChampions.length} of {state.data.champions.length} champions
          </p>
          <ChampionGrid
            champions={visibleChampions}
            version={state.data.version}
            isFavorite={favorites.isFavorite}
            onToggleFavorite={favorites.toggle}
          />
        </>
      )}
    </section>
  );
}

export default ChampionsPage;
