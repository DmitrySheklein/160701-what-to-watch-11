import { useLocation } from 'react-router-dom';
import { AppRoute, RouteName } from 'src/const';

const useCurrentLocation = () => {
  const { pathname } = useLocation();
  const isAddReviewPage = pathname.includes(RouteName.Review);
  const isMoviePage = pathname.includes(RouteName.Films) && !isAddReviewPage;
  const isRootPage = pathname === AppRoute.Root;
  const isLoginPage = pathname === AppRoute.Login;
  const isMylistPage = pathname === AppRoute.MyList;

  return {
    isRootPage,
    isAddReviewPage,
    isMoviePage,
    isLoginPage,
    isMylistPage,
  };
};

export default useCurrentLocation;
