import { configureStore } from '@reduxjs/toolkit';
import { createApi } from 'src/services/api';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

const api = createApi();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

export { store, api };
