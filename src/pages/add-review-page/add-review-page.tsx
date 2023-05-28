import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';
import { getFilms } from 'src/store/films-process/selectors';
import { AppRoute, PageTitles } from 'src/const';
import { useAppSelector } from 'src/hooks';

const AddReviewPage = () => {
  const films = useAppSelector(getFilms);
  const { id: currentFilmId } = useParams();
  const currentFilm = films.find((film) => film.id === Number(currentFilmId));

  if (!currentFilm) {
    return <Navigate to={AppRoute.ErrorPage} />;
  }

  return (
    <Helmet>
      <title>{PageTitles.AddReview}</title>
    </Helmet>
  );
};
export default AddReviewPage;
