import { itemIconUrl } from "../services/dataDragon";
import type { Item } from "../types/item";
import { stripHtml } from "../utils/format";

interface ItemCardProps {
  item: Item;
  version: string;
}

function ItemCard({ item, version }: ItemCardProps) {
  const description = stripHtml(item.description);

  return (
    <article className="item-card">
      <div className="item-card__top">
        <img
          className="item-card__icon"
          src={itemIconUrl(version, item.image.full)}
          alt=""
          width={48}
          height={48}
          loading="lazy"
        />
        <div>
          <h2 className="item-card__name">{item.name}</h2>
          {item.plaintext !== "" && <p className="item-card__plaintext">{item.plaintext}</p>}
        </div>
      </div>
      <dl className="item-card__gold">
        <div>
          <dt>Total</dt>
          <dd>{item.gold.total}g</dd>
        </div>
        <div>
          <dt>Base</dt>
          <dd>{item.gold.base}g</dd>
        </div>
        <div>
          <dt>Sell</dt>
          <dd>{item.gold.sell}g</dd>
        </div>
      </dl>
      {/* <details> is a built-in HTML toggle, so opening it needs no React state. */}
      {description !== "" && (
        <details className="item-card__details">
          <summary>Stats & effects</summary>
          <p className="item-card__description">{description}</p>
        </details>
      )}
    </article>
  );
}

export default ItemCard;
