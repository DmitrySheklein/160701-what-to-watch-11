type TFilmCardPoster = {
  isBig?: boolean;
  isSmall?: boolean;
  name: string;
  posterImage: string;
};

const FilmCardPoster = ({ isBig, isSmall, name, posterImage }: TFilmCardPoster) => (
  <div
    className={`film-card__poster
      ${isBig ? 'film-card__poster--big' : ''}
      ${isSmall ? 'film-card__poster--small' : ''}`}
  >
    <img src={posterImage} width="218" height="327" alt={name} />
  </div>
);

export default FilmCardPoster;
