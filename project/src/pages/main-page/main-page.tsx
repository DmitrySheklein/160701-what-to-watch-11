import { useCallback } from 'react';
// import { Helmet } from 'react-helmet-async';
import FilmsList from 'src/components/films-list/films-list';
import GenresList from 'src/components/genres-list/genres-list';
import { DEFAULT_NAME_GENRE } from 'src/const';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { setCurrentGenre } from 'src/store/films-process/films-process';
import { getCurrentGenre } from 'src/store/films-process/selectors';
import { TFilm } from 'src/types/films';

type TMainPage = {
  films: TFilm[];
};

const MAX_FILMS_GENRES = 10;

const MainPage = ({ films }: TMainPage) => {

  const dispatch = useAppDispatch();
  const stateGenre = useAppSelector(getCurrentGenre);

  const filmsGenres = films.map((film) => film.genre);
  const genres = Array.from(new Set([DEFAULT_NAME_GENRE, ...filmsGenres])).slice(
    0,
    MAX_FILMS_GENRES,
  );
  const activeGenre = genres.includes(stateGenre) ? stateGenre : genres[0];

  const sortedFilms = films.filter(
    (film) => stateGenre === DEFAULT_NAME_GENRE || stateGenre === film.genre,
  );

  const onGenreChange = useCallback(
    (genre: string) => {
      window.location.hash = `#${genre}`;
      dispatch(setCurrentGenre(genre));
    },
    [dispatch],
  );

  return (
    <>
      {!films.length && <h1 className="page-title">Фильмы не найдены</h1>}

      {!!films.length && (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} activeGenre={activeGenre} onChange={onGenreChange} />

          <FilmsList films={sortedFilms} />
        </section>
      )}
    </>
  );
};

export default MainPage;
