import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { FakeAppTemplate } from '../app/app.test';
import { AuthStatus } from 'src/const';
import { makeFakeFilm } from 'src/utils/mocks';
const fakeFilm = makeFakeFilm();


describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    render(
      <FakeAppTemplate storeType={AuthStatus.Auth}>
        <Breadcrumbs film={fakeFilm} />
      </FakeAppTemplate>,
    );

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
