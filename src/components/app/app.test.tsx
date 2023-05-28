import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthStatus, NameSpace, RouteName } from 'src/const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsArray } from 'src/utils/mocks';
import thunk from 'redux-thunk';
import { TabsNames } from '../film-card/film-card';
import {
  initialState as userState,
  TInitialState as TUserState,
} from 'src/store/user-process/user-process';
import {
  initialState as filmsState,
  TInitialState as TFilmsState,
} from 'src/store/films-process/films-process';
import { PropsWithChildren } from 'react';

const mockStore = configureMockStore([thunk]);
const fakeAllFilms = makeFakeFilmsArray();
const [fakeFilm] = fakeAllFilms;

export const mockFilms = {
  [NameSpace.Films]: {
    ...filmsState,
    films: {
      ...filmsState.films,
      all: fakeAllFilms,
      currentFilm: fakeFilm,
    },
  } as TFilmsState,
};
export const storeNoAuth = mockStore({
  ...mockFilms,
  [NameSpace.User]: {
    ...userState,
    authorizationStatus: AuthStatus.NoAuth,
  } as TUserState,
});

export const storeAuth = mockStore({
  ...mockFilms,
  [NameSpace.User]: {
    ...userState,
    authorizationStatus: AuthStatus.Auth,
  } as TUserState,
});

const history = createMemoryHistory();

type TFakeAppTemplate = PropsWithChildren & {
  storeType: AuthStatus;
};
export const FakeAppTemplate = ({ children, storeType }: TFakeAppTemplate) => (
  <Provider store={storeType === AuthStatus.NoAuth ? storeNoAuth : storeAuth}>
    <HistoryRouter history={history}>{children}</HistoryRouter>
  </Provider>
);
const fakeApp = (storeType = AuthStatus.NoAuth) => (
  <FakeAppTemplate storeType={storeType}>
    <App />
  </FakeAppTemplate>
);

describe('Application Routing', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
    window.scrollTo = jest.fn();
  });
  it(`should render "index page" when user navigate to "${AppRoute.Root}"`, () => {
    history.push(AppRoute.Root);
    render(fakeApp());
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });
  it(`should render "AuthScreen" when user navigate to "${AppRoute.Login}"`, () => {
    history.push(AppRoute.Login);

    render(fakeApp());

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  const MOVIE_ROUTE = `/${RouteName.Films}/${fakeFilm.id}}`;
  it(`should render "MovieScreen" when user navigate to "${MOVIE_ROUTE}"`, () => {
    history.push(MOVIE_ROUTE);

    render(fakeApp());
    expect(screen.getByText(TabsNames.Overview)).toBeInTheDocument();
  });

  const PLAYER_ROUTE = `/${RouteName.Player}/${fakeFilm.id}`;
  it(`should render "PlayerScreen" when user navigate to "${PLAYER_ROUTE}"`, () => {
    history.push(PLAYER_ROUTE);
    render(fakeApp());
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });
  it(`should render "Error404Screen" when user navigate to "${AppRoute.ErrorPage}`, () => {
    history.push(AppRoute.ErrorPage);
    render(fakeApp());

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
  it(`should render "MyListScreen" when user navigate to "${AppRoute.MyList}, when user ${AuthStatus.Auth}`, () => {
    history.push(AppRoute.MyList);

    render(fakeApp(AuthStatus.Auth));
    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });
  it(`should NOT render "MyListScreen" when user navigate to "${AppRoute.MyList}, when user ${AuthStatus.NoAuth}`, () => {
    history.push(AppRoute.MyList);

    render(fakeApp(AuthStatus.NoAuth));
    expect(screen.queryByText('Catalog')).not.toBeInTheDocument();
    expect(screen.queryByText('My list')).not.toBeInTheDocument();
  });

  const ADD_REVIEW_ROUTE = `/${RouteName.Films}/${fakeFilm.id}/${RouteName.Review}`;
  it(`should render "AddReviewScreen" when user navigate to "${ADD_REVIEW_ROUTE}", when user ${AuthStatus.Auth}`, () => {
    history.push(ADD_REVIEW_ROUTE);

    render(fakeApp(AuthStatus.Auth));
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
  });
  it(`should NOT render "AddReviewScreen" when user navigate to "${ADD_REVIEW_ROUTE}, when user ${AuthStatus.NoAuth}"`, () => {
    history.push(ADD_REVIEW_ROUTE);

    render(fakeApp(AuthStatus.NoAuth));

    expect(screen.queryByPlaceholderText(/Review text/i)).not.toBeInTheDocument();
    expect(screen.queryByText(fakeFilm.name)).not.toBeInTheDocument();
    expect(screen.queryByText('Add review')).not.toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp());

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
