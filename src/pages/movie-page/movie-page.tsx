import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import FilmsList from 'src/components/films-list/films-list';
import Loader from 'src/components/loader/loader';
import { AppRoute, PageTitles } from 'src/const';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchSimilarFilmsAction } from 'src/store/api-actions';
import {
  getCurrentFilm,
  getSimilarFilms,
  getSimilarLoading,
} from 'src/store/films-process/selectors';

const MoviePage = () => {
  const isSimilarFilmsLoading = useAppSelector(getSimilarLoading);
  const similarFilms = useAppSelector(getSimilarFilms);
  const currentFilm = useAppSelector(getCurrentFilm);
  const { id: currentFilmId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentFilmId && currentFilm) {
      dispatch(fetchSimilarFilmsAction(currentFilmId));
    }
  }, [currentFilmId, currentFilm, dispatch]);

  if (!currentFilmId) {
    return <Navigate to={AppRoute.ErrorPage} />;
  }
  const similarFilmsFiltered = similarFilms.filter((film) => film.id !== Number(currentFilmId));

  return (
    <>
      <Helmet>
        <title>{`${PageTitles.Film} ${currentFilm ? `- ${currentFilm.name}` : ''}`}</title>
      </Helmet>

      {isSimilarFilmsLoading && <Loader />}
      {similarFilmsFiltered.length ? (
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmsList films={similarFilmsFiltered} maxFilms={4} />
        </section>
      ) : null}
    </>
  );
};

export default MoviePage;
