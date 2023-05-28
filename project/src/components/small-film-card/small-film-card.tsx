import { Link } from 'react-router-dom';
import { RouteName } from 'src/const';
import { TFilmCard } from 'src/types/films';
import MyListButton from '../film-card/components/film-card-buttons/mylist-button/mylist-button';
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
      <MyListButton className="small-film-card__mylist" id={id} min />
    </article>
  );
};

export default SmallFilmCard;
