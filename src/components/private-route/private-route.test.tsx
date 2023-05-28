import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import PrivateRoute from './private-route';
import { AppRoute, AuthStatus, NameSpace } from 'src/const';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    history.push('/private');
  });
  const fakeApp = (store: MockStore, authStatus: AuthStatus) => (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path={AppRoute.Login} element={<h1>Public Route</h1>} />
          <Route
            path="/private"
            element={
              <PrivateRoute authStatus={authStatus}>
                <h1>Private Route</h1>
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    </Provider>
  );
  it('should render component for public route, when user not authorized', () => {
    const store = mockStore();

    render(fakeApp(store, AuthStatus.NoAuth));
    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });
  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
      },
    });
    render(fakeApp(store, AuthStatus.Auth));

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
});
