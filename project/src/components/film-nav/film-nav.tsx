type TFilmNav = {
  data: string[];
  current: string;
  onChange: (item: string) => void;
};

const FilmNav = ({ data, current, onChange }: TFilmNav) => (
  <nav className="film-nav film-card__nav">
    <ul className="film-nav__list">
      {data.map((item) => {
        const isCurrent = current === item;
        //TODO отображение при нусуществующем хеше
        //TODO использовать classNames
        return (
          <li key={item} className={`film-nav__item ${isCurrent ? 'film-nav__item--active' : ''}`}>
            <div onClick={() => onChange(item)} className="film-nav__link">
              {item}
            </div>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default FilmNav;
