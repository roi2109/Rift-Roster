import { championSplashUrl } from "../services/dataDragon";
import type { Champion } from "../types/champion";

interface ChampionHeaderProps {
  champion: Champion;
}

function ChampionHeader({ champion }: ChampionHeaderProps) {
  return (
    <header className="champion-header">
      <img
        className="champion-header__splash"
        src={championSplashUrl(champion.id, 0)}
        alt={`${champion.name} splash art`}
      />
      <div className="champion-header__text">
        <h1 className="champion-header__name">{champion.name}</h1>
        <p className="champion-header__title">{champion.title}</p>
        <ul className="champion-card__roles">
          {champion.tags.map((role) => (
            <li key={role} className="role-tag">
              {role}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default ChampionHeader;
