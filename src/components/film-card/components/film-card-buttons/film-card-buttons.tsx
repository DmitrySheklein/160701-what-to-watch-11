import { Link, useNavigate } from 'react-router-dom';
import { AuthStatus, RouteName } from 'src/const';
import { useAppSelector } from 'src/hooks';
import { getAuthorizationStatus } from 'src/store/user-process/selectors';
import { TFilmId } from 'src/types/films';
import MyListButton from './mylist-button/mylist-button';

type TFilmCardButtons = {
  id: TFilmId;
};

const FilmCardButtons = ({ id }: TFilmCardButtons) => {
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={() => {
          navigate(`${RouteName.Player}/${id}`);
        }}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>
      <MyListButton id={id} withText />
      {isAuth && (
        <Link
          className="btn film-card__button"
          to={`/${RouteName.Films}/${id}/${RouteName.Review}`}
        >
          Add review
        </Link>
      )}
    </div>
  );
};

export default FilmCardButtons;
