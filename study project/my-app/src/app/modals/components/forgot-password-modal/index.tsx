import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

type IProps = {
  isModalOpening: boolean;
  onCloseModal: () => void;
};

export const ForgotPasswordModal: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { isModalOpening, onCloseModal } = props;

  /** @Logic_Handler */
  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <Modal show={isModalOpening} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Your Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
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