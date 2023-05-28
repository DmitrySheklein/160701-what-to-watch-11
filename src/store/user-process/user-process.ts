import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from 'src/const';
import { UserData } from 'src/types/user-data';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

export type TInitialState = {
  authorizationStatus: AuthStatus;
  userData: UserData | null;
};
export const initialState: TInitialState = {
  authorizationStatus: AuthStatus.Unknown,
  userData: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeAuthStatus: (state, action: PayloadAction<AuthStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthStatus.Auth;
      state.userData = action.payload;
    });
    builder.addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthStatus.NoAuth;
    });

    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthStatus.Auth;
      state.userData = action.payload;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthStatus.NoAuth;
    });

    builder.addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthStatus.NoAuth;
      state.userData = null;
    });
  },
});

export const { changeAuthStatus } = userProcess.actions;
