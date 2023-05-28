import { render, screen } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';
import ErrorScreen, { StatusCodeMap } from './error-screen';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';

const history = createMemoryHistory();

describe('Component: ErrorScreen', () => {
  it(`should render correctly ${StatusCodes.BAD_REQUEST}`, () => {
    render(
      <HistoryRouter history={history}>
        <ErrorScreen statusCode={StatusCodes.BAD_REQUEST} />
      </HistoryRouter>,
    );

    expect(screen.getByText(StatusCodeMap[StatusCodes.BAD_REQUEST])).toBeInTheDocument();
  });
  it('should render correctly 505', () => {
    render(
      <HistoryRouter history={history}>
        <ErrorScreen statusCode={505} />
      </HistoryRouter>,
    );

    expect(screen.getByText('505')).toBeInTheDocument();
  });
});
