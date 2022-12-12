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
  fetchSimilarFilmsAction,
} from '../api-actions';

type TInitialState = {
  films: {
    currentGenre: string;
    currentFilm: TFilm | null;
    currentFilmLoadingEnd: boolean;
    all: TFilm[];
    similar: TFilm[];
    favorite: TFilm[];
    allLoading: boolean;
    similarLoading: boolean;
  };
  comments: {
    data: TFilmComment[];
    loading: boolean;
  };
};
const initialState: TInitialState = {
  films: {
    currentGenre: DEFAULT_NAME_GENRE,
    currentFilm: null,
    currentFilmLoadingEnd: false,
    all: [],
    similar: [],
    allLoading: false,
    similarLoading: false,
    favorite: [],
  },
  comments: {
    data: [],
    loading: false,
  },
};
export const filmsProcess = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    setCurrentGenre: (state, action: PayloadAction<string>) => {
      state.films.currentGenre = action.payload;
    },
    setCurrentFilm: (state, action: PayloadAction<TFilm>) => {
      state.films.currentFilm = action.payload;
    },
    setCurrentFilmLoadingEnd: (state, action: PayloadAction<boolean>) => {
      state.films.currentFilmLoadingEnd = action.payload;
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
      state.films.currentFilmLoadingEnd = true;
    });
    builder.addCase(fetchFilmAction.pending, (state) => {
      state.films.currentFilmLoadingEnd = false;
    });
    builder.addCase(fetchFilmAction.rejected, (state) => {
      state.films.currentFilmLoadingEnd = true;
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
      state.films.similarLoading = false;
    });
    builder.addCase(fetchSimilarFilmsAction.rejected, (state) => {
      state.films.similarLoading = true;
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
  },
});

export const { setCurrentFilm, setCurrentGenre, setCurrentFilmLoadingEnd } = filmsProcess.actions;
export {
  addCommentFilmAction,
  fetchCommentsFilmAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchSimilarFilmsAction,
  fetchFavoriteFilmsAction,
};
