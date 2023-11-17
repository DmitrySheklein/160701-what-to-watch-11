import { configureStore } from '@reduxjs/toolkit';
import { api } from 'src/services/api';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export { store };
