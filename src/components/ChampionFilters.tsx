import type { ChampionRole } from "../types/champion";
import type { ChampionFilter } from "../utils/filters";

type RoleOption = ChampionRole | "All";

const ROLE_OPTIONS: RoleOption[] = ["All", "Assassin", "Fighter", "Mage", "Marksman", "Support", "Tank"];

interface ChampionFiltersProps {
  filter: ChampionFilter;
  onChange: (filter: ChampionFilter) => void;
}

/** Controlled form: the filter state lives in the parent page, this component only displays and reports changes. */
function ChampionFilters({ filter, onChange }: ChampionFiltersProps) {
  function handleRoleChange(value: string) {
    // <select> gives back a plain string; find() turns it back into a typed RoleOption without a cast.
    const role = ROLE_OPTIONS.find((option) => option === value);
    if (role !== undefined) {
      onChange({ ...filter, role });
    }
  }

  return (
    <div className="filters">
      <label className="filters__field">
        <span>Search</span>
        <input
          type="search"
          placeholder="Champion name…"
          value={filter.query}
          onChange={(event) => onChange({ ...filter, query: event.target.value })}
        />
      </label>
      <label className="filters__field">
        <span>Role</span>
        <select value={filter.role} onChange={(event) => handleRoleChange(event.target.value)}>
          {ROLE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option === "All" ? "All roles" : option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default ChampionFilters;
