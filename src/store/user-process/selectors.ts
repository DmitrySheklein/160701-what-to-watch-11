import { NameSpace } from 'src/const';
import { TState } from 'src/types/state';

export const getAuthorizationStatus = (state: TState) => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: TState) => state[NameSpace.User].userData;
