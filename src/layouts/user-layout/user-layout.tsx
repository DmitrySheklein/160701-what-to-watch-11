import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/footer/footer';
import Header from 'src/components/header/header';

import { useAppSelector } from 'src/hooks';
import useCurrentLocation from 'src/hooks/location-path';
import { getFavoriteFilms } from 'src/store/films-process/selectors';

const UserLayout = () => {
  const { isLoginPage, isMylistPage } = useCurrentLocation();
  const favoriteFilms = useAppSelector(getFavoriteFilms);

  const PageTitle = ({ children }: PropsWithChildren) => (
    <h1 className="page-title user-page__title">{children}</h1>
  );

  return (
    <div className="user-page">
      <Header className="user-page__head" withUserBlock={isMylistPage}>
        {isLoginPage && <PageTitle>Sign in</PageTitle>}
        {isMylistPage && (
          <PageTitle>
            My list <span className="user-page__film-count">{favoriteFilms.length}</span>
          </PageTitle>
        )}
      </Header>
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserLayout;
