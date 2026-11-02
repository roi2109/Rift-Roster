import { Link } from "react-router-dom";
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
        <>
          {/* Temporary summary until the grid is built. */}
          <p>
            Loaded {state.data.champions.length} champions (patch {state.data.version}).
          </p>
          <Link to="/champions/Ahri">Open a sample champion (Ahri)</Link>
        </>
      )}
    </section>
  );
}

export default ChampionsPage;
