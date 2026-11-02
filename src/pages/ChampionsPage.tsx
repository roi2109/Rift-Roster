import ChampionGrid from "../components/ChampionGrid";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useChampions } from "../hooks/useDataDragon";

function ChampionsPage() {
  const state = useChampions();

  return (
    <section>
      <h1>Champions</h1>
      {state.status === "loading" && <Loader label="Loading champions…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && (
        <ChampionGrid champions={state.data.champions} version={state.data.version} />
      )}
    </section>
  );
}

export default ChampionsPage;
