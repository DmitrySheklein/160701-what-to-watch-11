type TGenresList = {
  genres: string[];
  onChange: (genre: string) => void;
  activeGenre: string;
};

const GenresList = ({ genres, activeGenre, onChange }: TGenresList) => (
  <ul className="catalog__genres-list">
    {genres.map((item) => (
      <li
        className={`catalog__genres-item ${
          item === activeGenre ? 'catalog__genres-item--active' : ''
        }`}
        key={item}
        onClick={() => onChange(item)}
      >
        <span className="catalog__genres-link">{item}</span>
      </li>
    ))}
  </ul>
);

export default GenresList;
