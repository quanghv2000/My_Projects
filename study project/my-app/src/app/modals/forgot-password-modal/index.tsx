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
    <>
      {/* {isModalOpening ? (
        <div
          className="fp-modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'grey',
            opacity: 0.5
          }}
        />
      ) : null} */}
      <Modal show={isModalOpening} onHide={handleCloseModal} className="fp-modal">
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
    </>
  );
};
