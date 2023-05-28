import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { FakeAppTemplate } from '../app/app.test';
import { AuthStatus } from 'src/const';

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    render(
      <FakeAppTemplate storeType={AuthStatus.Auth}>
        <Breadcrumbs />
      </FakeAppTemplate>,
    );

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
