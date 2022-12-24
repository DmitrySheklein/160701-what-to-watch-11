import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader/loader';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchCommentsFilmAction } from 'src/store/api-actions';
import { getComments, getCommentsLoading } from 'src/store/films-process/selectors';
import { TFilm, TFilmComment } from 'src/types/films';
import { HumanizeDate } from 'src/utils/date';
import { adjustColor } from 'src/utils/main';

type TCommentList = {
  comments: TFilmComment[];
backgroundColor: string;
}

const CommentList = ({comments, backgroundColor}: TCommentList) => {
  const getReviews = (filterFunc: (elem: unknown, i: number) => boolean | number) =>
    comments.filter(filterFunc).map((review) => {
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
    <>
      <div className="film-card__reviews-col">{getReviews((_, i) => !(i % 2))}</div>
      <div className="film-card__reviews-col">{getReviews((_, i) => i % 2)}</div>
    </>
  );
};

const getIdsHash = (arr: {id: number | string }[]) => arr.map(({id}) => id).join();

const CommentListMemo = memo(CommentList, (prev, next) => getIdsHash(prev.comments) === getIdsHash(next.comments));

const ReviewsTab = ({ film: { backgroundColor } }: { film: TFilm }) => {
  const dispatch = useAppDispatch();
  const { id: currentFilmId } = useParams();

  useEffect(() => {
    if (currentFilmId) {
      dispatch(fetchCommentsFilmAction(currentFilmId));
    }
  }, [currentFilmId, dispatch]);

  const currentFilmComments = useAppSelector(getComments);
  const isCommentsLoading = useAppSelector(getCommentsLoading);

  return (
    <div className="film-card__reviews film-card__row">
      {isCommentsLoading ? (
        <Loader isTransparent />
      ) : (
        <CommentListMemo comments={currentFilmComments} backgroundColor={backgroundColor} />
      )}
    </div>
  );
};

export default ReviewsTab;
