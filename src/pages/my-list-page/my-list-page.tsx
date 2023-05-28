import { Helmet } from 'react-helmet-async';
import FilmsList from 'src/components/films-list/films-list';
import { PageTitles } from 'src/const';
import { useAppSelector } from 'src/hooks';
import { getFavoriteFilms } from 'src/store/films-process/selectors';

const MyListPage = () => {
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  return (
    <>
      <Helmet>
        <title>{PageTitles.MyList}</title>
      </Helmet>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms} />
      </section>
    </>
  );
};

export default MyListPage;
