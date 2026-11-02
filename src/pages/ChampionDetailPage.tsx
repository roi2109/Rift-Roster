import { Link, useParams } from "react-router-dom";
import ChampionHeader from "../components/ChampionHeader";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useChampionDetail } from "../hooks/useDataDragon";

function ChampionDetailPage() {
  // The id comes from the URL (/champions/:id), so every champion has its own address.
  const { id = "" } = useParams<{ id: string }>();
  const state = useChampionDetail(id);

  return (
    <section className="champion-detail">
      <Link to="/" className="back-link">
        ← Back to champions
      </Link>
      {state.status === "loading" && <Loader label="Loading champion…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && (
        <>
          <ChampionHeader champion={state.data.champion} />
          <section className="champion-detail__section">
            <h2>Lore</h2>
            <p className="champion-detail__lore">{state.data.champion.lore}</p>
          </section>
          {/* Skills and skins are added in task 9. */}
        </>
      )}
    </section>
  );
}

export default ChampionDetailPage;
