import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirectToRoute } from './action';
import { TAppDispatch, TState } from 'src/types/state';
import { APIRoute, APIRouteName, RouteName } from 'src/const';
import { FavoriteData, TFilm, TFilmComment, TFilmId } from 'src/types/films';
import { AuthData } from 'src/types/auth-data';
import { UserData } from 'src/types/user-data';
import { removeToken, setToken } from 'src/services/token';
import { TAddReveiw } from 'src/types/reviews';
import { TabsNames } from 'src/components/film-card/film-card';

type ThunkApiConfig = {
  dispatch: TAppDispatch;
  state: TState;
  extra: AxiosInstance;
};

const fetchFilmAction = createAsyncThunk<TFilm, TFilmId, ThunkApiConfig>(
  'data/fetchFilm',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<TFilm>(`${APIRoute.Films}/${filmId}`);

    return data;
  },
);
const fetchPromoFilmAction = createAsyncThunk<TFilm, undefined, ThunkApiConfig>(
  'data/fetchPromoFilm',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TFilm>(APIRoute.PromoFilm);

    return data;
  },
);

const fetchFavoriteFilmsAction = createAsyncThunk<TFilm[], undefined, ThunkApiConfig>(
  'data/fetchFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TFilm[]>(APIRoute.Favorite);

    return data;
  },
);

const changeFavoriteFilmAction = createAsyncThunk<TFilm, FavoriteData, ThunkApiConfig>(
  'data/changeFavoriteFilm',
  async ({ filmId, status }, { extra: api }) => {
    const { data } = await api.post<TFilm>(`${APIRoute.Favorite}/${filmId}/${status}`);

    return data;
  },
);

const fetchSimilarFilmsAction = createAsyncThunk<TFilm[], TFilmId, ThunkApiConfig>(
  'data/fetchSimilarFilms',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<TFilm[]>(`${APIRoute.Films}/${filmId}/${APIRouteName.Similar}`);

    return data;
  },
);

const fetchCommentsFilmAction = createAsyncThunk<TFilmComment[], TFilmId, ThunkApiConfig>(
  'data/fetchFilmComments',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<TFilmComment[]>(`${APIRoute.Comments}/${filmId}`);

    return data;
  },
);

const addCommentFilmAction = createAsyncThunk<void, TAddReveiw, ThunkApiConfig>(
  'data/addFilmComment',
  async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}/${filmId}`, { comment, rating });
    dispatch(redirectToRoute(`${RouteName.Films}/${filmId}#${TabsNames.Reviews}`));
  },
);

const fetchFilmsAction = createAsyncThunk<TFilm[], undefined, ThunkApiConfig>(
  'data/fetchFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TFilm[]>(APIRoute.Films);

    return data;
  },
);

const checkAuthAction = createAsyncThunk<UserData, undefined, ThunkApiConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

const loginAction = createAsyncThunk<UserData, AuthData, ThunkApiConfig>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    const { token } = data;
    setToken(token);

    return data;
  },
);

const logoutAction = createAsyncThunk<void, undefined, ThunkApiConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    removeToken();
  },
);

export {
  fetchPromoFilmAction,
  fetchFavoriteFilmsAction,
  changeFavoriteFilmAction,
  fetchCommentsFilmAction,
  fetchSimilarFilmsAction,
  fetchFilmsAction,
  fetchFilmAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  addCommentFilmAction,
};
