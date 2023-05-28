import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from 'src/const';
import { toast } from 'react-toastify';

type TPrivateRoute = {
  authStatus: AuthStatus;
  children: JSX.Element;
};

const PrivateRoute = (props: TPrivateRoute) => {
  const { authStatus, children } = props;
  const isAuth = authStatus === AuthStatus.Auth;

  if (!isAuth) {
    toast.warn('You are not logged in or you do not have permission to this page.');
  }

  return isAuth ? children : <Navigate to={AppRoute.Login} />;
};

export default PrivateRoute;
