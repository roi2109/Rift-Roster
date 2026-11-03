import { useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import ItemCard from "../components/ItemCard";
import ItemFilters from "../components/ItemFilters";
import Loader from "../components/Loader";
import { useItems } from "../hooks/useDataDragon";
import { filterItems, sortItems, type ItemFilter, type ItemSort } from "../utils/filters";

function ItemsPage() {
  const state = useItems();
  const [filter, setFilter] = useState<ItemFilter>({ query: "", tag: "All" });
  const [sort, setSort] = useState<ItemSort>("name");

  // Filter first, then sort what is left. Both are derived during render, never stored.
  const visibleItems =
    state.status === "success" ? sortItems(filterItems(state.data.items, filter), sort) : [];

  return (
    <section>
      <h1>Items Codex</h1>
      <ItemFilters filter={filter} sort={sort} onFilterChange={setFilter} onSortChange={setSort} />
      {state.status === "loading" && <Loader label="Loading items…" />}
      {state.status === "error" && <ErrorMessage message={state.message} />}
      {state.status === "success" && (
        <>
          <p className="result-count">
            Showing {visibleItems.length} of {state.data.items.length} items
          </p>
          {visibleItems.length === 0 ? (
            <p className="empty-message">No items match your filters.</p>
          ) : (
            <ul className="item-grid">
              {visibleItems.map((item) => (
                // The item id ("3031") is unique, unlike the name, so it is the key.
                <li key={item.id}>
                  <ItemCard item={item} version={state.data.version} />
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

export default ItemsPage;
