import { passiveIconUrl, spellIconUrl } from "../services/dataDragon";
import type { Passive, Skill } from "../types/champion";
import { formatRanks, stripHtml } from "../utils/format";

// The API always returns the four abilities in this order.
const SPELL_KEYS = ["Q", "W", "E", "R"];

interface SkillListProps {
  passive: Passive;
  spells: Skill[];
  version: string;
  /** Resource name for the cost line, e.g. "Mana" or "Energy". */
  resource: string;
}

function SkillList({ passive, spells, version, resource }: SkillListProps) {
  return (
    <ul className="skill-list">
      <li className="skill">
        <img
          className="skill__icon"
          src={passiveIconUrl(version, passive.image.full)}
          alt=""
          width={64}
          height={64}
        />
        <div>
          <h3 className="skill__name">
            <span className="skill__key">Passive</span> {passive.name}
          </h3>
          <p className="skill__description">{stripHtml(passive.description)}</p>
        </div>
      </li>
      {spells.map((spell, index) => {
        const cost = formatRanks(spell.cost);
        return (
          <li key={spell.id} className="skill">
            <img
              className="skill__icon"
              src={spellIconUrl(version, spell.image.full)}
              alt=""
              width={64}
              height={64}
            />
            <div>
              <h3 className="skill__name">
                <span className="skill__key">{SPELL_KEYS[index]}</span> {spell.name}
              </h3>
              <p className="skill__description">{stripHtml(spell.description)}</p>
              <p className="skill__meta">
                Cooldown: {formatRanks(spell.cooldown)}s
                {/* Some abilities cost nothing, so the cost line is only shown when there is one. */}
                {cost !== "" && cost !== "0" && ` · Cost: ${cost} ${resource}`}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SkillList;
