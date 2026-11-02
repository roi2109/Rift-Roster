import { Link } from "react-router-dom";
import { championIconUrl } from "../services/dataDragon";
import type { Champion } from "../types/champion";
import FavoriteButton from "./FavoriteButton";

interface ChampionCardProps {
  champion: Champion;
  version: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function ChampionCard({ champion, version, isFavorite, onToggleFavorite }: ChampionCardProps) {
  return (
    // The star sits next to the link, not inside it: a button inside a link is invalid HTML
    // and a click on the star would also open the champion page.
    <div className="champion-card">
      <Link to={`/champions/${champion.id}`} className="champion-card__link">
        <img
          className="champion-card__icon"
          src={championIconUrl(version, champion.image.full)}
          alt=""
          width={120}
          height={120}
          loading="lazy"
        />
        <span className="champion-card__name">{champion.name}</span>
        <span className="champion-card__title">{champion.title}</span>
        <ul className="champion-card__roles">
          {champion.tags.map((role) => (
            <li key={role} className="role-tag">
              {role}
            </li>
          ))}
        </ul>
      </Link>
      <div className="champion-card__favorite">
        <FavoriteButton
          active={isFavorite}
          championName={champion.name}
          onToggle={() => onToggleFavorite(champion.id)}
        />
      </div>
    </div>
  );
}

export default ChampionCard;
