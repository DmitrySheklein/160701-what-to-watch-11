import { memo, PropsWithChildren, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { TFilm } from 'src/types/films';
import { adjustColor } from 'src/utils/main';
import AddReviewForm from '../add-review-form/add-review-form';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import FilmNav from '../film-nav/film-nav';
import Header from '../header/header';
import FilmCardButtons from './components/film-card-buttons/film-card-buttons';
import FilmCardPoster from './components/film-card-poster/film-card-poster';
import FilmCardData from './components/film-card-data/film-card-data';
import FilmCardNavContent from './components/film-card-nav-content/film-card-nav-content';
import useCurrentLocation from 'src/hooks/location-path';
import { AppRoute } from 'src/const';
import cn from 'classnames';

type TFilmCard = {
  films: TFilm[];
};

const FilmCardHeroWrap = ({ children, isMoviePage }: PropsWithChildren & {isMoviePage: boolean}) =>
  isMoviePage ? <div className="film-card__hero">{children}</div> : <>{children}</>;

const FilmCardHeaderWrap = ({ children, isAddReviewPage }: PropsWithChildren & {isAddReviewPage: boolean}) =>
  isAddReviewPage ? <div className="film-card__header">{children}</div> : <>{children}</>;

const FilmCardWrap = ({
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) => (
  <div className={`film-card__wrap ${className}`}>{children}</div>
);

const FilmCardDescr = ({ children }: PropsWithChildren) => (
  <div className="film-card__desc">{children}</div>
);

const FilmCardInfo = ({ children }: PropsWithChildren) => (
  <div className="film-card__info">{children}</div>
);

type TFilmCardContentMovie = {
  film: TFilm;
}

const FilmCardContentMovie = ({film}: TFilmCardContentMovie) => {
  const [activeTab, setActiveTab] = useState<string>(TabsNames.Overview);
  return (
    <>
      <FilmNav data={Object.values(TabsNames)} onChange={setActiveTab} current={activeTab} />
      <FilmCardNavContent current={activeTab} film={film} />
    </>
  );
};

type TFilmCardContentRoot = {
  film: TFilm;
}

const FilmCardContentRoot = ({film}: TFilmCardContentRoot) => {
  const {name, genre, released, id} = film;
  return (
    <>
      <FilmCardData name={name} genre={genre} released={released} />
      <FilmCardButtons id={id} withReviewButton={false} />
    </>
  );
};

type TFilmCardContent = {
  film: TFilm;
  isMoviePage: boolean;
  isRootPage: boolean;
}

const FilmCardContent = ({ film, isRootPage, isMoviePage}: TFilmCardContent) => {
  const {posterImage, name} = film;
  return (
    <FilmCardWrap className={cn({ 'film-card__translate-top': isMoviePage })}>
      <FilmCardInfo>
        <FilmCardPoster posterImage={posterImage} name={name} isBig={isMoviePage} />
        <FilmCardDescr>
          {isMoviePage && <FilmCardContentMovie film={film} />}
          {isRootPage && <FilmCardContentRoot film={film} />}
        </FilmCardDescr>
      </FilmCardInfo>
    </FilmCardWrap>
  );
};

type TFilmCardHeader = {
  film: TFilm;
  isAddReviewPage: boolean;
  isMoviePage: boolean;
}

function FilmCardHeader({ film, isAddReviewPage, isMoviePage }: TFilmCardHeader) {
  const {backgroundImage, name, posterImage, genre, id, released } = film;
  return (
    <FilmCardHeroWrap isMoviePage={isMoviePage}>
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header>{isAddReviewPage && <Breadcrumbs film={film} />}</Header>
      {isAddReviewPage && <FilmCardPoster posterImage={posterImage} name={name} isSmall />}
      {isMoviePage && (
        <FilmCardWrap>
          <FilmCardDescr>
            <FilmCardData name={name} genre={genre} released={released} />
            <FilmCardButtons id={id} />
          </FilmCardDescr>
        </FilmCardWrap>
      )}

    </FilmCardHeroWrap>);
}

const FilmCardHeaderMemo = memo(FilmCardHeader, (prev, next) => prev.film.id === next.film.id);

const TabsNames = {
  Overview: 'Overview',
  Details: 'Details',
  Reviews: 'Reviews',
} as const;

const FilmCard = ({ films }: TFilmCard) => {
  const { isMoviePage, isAddReviewPage, isRootPage } = useCurrentLocation();
  const isFull = isMoviePage || isAddReviewPage;
  const { id: currentFilmId } = useParams();

  const activeFilm = (currentFilmId && films.find((film) => film.id === Number(currentFilmId))) || films[0];

  if (!activeFilm) {
    return <Navigate to={AppRoute.ErrorPage} />;
  }

  const { backgroundColor } = activeFilm;

  return (
    <section className={`film-card ${isFull ? 'film-card--full' : ''}`} style={{ backgroundColor }}>
      <FilmCardHeaderWrap isAddReviewPage={isAddReviewPage}>
        <FilmCardHeaderMemo film={activeFilm} isAddReviewPage={isAddReviewPage} isMoviePage={isMoviePage} />
        <FilmCardContent film={activeFilm} isRootPage={isRootPage} isMoviePage={isMoviePage} />
      </FilmCardHeaderWrap>

      {isAddReviewPage && <AddReviewForm backgroundColor={adjustColor(backgroundColor, 10)} />}
    </section>
  );
};

export { TabsNames };
export default FilmCard;
