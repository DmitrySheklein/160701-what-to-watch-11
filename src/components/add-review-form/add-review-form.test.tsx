import { render, screen } from '@testing-library/react';
import AddReviewForm from './add-review-form';
import { FakeAppTemplate } from '../app/app.test';
import { AuthStatus } from 'src/const';

describe('Component: AddReviewForm', () => {
  it('should render correctly', () => {
    render(
      <FakeAppTemplate storeType={AuthStatus.Auth}>
        <AddReviewForm backgroundColor="" />
      </FakeAppTemplate>,
    );

    expect(screen.getByTestId('textarea')).toBeInTheDocument();
  });
});
