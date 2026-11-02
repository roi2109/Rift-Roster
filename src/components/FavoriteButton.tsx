interface FavoriteButtonProps {
  active: boolean;
  championName: string;
  onToggle: () => void;
}

function FavoriteButton({ active, championName, onToggle }: FavoriteButtonProps) {
  const label = active
    ? `Remove ${championName} from favorites`
    : `Add ${championName} to favorites`;

  return (
    <button
      type="button"
      className={active ? "favorite-button is-active" : "favorite-button"}
      onClick={onToggle}
      aria-pressed={active}
      aria-label={label}
      title={label}
    >
      {active ? "★" : "☆"}
    </button>
  );
}

export default FavoriteButton;
