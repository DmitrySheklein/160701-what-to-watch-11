import { render, screen } from '@testing-library/react';
import PlayerPreview from './player-preview';

describe('Component: PlayerPreview', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(<PlayerPreview />);

    expect(screen.getByTestId('video')).toBeInTheDocument();
  });
});
