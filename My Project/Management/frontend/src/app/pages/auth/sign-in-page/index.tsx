import { LoadingSpinner } from 'app/components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { signInServices } from './services';

type IProps = {};

export const SignInPage: React.FC<IProps> = () => {
  /** @State_Component */
  const [isLoadingPage, setIsLoadingPage] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onLogin = async formData => {
    const userLogin = {
      username: formData.username,
      password: formData.password,
      remember: formData.remember,
    };

    console.log('userLogin: ', userLogin);

    try {
      setIsLoadingPage(true);
      const res = await signInServices(userLogin);

      console.log('response: ', res);
    } catch (error: any) {
      console.log('error: ', error?.response);
    }

    setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);
  };

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
                {...register('remember')}
              />
              <label
                className="form-check-label"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setValue('remember', !getValues('remember'));
                }}
              >
                Remember
              </label>
            </div>
            <div>
              <label className="form-label">Fogot Password?</label>
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Sign In
          </button>
        </form>
        <div>
          <div className="text-center m-3">
            <p>--- or ---</p>
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
