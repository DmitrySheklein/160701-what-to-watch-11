import { render, screen } from '@testing-library/react';
import ShowMoreBtn from './show-more-btn';

describe('Component: ShowMoreBtn', () => {
  it('should render correctly', () => {
    render(<ShowMoreBtn onClick={() => void 0} />);

    expect(screen.getByTestId('show-more-btn')).toBeInTheDocument();
  });
});
