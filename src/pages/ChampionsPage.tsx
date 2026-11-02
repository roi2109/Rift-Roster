import { Link } from "react-router-dom";

function ChampionsPage() {
  return (
    <section>
      <h1>Champions</h1>
      <p>The champion catalog will appear here.</p>
      {/* Temporary link for checking the detail route until the grid is built. */}
      <Link to="/champions/Ahri">Open a sample champion (Ahri)</Link>
    </section>
  );
}

export default ChampionsPage;
