import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { signInRequestAction } from './actions';
import { LoadingSpinner } from 'app/components';
import { useHistory } from 'react-router-dom';

type IProps = {};

export const SignInPage: React.FC<IProps> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { isLoadingPage, userInfo, signInStatus, error } =
    storedData.SignInPageReducer;

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Use_Form */
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  /** @Logic_Handler */
  const onLogin = async formData => {
    const userLogin = {
      username: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe,
    };

    dispatch(signInRequestAction(userLogin));
  };

  /** @Use_History */
  const history = useHistory();

  /** @Effect */
  React.useEffect(() => {
    if (signInStatus) {
      if (userInfo.authorities?.includes('ROLE_USER')) {
        history.push('/home');
        return;
      }

      if (userInfo.authorities?.includes('ROLE_ADMIN')) {
        history.push('/admin/dashboard');
        return;
      }
    }
  }, [signInStatus, userInfo, history]);

  return (
    <>
      <LoadingSpinner isLoading={isLoadingPage} />
      <div
        className="container mt-5 p-5 border border-secondary rounded"
        style={{ width: 500 }}
      >
        <h3 className="text-center">Sign In</h3>
        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              {...register('username', { required: true, maxLength: 20 })}
            />
            {errors.username && (
              <span className="text-danger">
                Please enter username and max-length 20 characters
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              {...register('password', { required: true, maxLength: 20 })}
            />
            {errors.password && (
              <span className="text-danger">
                Please enter password and max-length 20 characters
              </span>
            )}
          </div>
          <div className="mb-3 form-check d-flex justify-content-between">
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                {...register('rememberMe')}
              />
              <label
                className="form-check-label"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setValue('rememberMe', !getValues('rememberMe'));
                }}
              >
                Remember me
              </label>
            </div>
            <div>
              <label className="form-label" style={{ cursor: 'pointer' }}>
                Fogot password?
              </label>
            </div>
          </div>
          {error.status === 400 && (
            <p className="text-danger" style={{ fontSize: '1rem' }}>
              {error?.data?.message}
            </p>
          )}
          <button type="submit" className="btn btn-success w-100">
            Sign In
          </button>
        </form>
        <div>
          <div className="text-center m-3">
            <p style={{ fontSize: '1rem' }}>--- or ---</p>
          </div>
          <div>
            <button type="button" className="btn btn-primary w-100">
              <i className="fab fa-facebook-f mr-2"></i> Sign In With Facebook
            </button>
            <button type="button" className="btn btn-danger w-100 mt-3">
              <i className="fab fa-google mr-2"></i> Sign In With Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
