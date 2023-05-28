const PUBLIC_URL = process.env.PUBLIC_URL;
const DEFAULT_NAME_GENRE = 'All genres';
const TIMEOUT_SHOW_ERROR = 2000;
const RouteName = {
  Player: 'player',
  Films: 'films',
  Review: 'review',
} as const;

const AppRoute = {
  Root: '/',
  Login: '/login',
  Player: `/${RouteName.Player}/:id`,
  Film: `/${RouteName.Films}/:id`,
  MyList: '/mylist',
  AddReview: `/${RouteName.Films}/:id/${RouteName.Review}`,
  ErrorPage: '/page404',
} as const;

enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
enum PageTitles {
  Root = 'Главная страница',
  Login = 'Логин',
  Player = 'Плеер',
  Film = 'Фильм',
  MyList = 'Избранное',
  AddReview = 'Добавить отзыв',
  Page404 = 'Страница не найдена',
}

enum APIRoute {
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
}

enum APIRouteName {
  Similar = 'similar',
}

enum NameSpace {
  User = 'USER',
  Films = 'FILMS',
}

export {
  PUBLIC_URL,
  TIMEOUT_SHOW_ERROR,
  DEFAULT_NAME_GENRE,
  RouteName,
  AppRoute,
  AuthStatus,
  PageTitles,
  APIRoute,
  APIRouteName,
  NameSpace,
};
