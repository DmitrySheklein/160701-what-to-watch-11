import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ErrorScreen from 'src/components/error-screen/error-screen';
import Player from 'src/components/player/player';
import { PageTitles } from 'src/const';
import { TFilm } from 'src/types/films';

type TPlayerPage = {
  films: TFilm[];
};

const PlayerPage = ({ films }: TPlayerPage) => {
  const { id: currentFilmId } = useParams();
  const currentFilm = films.find((film) => film.id === Number(currentFilmId));

  if (!currentFilm) {
    return <ErrorScreen statusCode={404} />;
  }

  return (
    <>
      <Helmet>
        <title>{PageTitles.Player}</title>
      </Helmet>

      <Player currentFilm={currentFilm} />
    </>
  );
};

export default PlayerPage;
