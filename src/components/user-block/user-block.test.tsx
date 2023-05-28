import { render, screen } from '@testing-library/react';
import UserBlock from './user-block';
import { AuthStatus } from 'src/const';
import { FakeAppTemplate } from '../app/app.test';

const fakeApp = (storeType = AuthStatus.NoAuth) => (
  <FakeAppTemplate storeType={storeType}>
    <UserBlock />
  </FakeAppTemplate>
);
describe('Component: UserBlock', () => {
  it(`should render correctly, when user ${AuthStatus.NoAuth}`, () => {
    render(fakeApp(AuthStatus.NoAuth));

    expect(screen.getByTestId('sign-in-link')).toBeInTheDocument();
  });
  it(`should render correctly, when user ${AuthStatus.Auth}`, () => {
    render(fakeApp(AuthStatus.Auth));

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });
});
