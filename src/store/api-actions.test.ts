import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createApi } from 'src/services/api';
import {
  addCommentFilmAction,
  changeFavoriteFilmAction,
  checkAuthAction,
  fetchCommentsFilmAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchSimilarFilmsAction,
  loginAction,
  logoutAction,
} from './api-actions';
import { APIRoute, APIRouteName } from 'src/const';
import { TState } from 'src/types/state';
import { AuthData } from 'src/types/auth-data';
import { redirectToRoute } from './action';
import { AUTH_TOKEN_KEY_NAME } from 'src/services/token';
import {
  makeFakeCommentsArray,
  makeFakeFilm,
  makeFakeFilmsArray,
  makeFakeComment,
} from 'src/utils/mocks';
import { FavoriteData } from 'src/types/films';
import { TAddReveiw } from 'src/types/reviews';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    TState,
    Action<string>,
    ThunkDispatch<TState, typeof api, Action>
  >(middlewares);
  const getActionsType = (actions: Action<string>[]): string[] => actions.map(({ type }) => type);

  let store: ReturnType<typeof mockStore>;
  beforeEach(() => {
    store = mockStore();
  });

  describe('User actions', () => {
    it('should auth status is "auth" when server return 200', async () => {
      mockApi.onGet(APIRoute.Login).reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.fulfilled.type]);
    });

    it('should dispatch RequiredAuthorization and RedirectToRoute when POST /login', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };

      mockApi.onPost(APIRoute.Login).reply(200, { token: 'secret' });

      Storage.prototype.setItem = jest.fn();

      await store.dispatch(loginAction(fakeUser));

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, loginAction.fulfilled.type]);

      expect(Storage.prototype.setItem).toBeCalledTimes(1);
      expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
    });

    it('should dispatch Logout when DELETE /logout', async () => {
      mockApi.onDelete(APIRoute.Logout).reply(204);

      Storage.prototype.removeItem = jest.fn();

      await store.dispatch(logoutAction());

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
      expect(Storage.prototype.removeItem).toBeCalledTimes(1);
      expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
    });
  });

  describe('Films actions', () => {
    it('should dispatch Load_Films when GET /films', async () => {
      const mockFilms = makeFakeFilmsArray();

      mockApi.onGet(APIRoute.Films).reply(200, mockFilms);

      // const store = mockStore();

      await store.dispatch(fetchFilmsAction());

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([fetchFilmsAction.pending.type, fetchFilmsAction.fulfilled.type]);
    });
    it('should dispatch Load_Film when GET /films/:id', async () => {
      const mockFilm = makeFakeFilm();
      const mockId = mockFilm.id;

      mockApi.onGet(`${APIRoute.Films}/${mockId}`).reply(200, mockFilm);

      await store.dispatch(fetchFilmAction(mockId));

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([fetchFilmAction.pending.type, fetchFilmAction.fulfilled.type]);
    });
    it('should dispatch Load_SimilarFilms when GET /films/:id/similar', async () => {
      const mockFilms = makeFakeFilmsArray();
      const mockFilm = makeFakeFilm();
      const mockId = mockFilm.id;

      mockApi.onGet(`${APIRoute.Films}/${mockId}/${APIRouteName.Similar}`).reply(200, mockFilms);

      await store.dispatch(fetchSimilarFilmsAction(mockId));

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([
        fetchSimilarFilmsAction.pending.type,
        fetchSimilarFilmsAction.fulfilled.type,
      ]);
    });

    it('should dispatch Load_FavoriteFilms when GET /favorite', async () => {
      const mockFilms = makeFakeFilmsArray();

      mockApi.onGet(`${APIRoute.Favorite}`).reply(200, mockFilms);

      await store.dispatch(fetchFavoriteFilmsAction());

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([
        fetchFavoriteFilmsAction.pending.type,
        fetchFavoriteFilmsAction.fulfilled.type,
      ]);
    });
    it('should dispatch Change_FavoriteFilm status when POST /favorite/:id/{status}', async () => {
      const mockFilm = makeFakeFilm();
      const mockId = mockFilm.id;
      const fakeStartStatus = 1;
      const fakeParams: FavoriteData = {
        filmId: mockId,
        status: fakeStartStatus,
      };

      mockApi
        .onPost(`${APIRoute.Favorite}/${fakeParams.filmId}/${fakeParams.status}`)
        .reply(200, mockFilm);

      await store.dispatch(changeFavoriteFilmAction(fakeParams));

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([
        changeFavoriteFilmAction.pending.type,
        changeFavoriteFilmAction.fulfilled.type,
      ]);
    });

    it('should dispatch Load_Comments when GET /comments/{filmId}', async () => {
      const { id } = makeFakeFilm();
      const mockComments = makeFakeCommentsArray();

      mockApi.onGet(`${APIRoute.Comments}/${id}`).reply(200, mockComments);

      await store.dispatch(fetchCommentsFilmAction(id));

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([
        fetchCommentsFilmAction.pending.type,
        fetchCommentsFilmAction.fulfilled.type,
      ]);
    });
    it('should dispatch Add_Comment when POST /comments/{filmId}', async () => {
      const { id } = makeFakeFilm();
      const mockComment = makeFakeComment();

      mockApi.onPost(`${APIRoute.Comments}/${id}`).reply(200, mockComment);

      const fakeParams: TAddReveiw = {
        filmId: id,
        comment: 'test comment',
        rating: 10,
      };
      await store.dispatch(addCommentFilmAction(fakeParams));

      const actions = getActionsType(store.getActions());

      expect(actions).toEqual([
        addCommentFilmAction.pending.type,
        redirectToRoute.type,
        addCommentFilmAction.fulfilled.type,
      ]);
    });
  });
});
