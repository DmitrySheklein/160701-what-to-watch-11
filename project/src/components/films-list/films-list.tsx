import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import SmallFilmCard from '../small-film-card/small-film-card';
import { TFilmsList } from 'src/types/films';
import ShowMoreBtn from 'src/components/show-more-btn/show-more-btn';

const FILM_COUNT_DEFAULT = 8;
const FILM_COUNT_PER_STEP = 4;

const FilmsList = ({ films }: TFilmsList) => {
  const [renderedFilmCount, setRenderedFilmCount] = useState(
    Math.min(FILM_COUNT_DEFAULT, films.length),
  );
  const withWhowMoreBtn = renderedFilmCount < films.length;

  useLayoutEffect(() => {
    setRenderedFilmCount(Math.min(FILM_COUNT_DEFAULT, films.length));
  }, [films]);

  const [activeFilmCard, setActiveFilmCard] = useState<number | null>(null);
  const timer = useRef<NodeJS.Timeout>();

  const cardMouseOverHandler = useCallback((id: number) => {
    timer.current = setTimeout(() => {
      setActiveFilmCard(id);
    }, 1000);
  }, []);

  const cardMouseLeaveHandler = useCallback(() => {
    setActiveFilmCard(null);
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const clickShowMoreBtnHandler = useCallback(() =>
    setRenderedFilmCount(Math.min(films.length, renderedFilmCount + FILM_COUNT_PER_STEP))
  , [films, renderedFilmCount]);

  return (
    <>
      <div className="catalog__films-list">
        {films.slice(0, renderedFilmCount).map((film) => (
          <SmallFilmCard
            playing={film.id === activeFilmCard}
            key={film.id}
            onMouseOver={cardMouseOverHandler}
            film={film}
            onMouseLeave={cardMouseLeaveHandler}
          />
        ))}
      </div>
      {withWhowMoreBtn && <ShowMoreBtn onClick={clickShowMoreBtnHandler} />}
    </>
  );
};

export default FilmsList;
