import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
// import { reducer } from '../index';
import { rootReducer } from '../root-reducer';
import { REDIRECT_TO_ROUTE } from '../action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => (next) => (action: PayloadAction<string>) => {
    if (action.type === REDIRECT_TO_ROUTE) {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
