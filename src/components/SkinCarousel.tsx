import { useState } from "react";
import { championSplashUrl } from "../services/dataDragon";
import type { Skin } from "../types/champion";
import { wrapIndex } from "../utils/format";

interface SkinCarouselProps {
  championId: string;
  championName: string;
  skins: Skin[];
}

function SkinCarousel({ championId, championName, skins }: SkinCarouselProps) {
  // Only the carousel needs to know which skin is shown, so the state lives here.
  const [index, setIndex] = useState(0);

  if (skins.length === 0) {
    return null;
  }

  const skin = skins[index];
  // The API calls the base skin "default"; showing the champion's name reads better.
  const skinName = skin.num === 0 ? championName : skin.name;

  function step(direction: number) {
    setIndex((current) => wrapIndex(current + direction, skins.length));
  }

  return (
    <div className="skin-carousel">
      <div className="skin-carousel__stage">
        <button
          type="button"
          className="skin-carousel__arrow skin-carousel__arrow--prev"
          onClick={() => step(-1)}
          aria-label="Previous skin"
        >
          ‹
        </button>
        <img
          className="skin-carousel__image"
          src={championSplashUrl(championId, skin.num)}
          alt={skinName}
        />
        <button
          type="button"
          className="skin-carousel__arrow skin-carousel__arrow--next"
          onClick={() => step(1)}
          aria-label="Next skin"
        >
          ›
        </button>
      </div>
      <p className="skin-carousel__caption">
        <strong>{skinName}</strong>
        <span>
          {index + 1} / {skins.length}
        </span>
      </p>
      <ul className="skin-carousel__dots">
        {skins.map((dotSkin, dotIndex) => (
          <li key={dotSkin.id}>
            <button
              type="button"
              className={dotIndex === index ? "skin-carousel__dot is-active" : "skin-carousel__dot"}
              onClick={() => setIndex(dotIndex)}
              aria-label={dotSkin.num === 0 ? championName : dotSkin.name}
              aria-current={dotIndex === index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SkinCarousel;
