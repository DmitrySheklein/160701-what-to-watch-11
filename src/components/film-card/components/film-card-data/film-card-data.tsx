type TFilmCardData = {
  name: string;
  genre: string;
  released: number;
};

const FilmCardData = ({ name, genre, released }: TFilmCardData) => (
  <>
    <h2 className="film-card__title">{name}</h2>
    <p className="film-card__meta">
      <span className="film-card__genre">{genre}</span>
      <span className="film-card__year">{released}</span>
    </p>
  </>
);

export default FilmCardData;
