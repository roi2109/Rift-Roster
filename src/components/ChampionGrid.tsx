import type { Champion } from "../types/champion";
import ChampionCard from "./ChampionCard";

interface ChampionGridProps {
  champions: Champion[];
  version: string;
}

function ChampionGrid({ champions, version }: ChampionGridProps) {
  if (champions.length === 0) {
    return <p className="empty-message">No champions to show.</p>;
  }

  return (
    <ul className="champion-grid">
      {champions.map((champion) => (
        // champion.id ("Ahri", "MonkeyKing") is unique and never changes, so it is a safe key.
        <li key={champion.id}>
          <ChampionCard champion={champion} version={version} />
        </li>
      ))}
    </ul>
  );
}

export default ChampionGrid;
