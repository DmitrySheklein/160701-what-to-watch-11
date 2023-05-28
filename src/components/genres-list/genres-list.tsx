import { Link, useLocation } from 'react-router-dom';
import { DEFAULT_NAME_GENRE } from 'src/const';
import { TFilm } from 'src/types/films';

type TGenresList = {
  films: TFilm[];
};

const GenresList = ({ films }: TGenresList) => {
  const location = useLocation();
  const hash = decodeURI(location.hash.slice(1));
  const MAX_FILMS_GENRES = 10;
  const filmsGenres = films.map((film) => film.genre);
  const genres = Array.from(new Set([DEFAULT_NAME_GENRE, ...filmsGenres])).slice(
    0,
    MAX_FILMS_GENRES,
  );
  const isDefault = !genres.includes(hash);

  return (
    <ul className="catalog__genres-list">
      {genres.map((item) => {
        const current = item === hash || (isDefault && item === DEFAULT_NAME_GENRE);

        return (
          <li
            className={`catalog__genres-item ${current ? 'catalog__genres-item--active' : ''}`}
            key={item}
          >
            {current ? (
              <span className="catalog__genres-link">{item}</span>
            ) : (
              <Link to={`#${item}`} className="catalog__genres-link">
                {item}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default GenresList;
