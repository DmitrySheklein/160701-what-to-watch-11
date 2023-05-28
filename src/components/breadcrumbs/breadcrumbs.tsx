import { Link } from 'react-router-dom';
import { RouteName } from 'src/const';
import { useAppSelector } from 'src/hooks';
import { getCurrentFilm } from 'src/store/films-process/selectors';

const Breadcrumbs = () => {
  const currenFilm = useAppSelector(getCurrentFilm);

  if (!currenFilm) {
    return null;
  }
  const { id, name } = currenFilm;
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to={`${RouteName.Films}/${id}`}>
            {name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <span className="breadcrumbs__link">Add review</span>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
