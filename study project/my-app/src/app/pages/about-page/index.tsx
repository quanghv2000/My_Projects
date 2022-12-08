import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export const AboutPage: React.FC = () => {
  const [modalState, setModalState] = React.useState<'modal-one' | 'modal-two' | 'close'>('close');

  const handleShowModalOne = () => {
    setModalState('modal-one');
  };

  const handleShowModalTwo = () => {
    setModalState('modal-two');
  };

  const handleClose = () => {
    setModalState('close');
  };
  return (
    <div
      className="mt-5"
      style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1>About Page</h1>
      <div className="mt-3">
        <div>
          <Button onClick={handleShowModalOne}>Show Modal One</Button>

          <Modal show={modalState === 'modal-one'}>
            <Modal.Body>This is Modal One</Modal.Body>
            <Modal.Footer>
              <Button onClick={handleShowModalTwo}>Show Modal Two</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={modalState === 'modal-two'}>
            <Modal.Body>This is Modal Two</Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
