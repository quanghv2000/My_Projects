import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ELEMENT_IDS } from 'utils/constants';
import useFocusManager from 'hooks/useFocusManager';
import { KEY_BOARD } from 'utils/constants/key-board';

type IProps = {
  isOpening: boolean;
  onClose?: () => void;
  onYes?: () => void;
  onNo?: () => void;
};

export const ConfirmModal: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { isOpening, onClose = () => {}, onYes = () => {}, onNo = () => {} } = props;

  /** @Element_Ids */
  const elementIds = ELEMENT_IDS.confirmModal;
  const { btnYesId, btnNoId } = elementIds;

  /** @Focus_Manager */
  const focusOrderIds = [btnYesId, btnNoId];
  const focus = useFocusManager({ focusOrderIds });

  /** @Logic_Handler */
  const handleCloseModal = () => {
    onClose();
  };

  const handleClickYesBtn = () => {
    onYes();
    handleCloseModal();
  };

  const handleClickNoBtn = () => {
    onNo();
    handleCloseModal();
  };

  const handleOnkeyDown = (e: React.KeyboardEvent<Element>) => {
    if (focus.isFocusKeyBoard(e.key)) {
      e.preventDefault();
    }
  };

  const handleOnkeyUp = (e: React.KeyboardEvent<Element>) => {
    focus.moveByKeyUp(e);
  };

  /** @Effect */
  React.useEffect(() => {
    focus.focusOn(btnYesId);
  }, [isOpening]);

  return (
    <>
      <Modal show={isOpening} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Clear the saved draft?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-evenly p-5">
          <Button
            tabIndex={focusOrderIds.indexOf(btnYesId)}
            id={btnYesId}
            onFocus={() => {
              focus.setActive(btnYesId);
            }}
            onKeyUp={(e) => {
              if (e.key === KEY_BOARD.Enter) {
                e.preventDefault();
                handleClickYesBtn();
                return;
              }
              handleOnkeyUp(e);
            }}
            onKeyDown={handleOnkeyDown}
            variant="danger"
            className="me-2 ps-4 pe-4"
            onClick={handleClickYesBtn}
          >
            Yes
          </Button>
          <Button
            tabIndex={focusOrderIds.indexOf(btnNoId)}
            id={btnNoId}
            onFocus={() => {
              focus.setActive(btnNoId);
            }}
            onKeyUp={(e) => {
              if (e.key === KEY_BOARD.Enter) {
                e.preventDefault();
                handleClickNoBtn();
                return;
              }
              handleOnkeyUp(e);
            }}
            onKeyDown={handleOnkeyDown}
            variant="secondary"
            className="me-2 ps-4 pe-4"
            onClick={handleClickNoBtn}
          >
            No
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
