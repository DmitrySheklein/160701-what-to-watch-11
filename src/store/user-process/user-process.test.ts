import { AuthStatus } from 'src/const';
import { makeFakeUserData } from 'src/utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess, TInitialState, initialState } from './user-process';

const mockUser = makeFakeUserData();

describe('Reducer: userProcess', () => {
  let state: TInitialState;

  beforeEach(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH"', () => {
      expect(
        userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: mockUser }),
      ).toEqual({
        authorizationStatus: AuthStatus.Auth,
        userData: mockUser,
      });
    });
    it('should update authorizationStatus to "NO_AUTH"', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type })).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
      });
    });
  });

  describe('checkLoginAction test', () => {
    it('should update authorizationStatus to "AUTH"', () => {
      expect(
        userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: mockUser }),
      ).toEqual({
        authorizationStatus: AuthStatus.Auth,
        userData: mockUser,
      });
    });
    it('should update authorizationStatus to "NO_AUTH"', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type })).toEqual({
        ...initialState,
        authorizationStatus: AuthStatus.NoAuth,
      });
    });
  });

  describe('checkLogoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH"', () => {
      expect(
        userProcess.reducer(
          {
            authorizationStatus: AuthStatus.Auth,
            userData: mockUser,
          },
          { type: logoutAction.fulfilled.type },
        ),
      ).toEqual({
        userData: null,
        authorizationStatus: AuthStatus.NoAuth,
      });
    });
  });
});
