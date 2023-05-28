import { store } from 'src/store';

export type TState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
