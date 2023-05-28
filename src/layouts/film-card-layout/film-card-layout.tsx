import { Outlet } from 'react-router-dom';
import FilmCard from 'src/components/film-card/film-card';
import Footer from 'src/components/footer/footer';
import useCurrentLocation from 'src/hooks/location-path';
import { TFilm } from 'src/types/films';

type TFilmCardLayout = {
  films: TFilm[];
};
const FilmCardLayout = ({ films }: TFilmCardLayout) => {
  const { isAddReviewPage } = useCurrentLocation();

  return (
    <>
      <FilmCard films={films} />
      {isAddReviewPage ? (
        <Outlet />
      ) : (
        <div className="page-content">
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
};

export default FilmCardLayout;
