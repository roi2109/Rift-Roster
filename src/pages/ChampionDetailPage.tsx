import { Link, useParams } from "react-router-dom";

function ChampionDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <section>
      <Link to="/">← Back to champions</Link>
      <h1>Champion: {id}</h1>
      <p>Lore, skills and skins will appear here.</p>
    </section>
  );
}

export default ChampionDetailPage;
