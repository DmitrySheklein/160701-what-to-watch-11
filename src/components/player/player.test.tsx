import { render, screen } from '@testing-library/react';
import { AuthStatus } from 'src/const';
import { makeFakeFilm } from 'src/utils/mocks';
import { FakeAppTemplate } from '../app/app.test';
import Player from './player';

const fakeFilm = makeFakeFilm();

const fakeApp = (
  <FakeAppTemplate storeType={AuthStatus.Auth}>
    <Player currentFilm={fakeFilm} />
  </FakeAppTemplate>
);
describe('Component: Player', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('play-btn')).toBeInTheDocument();
  });
});
