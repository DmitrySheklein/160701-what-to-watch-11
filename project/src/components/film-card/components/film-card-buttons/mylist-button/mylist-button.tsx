import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from 'src/const';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { changeFavoriteFilmAction } from 'src/store/api-actions';
import { getFavoriteFilms } from 'src/store/films-process/selectors';
import { getAuthorizationStatus } from 'src/store/user-process/selectors';
import { TFilmId } from 'src/types/films';

type TMyListButton = {
  id: TFilmId;
  withText?: boolean;
  min?: boolean;
  className?: string;
};
const MyListButton = ({ id, withText, min, className = '' }: TMyListButton) => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const favoriteFilmsCount = favoriteFilms.length;
  const isFavorite = favoriteFilms.find((film) => film.id === id);

  return (
    <button
      onClick={() => {
        if (isAuth) {
          dispatch(
            changeFavoriteFilmAction({
              filmId: id,
              status: Number(!isFavorite),
            }),
          );
        } else {
          navigate(AppRoute.Login);
        }
      }}
      className={`btn btn--list film-card__button ${className} ${min ? 'btn--list-min' : ''}`}
      type="button"
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`#${isFavorite ? 'in-list' : 'add'}`}></use>
      </svg>
      {withText && (
        <>
          <span>My list</span>
          {!!favoriteFilmsCount && <span className="film-card__count">{favoriteFilmsCount}</span>}
        </>
      )}
    </button>
  );
};

export default MyListButton;
