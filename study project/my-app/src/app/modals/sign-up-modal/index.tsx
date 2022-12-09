import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { MODALS_NAME, MODAL_STATUS } from 'utils/constants';
import { closeModalAction, openModalAction } from 'app/layouts/main-layout/actions';
import { IRootState } from 'types/RootState';

type IProps = {};

export const SignUpModal: React.FC<IProps> = (props) => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { modalOpening } = storedData.GlobalReducer;

  const modalStatus = React.useMemo(() => {
    if (modalOpening === MODALS_NAME.SIGN_UP_MODAL) {
      return MODAL_STATUS.OPENING;
    }

    return MODAL_STATUS.CLOSED;
  }, [modalOpening]);

  /** @Dispacth_Store */
  const dispatch = useDispatch();

  /** @Logic_Handler */
  const handleCloseModal = () => {
    dispatch(closeModalAction());
  };

  const handleOpenSignInModal = () => {
    dispatch(openModalAction(MODALS_NAME.SIGN_IN_MODAL));
  };

  return (
    <Modal show={modalStatus} onHide={handleCloseModal}>
      <div style={{ padding: 30 }}>
        <h3 className="text-center m-0">Sign Up</h3>
        <Form className="mt-4">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" autoComplete="username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" autoComplete="password" />
          </Form.Group>
          <div className="row">
            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" autoComplete="email" />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" autoComplete="phone" />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" autoComplete="address" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter description" autoComplete="description" />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="button" className="bg-danger border-danger me-3" style={{ fontWeight: 'bold', marginTop: 30 }}>
              Reset
            </Button>
            <Button variant="primary" type="submit" className="bg-success border-success me-3" style={{ fontWeight: 'bold', marginTop: 30 }}>
              Sign up
            </Button>
            <Button variant="default" type="button" className="bg-secondary border-secondary" style={{ fontWeight: 'bold', marginTop: 30, color: 'white' }}>
              Cancel
            </Button>
          </div>
        </Form>
        <p className="text-center mt-4" style={{ fontSize: 16 }}>
          Already have an account?
          <span style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline', marginLeft: 4 }} onClick={handleOpenSignInModal}>
            Sign in
          </span>
        </p>
      </div>
    </Modal>
  );
};
