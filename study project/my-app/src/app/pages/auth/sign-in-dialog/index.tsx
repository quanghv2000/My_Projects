import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { Captcha } from 'app/components';
import { signInRequestAction } from './actions';
// import { signInService } from './services/sign-in';
// import { IUserLogin } from './models';

type IProps = {
  isShowing: boolean;
  onClose: () => void;
};

export const SignInDialog: React.FC<IProps> = (props) => {
  /** @Props_Values */
  const { isShowing, onClose } = props;

  const dispatch = useDispatch();

  /** @Submit_Handler */
  const handleLogin = async (e: any) => {
    e.preventDefault();
    // const userLogin: IUserLogin = { username: 'username', password: '123' };

    // const res = await signInService(userLogin);

    // console.log('res: ', res);
    dispatch(signInRequestAction());
  };

  return (
    <Modal show={isShowing} onHide={onClose}>
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
            <Form.Label style={{ cursor: 'pointer' }}>Forgot password?</Form.Label>
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
          You don't have an account? <span style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline' }}>Sign up</span>
        </p>
        {/* <SocialsSignIn /> */}
      </div>
    </Modal>
  );
};
