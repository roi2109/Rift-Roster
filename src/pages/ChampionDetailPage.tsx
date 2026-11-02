import { Link, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useChampionDetail } from "../hooks/useDataDragon";

function ChampionDetailPage() {
  const { id = "" } = useParams<{ id: string }>();
  const state = useChampionDetail(id);

  return (
    <section>
      <Link to="/">← Back to champions</Link>
      {state.status === "loading" && <Loader label="Loading champion…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && (
        <>
          <h1>
            {state.data.champion.name}, {state.data.champion.title}
          </h1>
          <p>Lore, skills and skins will appear here.</p>
        </>
      )}
    </section>
  );
}

export default ChampionDetailPage;
