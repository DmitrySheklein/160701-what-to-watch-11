import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RouteName } from 'src/const';
import { TFilmCard } from 'src/types/films';
import PlayerPreview from '../player-preveiw/player-preview';

const SmallFilmCard = ({ film, playing, onMouseOver, onMouseLeave }: TFilmCard) => {
  const { id, name, posterImage, previewVideoLink } = film;

  const ImageSize = {
    Width: 280,
    Height: 175,
  } as const;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={() => onMouseOver(id)}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/${RouteName.Films}/${id}`} className="small-film-card__link">
        <div className="small-film-card__image">
          <PlayerPreview
            poster={posterImage}
            src={previewVideoLink}
            width={ImageSize.Width}
            height={ImageSize.Height}
            playing={playing}
            loop
            muted
          />
        </div>
        <h3 className="small-film-card__title">
          <span>{name}</span>
        </h3>
      </Link>
    </article>
  );
};

export default memo(SmallFilmCard, (prev, next) => prev.playing === next.playing && prev.film.id === next.film.id);
