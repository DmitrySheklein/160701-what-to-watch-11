import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_NAME_GENRE, NameSpace } from 'src/const';
import { TFilm, TFilmComment } from 'src/types/films';
import {
  addCommentFilmAction,
  changeFavoriteFilmAction,
  fetchCommentsFilmAction,
  fetchFavoriteFilmsAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction,
  logoutAction,
} from '../api-actions';

export type TInitialState = {
  films: {
    currentGenre: string;
    currentFilm: TFilm | null;
    currentFilmLoading: boolean;
    all: TFilm[];
    similar: TFilm[];
    favorite: TFilm[];
    allLoading: boolean;
    similarLoading: boolean;
  };
  comments: {
    data: TFilmComment[];
    loading: boolean;
    addCommentLoading: boolean;
  };
};
export const initialState: TInitialState = {
  films: {
    currentGenre: DEFAULT_NAME_GENRE,
    currentFilm: null,
    currentFilmLoading: false,
    all: [],
    similar: [],
    allLoading: false,
    similarLoading: false,
    favorite: [],
  },
  comments: {
    data: [],
    loading: false,
    addCommentLoading: false,
  },
};
export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setCurrentGenre: (state, action: PayloadAction<string>) => {
      state.films.currentGenre = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFilmsAction.fulfilled, (state, action) => {
      state.films.all = action.payload;
      state.films.allLoading = false;
    });
    builder.addCase(fetchFilmsAction.pending, (state) => {
      state.films.allLoading = true;
    });
    builder.addCase(fetchFilmsAction.rejected, (state) => {
      state.films.allLoading = false;
    });

    builder.addCase(fetchFilmAction.fulfilled, (state, action) => {
      state.films.currentFilm = action.payload;
      state.films.currentFilmLoading = false;
    });
    builder.addCase(fetchFilmAction.pending, (state) => {
      state.films.currentFilmLoading = true;
    });
    builder.addCase(fetchFilmAction.rejected, (state) => {
      state.films.currentFilmLoading = false;
    });

    builder.addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
      state.films.currentFilm = action.payload;
      state.films.currentFilmLoading = false;
    });
    builder.addCase(fetchPromoFilmAction.pending, (state) => {
      state.films.currentFilmLoading = true;
    });
    builder.addCase(fetchPromoFilmAction.rejected, (state) => {
      state.films.currentFilmLoading = false;
    });

    builder.addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
      state.films.favorite = action.payload;
    });
    builder.addCase(changeFavoriteFilmAction.fulfilled, (state, { payload: film }) => {
      const { id, isFavorite } = film;
      const stateFilms = state.films.favorite;
      state.films.favorite = isFavorite
        ? [...stateFilms, film]
        : stateFilms.filter((item) => item.id !== id);
    });

    builder.addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
      state.films.similar = action.payload;
      state.films.similarLoading = false;
    });
    builder.addCase(fetchSimilarFilmsAction.pending, (state) => {
      state.films.similarLoading = true;
    });
    builder.addCase(fetchSimilarFilmsAction.rejected, (state) => {
      state.films.similarLoading = false;
    });

    builder.addCase(fetchCommentsFilmAction.fulfilled, (state, action) => {
      state.comments.data = action.payload;
      state.comments.loading = false;
    });
    builder.addCase(fetchCommentsFilmAction.pending, (state) => {
      state.comments.loading = true;
    });
    builder.addCase(fetchCommentsFilmAction.rejected, (state) => {
      state.comments.loading = false;
    });

    builder.addCase(addCommentFilmAction.fulfilled, (state) => {
      state.comments.addCommentLoading = false;
    });
    builder.addCase(addCommentFilmAction.pending, (state) => {
      state.comments.addCommentLoading = true;
    });
    builder.addCase(addCommentFilmAction.rejected, (state) => {
      state.comments.addCommentLoading = false;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.films.favorite = [];
    });
  },
});

export const { setCurrentGenre } = filmsProcess.actions;
export {
  addCommentFilmAction,
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchSimilarFilmsAction,
  fetchFavoriteFilmsAction,
};
