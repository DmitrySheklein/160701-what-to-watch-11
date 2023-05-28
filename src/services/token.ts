export const AUTH_TOKEN_KEY_NAME = 'wtw-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

export const setToken = (token: Token) => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
