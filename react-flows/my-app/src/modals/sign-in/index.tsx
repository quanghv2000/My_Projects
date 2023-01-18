import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ClientCaptcha from 'react-client-captcha';
import useFocusManager from 'hooks/useFocusManager';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'types/root-state';
import { defaultFormDataSignIn, ELEMENT_IDS, MODAL_NAMES, MODAL_STATUS, AUTHED_STATUS } from 'utils/constants';
import { closeModalAction, openModalAction } from 'reducers/global/actions';
import { resetSignInStatusAction, signInRequestAction } from 'reducers/sign-in/actions';
import { ISignInFormData } from 'models/ui-model';
import { IUserInfoSignInRequest } from 'models/api-model/request';
import { showNotification } from 'helpers';
import { KEY_BOARD } from 'utils/constants/key-board';
import { ForgotPasswordModal } from '../forgot-password';

export const SignInModal: React.FC = () => {
  /** @Stored_Data */
  const { signInStatus, signInErrMessage } = useSelector((state: IRootState) => state.SignInReducer);

  /** @Dispatch_Store */
  const dispatch = useDispatch();

  /** @Ref */
  const clientCaptcha = React.useRef<ReturnType<typeof ClientCaptcha>>();

  /** @Use_Form */
  const formManager = useForm<ISignInFormData>({ defaultValues: defaultFormDataSignIn });
  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors: formErrors }
  } = formManager;

  /** @Component_State */
  const [forgotPasswordModalStatus, setForgotPasswordModalStatus] = React.useState<boolean>(MODAL_STATUS.CLOSED);
  const [error, setError] = React.useState<{ type: string; message: string }>({ type: '', message: '' });

  /** @Element_Ids */
  const elementIds = ELEMENT_IDS.signInModal;
  const {
    textFieldUsernameId,
    textFieldPasswordId,
    cbxRememberMeId,
    lblForgotPasswordId,
    retryButtonReCaptcha,
    textFieldCaptchaCodeId,
    btnSignInId,
    lblSignUpId
  } = elementIds;

  /** @Focus_Manager */
  const focusOrderIds = [
    textFieldUsernameId,
    textFieldPasswordId,
    cbxRememberMeId,
    lblForgotPasswordId,
    retryButtonReCaptcha,
    textFieldCaptchaCodeId,
    btnSignInId,
    lblSignUpId
  ];
  const focus = useFocusManager({ focusOrderIds });

  /** @Logic_Handler */
  const resetError = () => {
    setError({ type: '', message: '' });
  };

  const handleCloseSignInModal = () => {
    dispatch(closeModalAction());
    resetForm();
    resetError();
  };

  const handleOpenSignUpModal = () => {
    dispatch(openModalAction(MODAL_NAMES.SIGN_UP_MODAL));
  };

  const handleOpenForgotPasswordModal = () => {
    setForgotPasswordModalStatus(MODAL_STATUS.OPENING);
  };

  const handleCloseForgotPasswordModal = () => {
    setForgotPasswordModalStatus(MODAL_STATUS.CLOSED);
  };

  const handleOnkeyDown = (e: React.KeyboardEvent<Element>) => {
    if (focus.isFocusKeyBoard(e.key)) {
      e.preventDefault();
    }
  };

  const handleOnkeyUp = (e: React.KeyboardEvent<Element>) => {
    focus.moveByKeyUp(e);
  };

  /** @Validation */
  const isCaptchaValid = (captchaCode: string) => {
    if (!captchaCode || captchaCode !== clientCaptcha?.current?.captchaCode) {
      setError({ type: 'invalidCaptcha', message: 'Captcha invalid format!' });
      focus.focusOn(textFieldCaptchaCodeId);
      return false;
    }

    return true;
  };

  /** @Submit_Handler */
  const handleSignIn = async (formData: ISignInFormData) => {
    const { username, password, rememberMe, captchaCode } = formData;

    if (!isCaptchaValid(captchaCode)) {
      return;
    }

    const userInfoSignIn: IUserInfoSignInRequest = {
      username,
      password,
      rememberMe
    };

    dispatch(signInRequestAction(userInfoSignIn));
  };

  /** @Effect */
  React.useEffect(() => {
    if (signInStatus === AUTHED_STATUS.LOGGED_FAILURE) {
      setError({ type: 'signInFailed', message: signInErrMessage });
      showNotification('error', signInErrMessage);
      dispatch(resetSignInStatusAction());
      focus.focusOn(textFieldUsernameId);
      return;
    }

    if (signInStatus === AUTHED_STATUS.LOGGED) {
      dispatch(closeModalAction());
    }
  }, [signInStatus]);

  React.useEffect(() => {
    const retryButton = document.getElementById('retryButton');
    if (retryButton) {
      retryButton.tabIndex = focusOrderIds.indexOf(retryButtonReCaptcha);
      retryButton.className = 'retry-button focus-item';
      retryButton.onfocus = () => {
        focus.setActive(retryButtonReCaptcha);
      };
      retryButton.onkeyup = (e: any) => {
        if (e.key !== KEY_BOARD.Enter) {
          handleOnkeyUp(e);
        }
      };
      retryButton.onkeydown = (e: any) => {
        if (e.key !== KEY_BOARD.Enter) {
          handleOnkeyDown(e);
        }
      };
    }
    focus.focusOn(textFieldUsernameId);
  }, []);

  return (
    <Modal
      show
      onHide={handleCloseSignInModal}
      style={forgotPasswordModalStatus === MODAL_STATUS.OPENING ? { zIndex: 1 } : {}}
    >
      <div className="user-select-none p-30">
        <h3 className="text-center m-0">Sign In</h3>
        <Form className="mt-4" onSubmit={handleSubmit(handleSignIn)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              tabIndex={focusOrderIds.indexOf(textFieldUsernameId)}
              id={textFieldUsernameId}
              onFocus={() => {
                focus.setActive(textFieldUsernameId);
              }}
              onKeyUp={handleOnkeyUp}
              onKeyDown={handleOnkeyDown}
              type="text"
              autoComplete="username"
              placeholder="Enter username"
              maxLength={20}
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required!'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Username contains no special characters!'
                },
                minLength: {
                  value: 4,
                  message: 'Username must be 4 - 20 characters!'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be 4 - 20 characters!'
                }
              })}
            />
            <p className="text-danger">{formErrors.username?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              tabIndex={focusOrderIds.indexOf(textFieldPasswordId)}
              id={textFieldPasswordId}
              onFocus={() => {
                focus.setActive(textFieldPasswordId);
              }}
              onKeyUp={handleOnkeyUp}
              onKeyDown={handleOnkeyDown}
              type="password"
              autoComplete="password"
              placeholder="Enter password"
              maxLength={20}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required!'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Password contains no special characters!'
                },
                minLength: {
                  value: 6,
                  message: 'Password must be 6 - 20 characters!'
                },
                maxLength: {
                  value: 20,
                  message: 'Password must be 6 - 20 characters!'
                }
              })}
            />
            <p className="text-danger">{formErrors.password?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-between">
            <div style={{ cursor: 'pointer' }} className="d-flex align-items-center">
              <input
                tabIndex={focusOrderIds.indexOf(cbxRememberMeId)}
                id={cbxRememberMeId}
                onFocus={() => {
                  focus.setActive(cbxRememberMeId);
                }}
                onKeyUp={handleOnkeyUp}
                onKeyDown={handleOnkeyDown}
                type="checkbox"
                autoComplete="rememberMe"
                style={{ width: 15, height: 15, cursor: 'pointer' }}
                className="me-1 focus-item"
                {...register('rememberMe')}
              />
              <span
                onClick={() => {
                  formManager.setValue('rememberMe', !formManager.getValues('rememberMe'));
                }}
              >
                Remember me
              </span>
            </div>
            <Form.Label
              tabIndex={focusOrderIds.indexOf(lblForgotPasswordId)}
              id={lblForgotPasswordId}
              onFocus={() => {
                focus.setActive(lblForgotPasswordId);
              }}
              onKeyUp={(e) => {
                if (e.key === KEY_BOARD.Enter) {
                  e.preventDefault();
                  handleOpenForgotPasswordModal();
                  return;
                }
                handleOnkeyUp(e);
              }}
              onKeyDown={handleOnkeyDown}
              className="focus-item"
              style={{ cursor: 'pointer' }}
              onClick={handleOpenForgotPasswordModal}
            >
              Forgot password?
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <label className="mb-2">Captcha</label>
            <div className="row d-flex align-items-center">
              <div className="form-group col-7">
                <ClientCaptcha captchaCode={(code: any) => {}} width={150} ref={clientCaptcha} />
              </div>
              <div className="form-group col-5">
                <Form.Control
                  tabIndex={focusOrderIds.indexOf(textFieldCaptchaCodeId)}
                  id={textFieldCaptchaCodeId}
                  onFocus={() => {
                    focus.setActive(textFieldCaptchaCodeId);
                  }}
                  onKeyUp={handleOnkeyUp}
                  onKeyDown={handleOnkeyDown}
                  type="text"
                  autoComplete="captchaCode"
                  placeholder="Enter captcha"
                  {...register('captchaCode')}
                />
              </div>
              <div className="col-7" />
              <div className="col-5">
                {error.type === 'invalidCaptcha' && <small className="text-danger">{error.message}</small>}
              </div>
            </div>
          </Form.Group>
          {error.type === 'signInFailed' && (
            <div style={{ marginTop: 20, marginBottom: -10 }}>
              <p className="text-danger m-0">{error.message}</p>
            </div>
          )}
          <Button
            id={btnSignInId}
            onFocus={() => {
              focus.setActive(btnSignInId);
            }}
            onKeyUp={(e) => {
              if (e.key === KEY_BOARD.Enter) {
                e.preventDefault();
                document.getElementById(btnSignInId)?.click();
                return;
              }
              handleOnkeyUp(e);
            }}
            onKeyDown={handleOnkeyDown}
            variant="primary"
            type="submit"
            className="w-100 bg-success border-success"
            style={{ fontWeight: 'bold', marginTop: 35 }}
          >
            Sign In
          </Button>
        </Form>
        <p className="text-center mt-3" style={{ fontSize: 16 }}>
          You don't have an account?
          <span
            id={lblSignUpId}
            tabIndex={focusOrderIds.indexOf(lblSignUpId)}
            onFocus={() => {
              focus.setActive(lblSignUpId);
            }}
            onKeyUp={(e) => {
              if (e.key === KEY_BOARD.Enter) {
                e.preventDefault();
                handleOpenSignUpModal();
                return;
              }
              handleOnkeyUp(e);
            }}
            onKeyDown={handleOnkeyDown}
            className="focus-item"
            style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline', marginLeft: 4 }}
            onClick={handleOpenSignUpModal}
          >
            Sign up
          </span>
        </p>
      </div>
      <ForgotPasswordModal isOpening={forgotPasswordModalStatus} onClose={handleCloseForgotPasswordModal} />
    </Modal>
  );
};
