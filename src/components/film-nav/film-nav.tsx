import { Link } from 'react-router-dom';

type TFilmNav = {
  data: string[];
  current: string;
};

const FilmNav = ({ data, current }: TFilmNav) => (
  <nav className="film-nav film-card__nav">
    <ul className="film-nav__list">
      {data.map((item) => {
        const isCurrent = current === item;
        //TODO отображение при нусуществующем хеше
        //TODO использовать classNames
        return (
          <li key={item} className={`film-nav__item ${isCurrent ? 'film-nav__item--active' : ''}`}>
            <Link to={`#${item}`} className="film-nav__link">
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default FilmNav;
