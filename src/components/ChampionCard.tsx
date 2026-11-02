import { Link } from "react-router-dom";
import { championIconUrl } from "../services/dataDragon";
import type { Champion } from "../types/champion";

interface ChampionCardProps {
  champion: Champion;
  version: string;
}

function ChampionCard({ champion, version }: ChampionCardProps) {
  return (
    <Link to={`/champions/${champion.id}`} className="champion-card">
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
  );
}

export default ChampionCard;
