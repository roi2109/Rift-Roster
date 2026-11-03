import type { ItemFilter, ItemSort } from "../utils/filters";

interface Option<T extends string> {
  value: T;
  label: string;
}

// API tag → readable name. Only the tags a player would actually filter by are offered.
const TAG_OPTIONS: Option<string>[] = [
  { value: "All", label: "All items" },
  { value: "Damage", label: "Attack Damage" },
  { value: "SpellDamage", label: "Ability Power" },
  { value: "AttackSpeed", label: "Attack Speed" },
  { value: "CriticalStrike", label: "Critical Strike" },
  { value: "OnHit", label: "On-Hit" },
  { value: "LifeSteal", label: "Life Steal" },
  { value: "ArmorPenetration", label: "Armor Penetration" },
  { value: "MagicPenetration", label: "Magic Penetration" },
  { value: "AbilityHaste", label: "Ability Haste" },
  { value: "Health", label: "Health" },
  { value: "Armor", label: "Armor" },
  { value: "SpellBlock", label: "Magic Resist" },
  { value: "Mana", label: "Mana" },
  { value: "Boots", label: "Boots" },
  { value: "Vision", label: "Vision" },
  { value: "Consumable", label: "Consumables" },
];

const SORT_OPTIONS: Option<ItemSort>[] = [
  { value: "name", label: "Name (A–Z)" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

interface ItemFiltersProps {
  filter: ItemFilter;
  sort: ItemSort;
  onFilterChange: (filter: ItemFilter) => void;
  onSortChange: (sort: ItemSort) => void;
}

/** Controlled form: the page owns the filter and sort state, this component only shows and reports changes. */
function ItemFilters({ filter, sort, onFilterChange, onSortChange }: ItemFiltersProps) {
  function handleSortChange(value: string) {
    // Same idea as the role dropdown: find() gives back a typed ItemSort without a cast.
    const option = SORT_OPTIONS.find((current) => current.value === value);
    if (option !== undefined) {
      onSortChange(option.value);
    }
  }

  return (
    <div className="filters">
      <label className="filters__field">
        <span>Search</span>
        <input
          type="search"
          placeholder="Item name…"
          value={filter.query}
          onChange={(event) => onFilterChange({ ...filter, query: event.target.value })}
        />
      </label>
      <label className="filters__field">
        <span>Stat</span>
        <select
          value={filter.tag}
          onChange={(event) => onFilterChange({ ...filter, tag: event.target.value })}
        >
          {TAG_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className="filters__field">
        <span>Sort by</span>
        <select value={sort} onChange={(event) => handleSortChange(event.target.value)}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ItemFilters;
