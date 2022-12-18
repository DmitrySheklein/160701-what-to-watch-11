import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from 'src/components/loader/loader';
import { RouteName } from 'src/const';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchCommentsFilmAction } from 'src/store/api-actions';
import { getComments, getCommentsLoading } from 'src/store/films-process/selectors';
import { TFilm } from 'src/types/films';
import { HumanizeDate } from 'src/utils/date';
import { adjustColor } from 'src/utils/main';

const ReviewsTab = ({ film: { backgroundColor } }: { film: TFilm }) => {
  const dispatch = useAppDispatch();
  const { id: currentFilmId } = useParams();

  useEffect(() => {
    if (currentFilmId) {
      dispatch(fetchCommentsFilmAction(currentFilmId));
    }
  }, [currentFilmId, dispatch]);

  const currentFilmComments = useAppSelector(getComments);
  const commentsCount = currentFilmComments.length;
  const isCommentsLoading = useAppSelector(getCommentsLoading);
  const getReviews = (filterFunc: (elem: unknown, i: number) => boolean | number) =>
    currentFilmComments.filter(filterFunc).map((review) => {
      const {
        id,
        comment,
        rating,
        date,
        user: { name },
      } = review;

      return (
        <div className="review" key={id} style={{ borderColor: adjustColor(backgroundColor, 10) }}>
          <blockquote className="review__quote">
            <p className="review__text">{comment}</p>

            <footer className="review__details">
              <cite className="review__author">{name}</cite>
              <time className="review__date" dateTime={HumanizeDate.CommentDateTime(date)}>
                {HumanizeDate.Comment(date)}
              </time>
            </footer>
          </blockquote>

          <div className="review__rating">{rating}</div>
        </div>
      );
    });
  return (
    <div className="film-card__reviews film-card__row">
      {isCommentsLoading ? (
        <Loader isTransparent />
      ) : (
        <>
          {commentsCount ? (
            <>
              <div className="film-card__reviews-col">{getReviews((_, i) => !(i % 2))}</div>
              <div className="film-card__reviews-col">{getReviews((_, i) => i % 2)}</div>
            </>
          ) : (
            <p className="film-card__reviews-text">
              There are no reviews yet.
              {currentFilmId && (
                <>
                  You can leave yours{' '}
                  <Link to={`/${RouteName.Films}/${currentFilmId}/${RouteName.Review}`}>here</Link>.
                </>
              )}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsTab;
