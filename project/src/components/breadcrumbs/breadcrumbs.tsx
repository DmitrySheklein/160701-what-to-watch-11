import { Link } from 'react-router-dom';
import { RouteName } from 'src/const';
import { TFilm } from 'src/types/films';

type TBreadcrumbs = {
  film: TFilm;
};

const Breadcrumbs = ({film}: TBreadcrumbs) => {
  if (!film) {
    return null;
  }

  const { id, name } = film;
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
