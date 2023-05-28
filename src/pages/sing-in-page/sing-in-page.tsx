import { ChangeEvent, FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus, PageTitles } from 'src/const';
import { useAppDispatch } from 'src/hooks';
import { loginAction } from 'src/store/api-actions';
import { getTestId } from 'src/utils/main';
import { LoginSchema } from 'src/utils/validate';

type TSingInPage = {
  authStatus: AuthStatus;
};

enum FormFieldName {
  Email = 'user-email',
  Password = 'user-password',
}

const SingInPage = ({ authStatus }: TSingInPage) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    [FormFieldName.Email]: 'user@test.ru',
    [FormFieldName.Password]: 'test123456',
  });
  const { error: validError } = LoginSchema.validate({
    email: formData[FormFieldName.Email],
    password: formData[FormFieldName.Password],
  });

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const formSubmitHandler = (evt: FormEvent) => {
    evt.preventDefault();

    if (!validError) {
      dispatch(
        loginAction({
          email: formData[FormFieldName.Email],
          password: formData[FormFieldName.Password],
        }),
      );
    }
  };

  if (authStatus === AuthStatus.Auth) {
    return <Navigate to={AppRoute.Root} />;
  }
  return (
    <>
      <Helmet>
        <title>{PageTitles.Login}</title>
      </Helmet>
      <div className="sign-in user-page__content">
        <form className="sign-in__htmlForm" onSubmit={formSubmitHandler}>
          {validError && (
            <div className="sign-in__message">
              <p>{validError.message}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name={FormFieldName.Email}
                id={FormFieldName.Email}
                onChange={onChange}
                autoComplete="autoComplete"
                value={formData['user-email']}
                {...getTestId('email')}
              />
              <label className="sign-in__label visually-hidden" htmlFor={FormFieldName.Email}>
                Email address
              </label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name={FormFieldName.Password}
                id={FormFieldName.Password}
                onChange={onChange}
                value={formData['user-password']}
                autoComplete="autoComplete"
                minLength={2}
                {...getTestId('password')}
              />
              <label className="sign-in__label visually-hidden" htmlFor={FormFieldName.Password}>
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" disabled={!!validError}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SingInPage;
