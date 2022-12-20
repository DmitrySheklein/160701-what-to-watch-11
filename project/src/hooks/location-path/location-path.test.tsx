import { renderHook } from '@testing-library/react';
import useCurrentLocation from './location-path';
import router from 'react-router-dom';
import { AppRoute, RouteName } from 'src/const';

type TRouter = typeof router;

const mockUseLocationValue = {
  pathname: '/',
  search: '',
  hash: '',
  key: '',
  state: null,
};

jest.mock(
  'react-router-dom',
  (): TRouter => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => mockUseLocationValue,
  }),
);

describe('ONLY Hook: useCurrentLocation', () => {
  it('should return object with 5 elements and has isRootPage', () => {
    const {
      result: { current },
    } = renderHook(() => useCurrentLocation());

    expect(Object.keys(current)).toHaveLength(5);
    expect(current).toBeInstanceOf(Object);
    expect(current).toHaveProperty('isRootPage');
    expect(current.isRootPage).toBe(true);
  });
  it(`should return isRootPage TRUE if ${AppRoute.Root} `, () => {
    mockUseLocationValue.pathname = AppRoute.Root;
    const {
      result: { current },
    } = renderHook(() => useCurrentLocation());

    expect(current).toHaveProperty('isRootPage');
    expect(current.isRootPage).toBe(true);
  });
  it(`should return isLoginPage TRUE if ${AppRoute.Login} `, () => {
    mockUseLocationValue.pathname = AppRoute.Login;

    const {
      result: { current },
    } = renderHook(() => useCurrentLocation());

    expect(current).toHaveProperty('isLoginPage');
    expect(current.isLoginPage).toBe(true);
    expect(current.isRootPage).toBe(false);
  });
  it(`should return isAddReviewPage TRUE if ${AppRoute.AddReview} `, () => {
    mockUseLocationValue.pathname = `${RouteName.Films}/1/${RouteName.Review}`;

    const {
      result: { current },
    } = renderHook(() => useCurrentLocation());

    expect(current).toHaveProperty('isAddReviewPage');
    expect(current.isAddReviewPage).toBe(true);
    expect(current.isRootPage).toBe(false);
  });
  it(`should return isMoviePage TRUE if ${AppRoute.Film} `, () => {
    mockUseLocationValue.pathname = `${RouteName.Films}/1`;

    const {
      result: { current },
    } = renderHook(() => useCurrentLocation());

    expect(current).toHaveProperty('isMoviePage');
    expect(current.isMoviePage).toBe(true);
    expect(current.isAddReviewPage).toBe(false);
  });
});
