import type { Champion } from "../types/champion";
import ChampionCard from "./ChampionCard";

interface ChampionGridProps {
  champions: Champion[];
  version: string;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  emptyMessage?: string;
}

function ChampionGrid({
  champions,
  version,
  isFavorite,
  onToggleFavorite,
  emptyMessage = "No champions match your search.",
}: ChampionGridProps) {
  if (champions.length === 0) {
    return <p className="empty-message">{emptyMessage}</p>;
  }

  return (
    <ul className="champion-grid">
      {champions.map((champion) => (
        // champion.id ("Ahri", "MonkeyKing") is unique and never changes, so it is a safe key.
        <li key={champion.id}>
          <ChampionCard
            champion={champion}
            version={version}
            isFavorite={isFavorite(champion.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </li>
      ))}
    </ul>
  );
}

export default ChampionGrid;
