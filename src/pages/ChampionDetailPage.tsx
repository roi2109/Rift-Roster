import { Link, useParams } from "react-router-dom";
import ChampionHeader from "../components/ChampionHeader";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import SkillList from "../components/SkillList";
import SkinCarousel from "../components/SkinCarousel";
import { useChampionDetail } from "../hooks/useDataDragon";
import { withoutChromas } from "../utils/filters";

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
          <section className="champion-detail__section">
            <h2>Abilities</h2>
            <SkillList
              passive={state.data.champion.passive}
              spells={state.data.champion.spells}
              version={state.data.version}
              resource={state.data.champion.partype}
            />
          </section>
          <section className="champion-detail__section">
            <h2>Skins</h2>
            {/* key resets the carousel to the first skin whenever a different champion is shown. */}
            <SkinCarousel
              key={state.data.champion.id}
              championId={state.data.champion.id}
              championName={state.data.champion.name}
              skins={withoutChromas(state.data.champion.skins)}
            />
          </section>
        </>
      )}
    </section>
  );
}

export default ChampionDetailPage;
