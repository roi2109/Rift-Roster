import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useItems } from "../hooks/useDataDragon";

function ItemsPage() {
  const state = useItems();

  return (
    <section>
      <h1>Items Codex</h1>
      {state.status === "loading" && <Loader label="Loading items…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && (
        // Temporary summary until the item table is built.
        <p>
          Loaded {state.data.items.length} shop items (patch {state.data.version}).
        </p>
      )}
    </section>
  );
}

export default ItemsPage;
