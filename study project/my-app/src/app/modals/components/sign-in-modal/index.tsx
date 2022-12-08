import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Captcha } from 'app/components';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'types/RootState';
import { MODAL_STATUS } from 'const';
import { MODALS_NAME } from 'app/modals/constants';
import { openModalAction, closeModalAction } from 'app/modals/actions';
import { ForgotPasswordModal } from '../forgot-password-modal';

export const SignInModal: React.FC = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { modalOpening } = storedData.ModalsReducer;

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

  /** @Submit_Handler */
  const handleLogin = async (e: any) => {
    e.preventDefault();
  };

  console.log('re-render');

  return (
    <Modal show={modalStatus} onHide={handleCloseSignInModal} style={forgotPasswordModalStatus === MODAL_STATUS.OPENING ? { zIndex: 1 } : {}}>
      <div style={{ padding: 30 }}>
        <h3 className="text-center m-0">Sign In</h3>
        <Form className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>
          <Form.Group className="mb-3 d-flex justify-content-between">
            <Form.Check type="checkbox" label="Remember me" />
            <Form.Label style={{ cursor: 'pointer' }} onClick={handleOpenForgotPasswordModal}>
              Forgot password?
            </Form.Label>
          </Form.Group>
          <Captcha />
          <Button
            variant="primary"
            type="submit"
            className="w-100 bg-success border-success"
            style={{ fontWeight: 'bold', marginTop: 30 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Form>
        <p className="text-center mt-3" style={{ fontSize: 16 }}>
          You don't have an account?{' '}
          <span style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline' }} onClick={handleOpenSignUpModal}>
            Sign up
          </span>
        </p>
        {/* <SocialsSignIn /> */}
      </div>
      <ForgotPasswordModal isModalOpening={forgotPasswordModalStatus} onCloseModal={handleCloseForgotPasswordModal} />
    </Modal>
  );
};
