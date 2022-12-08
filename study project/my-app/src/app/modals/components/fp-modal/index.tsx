import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MODAL_STATUS } from 'utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'types/RootState';
import { MODALS_NAME } from 'app/modals/constants';

import { closeModalAction } from 'app/modals/actions';

type IProps = {};

export const ForgotPasswordModal: React.FC<IProps> = (props) => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { modalOpening } = storedData.ModalsReducer;

  const modalStatus = React.useMemo(() => {
    if (modalOpening === MODALS_NAME.FORGOT_PASSWORD_MODAL) {
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

  return (
    <Modal show={modalStatus} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Your Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" autoComplete="email" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="success">Send mail to verify</Button>
      </Modal.Footer>
    </Modal>
  );
};
