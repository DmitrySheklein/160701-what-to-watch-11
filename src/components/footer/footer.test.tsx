import { render, screen } from '@testing-library/react';
import Footer from './footer';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
const history = createMemoryHistory();

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByText(/What to watch Ltd/i)).toBeInTheDocument();
  });
});
