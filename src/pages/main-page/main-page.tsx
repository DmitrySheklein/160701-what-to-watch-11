import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import FilmsList from 'src/components/films-list/films-list';
import GenresList from 'src/components/genres-list/genres-list';
import { DEFAULT_NAME_GENRE, PageTitles } from 'src/const';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setCurrentGenre } from 'src/store/films-process/films-process';
import { getCurrentGenre } from 'src/store/films-process/selectors';
import { TFilm } from 'src/types/films';

type TMainPage = {
  films: TFilm[];
};

const MainPage = ({ films }: TMainPage) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const hash = decodeURI(location.hash.slice(1));
  const stateGenre = useAppSelector(getCurrentGenre);
  const sortedFilms = films.filter(
    (film) => stateGenre === DEFAULT_NAME_GENRE || stateGenre === film.genre,
  );

  useEffect(() => {
    const isCorrectHash =
      hash && hash !== DEFAULT_NAME_GENRE && films.some((film) => film.genre === hash);
    if (isCorrectHash) {
      dispatch(setCurrentGenre(hash));
    }
    return () => {
      dispatch(setCurrentGenre(DEFAULT_NAME_GENRE));
    };
  }, [dispatch, hash, films]);

  return (
    <>
      <Helmet>
        <title>{PageTitles.Root}</title>
      </Helmet>
      {!films.length && <h1 className="page-title">Фильмы не найдены</h1>}

      {!!films.length && (
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList films={films} />

          <FilmsList films={sortedFilms} maxFilms={8} withWhowMoreBtn />
        </section>
      )}
    </>
  );
};

export default MainPage;
