import { makeFakeCommentsArray, makeFakeFilmsArray } from 'src/utils/mocks';
import { addCommentFilmAction, changeFavoriteFilmAction } from '../api-actions';
import {
  filmsProcess,
  TInitialState,
  initialState,
  setCurrentGenre,
  fetchFilmAction,
  fetchFilmsAction,
  fetchSimilarFilmsAction,
  fetchCommentsFilmAction,
  fetchFavoriteFilmsAction,
} from './films-process';

const mockFilmsArray = makeFakeFilmsArray();
const [mockFilm] = mockFilmsArray;
const mockCommentsArray = makeFakeCommentsArray();

describe('Reducer: filmsProcess', () => {
  let state: TInitialState;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should update film genre', () => {
    const testGenreName = 'Comedy';
    expect(filmsProcess.reducer(state, setCurrentGenre(testGenreName))).toEqual({
      ...initialState,
      films: {
        ...initialState.films,
        currentGenre: testGenreName,
      },
    });
  });

  describe('fetchFilmAction test', () => {
    it('should set currentFilm', () => {
      expect(
        filmsProcess.reducer(state, { type: fetchFilmAction.fulfilled.type, payload: mockFilm }),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          currentFilm: mockFilm,
          currentFilmLoading: false,
        },
      });
    });
    it('should set currentFilmLoading true', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmAction.pending.type })).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          currentFilmLoading: true,
        },
      });
    });
    it('should set default currentFilm', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmAction.rejected.type })).toEqual(
        initialState,
      );
    });
  });

  describe('fetchFilmsAction test', () => {
    it('should set all films', () => {
      expect(
        filmsProcess.reducer(state, {
          type: fetchFilmsAction.fulfilled.type,
          payload: mockFilmsArray,
        }),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          all: mockFilmsArray,
          allLoading: false,
        },
      });
    });
    it('should set allLoading true', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.pending.type })).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          allLoading: true,
        },
      });
    });
    it('should set default all films', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.rejected.type })).toEqual(
        initialState,
      );
    });
  });
  describe('fetchSimilarFilmsAction test', () => {
    it('should set all films', () => {
      expect(
        filmsProcess.reducer(state, {
          type: fetchSimilarFilmsAction.fulfilled.type,
          payload: mockFilmsArray,
        }),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          similar: mockFilmsArray,
          similarLoading: false,
        },
      });
    });
    it('should set allLoading true', () => {
      expect(filmsProcess.reducer(state, { type: fetchSimilarFilmsAction.pending.type })).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          similarLoading: true,
        },
      });
    });
    it('should set default all films', () => {
      expect(filmsProcess.reducer(state, { type: fetchSimilarFilmsAction.rejected.type })).toEqual(
        initialState,
      );
    });
  });
  describe('fetchCommentsFilmAction test', () => {
    it('should set comments', () => {
      expect(
        filmsProcess.reducer(state, {
          type: fetchCommentsFilmAction.fulfilled.type,
          payload: mockCommentsArray,
        }),
      ).toEqual({
        ...initialState,
        comments: {
          ...initialState.comments,
          data: mockCommentsArray,
          loading: false,
        },
      });
    });
    it('should set comments loading true', () => {
      expect(filmsProcess.reducer(state, { type: fetchCommentsFilmAction.pending.type })).toEqual({
        ...initialState,
        comments: {
          ...initialState.comments,
          loading: true,
        },
      });
    });
    it('should set default comments', () => {
      expect(filmsProcess.reducer(state, { type: fetchCommentsFilmAction.rejected.type })).toEqual(
        initialState,
      );
    });
  });
  describe('addCommentFilmAction test', () => {
    it('should change addCommentLoading false', () => {
      expect(
        filmsProcess.reducer(state, {
          type: addCommentFilmAction.fulfilled.type,
        }),
      ).toEqual({
        ...initialState,
        comments: {
          ...initialState.comments,
          addCommentLoading: false,
        },
      });
    });
    it('should change addCommentLoading true', () => {
      expect(filmsProcess.reducer(state, { type: addCommentFilmAction.pending.type })).toEqual({
        ...initialState,
        comments: {
          ...initialState.comments,
          addCommentLoading: true,
        },
      });
    });
    it('should change addCommentLoading default', () => {
      expect(filmsProcess.reducer(state, { type: addCommentFilmAction.rejected.type })).toEqual(
        initialState,
      );
    });
  });
  describe('fetchFavoriteFilmsAction test', () => {
    it('should set favorite films', () => {
      expect(
        filmsProcess.reducer(state, {
          type: fetchFavoriteFilmsAction.fulfilled.type,
          payload: mockFilmsArray,
        }),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          favorite: mockFilmsArray,
        },
      });
    });
  });
  describe('changeFavoriteFilmAction test', () => {
    const mockFavoriteFilm = { ...mockFilm, isFavorite: true };
    const mockNotFavoriteFilm = { ...mockFavoriteFilm, isFavorite: false };

    it('should add favorite film', () => {
      expect(
        filmsProcess.reducer(state, {
          type: changeFavoriteFilmAction.fulfilled.type,
          payload: mockFavoriteFilm,
        }),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          favorite: [mockFavoriteFilm],
        },
      });
    });
    it('should not add favorite film', () => {
      expect(
        filmsProcess.reducer(state, {
          type: changeFavoriteFilmAction.rejected.type,
        }),
      ).toEqual(initialState);
    });
    it('should remove favorite film', () => {
      expect(
        filmsProcess.reducer(
          {
            ...state,
            films: {
              ...state.films,
              favorite: [mockFavoriteFilm],
            },
          },
          {
            type: changeFavoriteFilmAction.fulfilled.type,
            payload: mockNotFavoriteFilm,
          },
        ),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          favorite: [],
        },
      });
    });
    it('should not remove favorite film', () => {
      expect(
        filmsProcess.reducer(
          {
            ...state,
            films: {
              ...state.films,
              favorite: [mockFavoriteFilm],
            },
          },
          {
            type: changeFavoriteFilmAction.rejected.type,
          },
        ),
      ).toEqual({
        ...initialState,
        films: {
          ...initialState.films,
          favorite: [mockFavoriteFilm],
        },
      });
    });
  });
});
