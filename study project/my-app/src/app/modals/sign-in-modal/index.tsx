import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Captcha } from 'app/components';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'types/RootState';
import { AUTHED_STATUS, MODALS_NAME, MODAL_STATUS } from 'utils/constants';
import { notifications, showNotification, validations } from 'helpers';
import { closeModalAction, openModalAction } from 'app/layouts/main-layout/actions';
import { ForgotPasswordModal } from '../forgot-password-modal';
import { ISignInFormData, IUserSignIn } from './models';
import { initialFormData } from './constants';
import { resetSignInStatusAction, signInRequestAction } from './actions';

export const SignInModal: React.FC = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { modalOpening } = storedData.GlobalReducer;
  const { authedStatus } = storedData.SignInReducer;

  console.log('authedStatus: ', authedStatus);

  const modalStatus = React.useMemo(() => {
    if (modalOpening === MODALS_NAME.SIGN_IN_MODAL) {
      return MODAL_STATUS.OPENING;
    }

    return MODAL_STATUS.CLOSED;
  }, [modalOpening]);

  /** @Dispacth_Store */
  const dispatch = useDispatch();

  /** @Component_State */
  const [forgotPasswordModalStatus, setForgotPasswordModalStatus] = React.useState<boolean>(MODAL_STATUS.CLOSED);
  const [formData, setFormData] = React.useState<ISignInFormData>(initialFormData);

  /** @Logic_Handler */
  const handleCloseSignInModal = () => {
    dispatch(closeModalAction());
  };

  const handleOpenSignUpModal = () => {
    dispatch(openModalAction(MODALS_NAME.SIGN_UP_MODAL));
  };

  const handleOpenForgotPasswordModal = () => {
    setForgotPasswordModalStatus(MODAL_STATUS.OPENING);
  };

  const handleCloseForgotPasswordModal = () => {
    setForgotPasswordModalStatus(MODAL_STATUS.CLOSED);
  };

  const handleChangeFormData = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  /** @Validation */
  const isCaptchaValid = (captcha: string) => {
    if (!captcha) {
      return false;
    }

    return true;
  };

  /** @Submit_Handler */
  const handleSignIn = async (e: any) => {
    e.preventDefault();

    const { username, password, rememberMe, captcha } = formData;

    const usernameValidation = validations.username(username);
    if (!usernameValidation.isValid) {
      notifications.show('error', usernameValidation.errorMessage);
      return;
    }

    const passwordValidation = validations.password(password);
    if (!passwordValidation.isValid) {
      notifications.show('error', passwordValidation.errorMessage);
      return;
    }

    if (!isCaptchaValid(captcha)) {
      notifications.show('error', 'Captcha is invalid!');
      return;
    }

    const userSignIn: IUserSignIn = {
      username,
      password,
      rememberMe
    };

    dispatch(signInRequestAction(userSignIn));
  };

  /** @Effect */
  React.useEffect(() => {
    if (authedStatus === AUTHED_STATUS.UNAUTHENTICATED) {
      showNotification('error', 'Invalid username or password!');
      dispatch(resetSignInStatusAction());
      return;
    }

    if (authedStatus === AUTHED_STATUS.AUTHENTICATED) {
      dispatch(closeModalAction());
    }
  }, [authedStatus]);

  return (
    <Modal
      show={modalStatus}
      onHide={handleCloseSignInModal}
      style={forgotPasswordModalStatus === MODAL_STATUS.OPENING ? { zIndex: 1 } : {}}
    >
      <div style={{ padding: 30, userSelect: 'none' }}>
        <h3 className="text-center m-0">Sign In</h3>
        <Form className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              autoComplete="username"
              onChange={handleChangeFormData}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              autoComplete="password"
              onChange={handleChangeFormData}
            />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-between">
            <div
              style={{ cursor: 'pointer' }}
              className="d-flex align-items-center"
              onClick={() => {
                setFormData({ ...formData, rememberMe: !formData.rememberMe });
              }}
            >
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                style={{ width: 15, height: 15 }}
                className="me-1"
                onChange={() => {
                  setFormData({ ...formData, rememberMe: !formData.rememberMe });
                }}
              />
              <span>Remember me</span>
            </div>
            <Form.Label style={{ cursor: 'pointer' }} onClick={handleOpenForgotPasswordModal}>
              Forgot password?
            </Form.Label>
          </Form.Group>
          <Captcha onChangeCaptcha={handleChangeFormData} />
          <Button
            variant="primary"
            type="submit"
            className="w-100 bg-success border-success"
            style={{ fontWeight: 'bold', marginTop: 30 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </Form>
        <p className="text-center mt-3" style={{ fontSize: 16 }}>
          You don't have an account?{' '}
          <span
            style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline' }}
            onClick={handleOpenSignUpModal}
          >
            Sign up
          </span>
        </p>
        {/* <SocialsSignIn /> */}
      </div>
      <ForgotPasswordModal isModalOpening={forgotPasswordModalStatus} onCloseModal={handleCloseForgotPasswordModal} />
    </Modal>
  );
};
