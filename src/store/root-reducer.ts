import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from 'src/const';
import { filmsProcess } from './films-process/films-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Films]: filmsProcess.reducer,
});
