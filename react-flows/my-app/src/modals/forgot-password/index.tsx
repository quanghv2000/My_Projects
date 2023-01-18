import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFocusManager from 'hooks/useFocusManager';
import { IForgotPasswordFormData } from 'models';
import { useForm } from 'react-hook-form';
import { defaultFormForgotPassword, ELEMENT_IDS } from 'utils/constants';
import { useDispatch } from 'react-redux';
import { showNotification } from 'helpers';
import { closeModalAction } from 'reducers/global/actions';
import { KEY_BOARD } from 'utils/constants/key-board';

type IProps = {
  isOpening: boolean;
  onClose?: () => void;
};

export const ForgotPasswordModal: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { isOpening, onClose = () => {} } = props;

  /** @Dispatch_Store */
  const dispatch = useDispatch();

  /** @Element_Ids */
  const elementIds = ELEMENT_IDS.forgotPasswordModal;
  const { textFieldEmailId, btnSendId, btnCancelId } = elementIds;

  /** @Focus_Manager */
  const focusOrderIds = [textFieldEmailId, btnSendId, btnCancelId];
  const focus = useFocusManager({ focusOrderIds });

  /** @Use_Form */
  const formManager = useForm<IForgotPasswordFormData>({ defaultValues: defaultFormForgotPassword });
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset: resetForm
  } = formManager;

  /** @Logic_Handler */
  const handleCloseModal = () => {
    onClose();
    resetForm();
  };

  /** @Submit_Handler */
  const handleSendEmail = (formData: IForgotPasswordFormData) => {
    const { email } = formData;
    showNotification('success', `Send mail successfully! ${email}`);
    dispatch(closeModalAction());
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
    if (isOpening) {
      focus.focusOn(textFieldEmailId);
    }
  }, [isOpening]);

  return (
    <>
      <Modal show={isOpening} onHide={handleCloseModal} className="fp-modal">
        <Form onSubmit={handleSubmit(handleSendEmail)}>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Your Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                tabIndex={focusOrderIds.indexOf(textFieldEmailId)}
                id={textFieldEmailId}
                onFocus={() => {
                  focus.setActive(textFieldEmailId);
                }}
                onKeyUp={handleOnkeyUp}
                onKeyDown={handleOnkeyDown}
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required!'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Email invalid format!'
                  }
                })}
              />
              <p className="text-danger">{formErrors.email?.message}</p>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              tabIndex={focusOrderIds.indexOf(btnSendId)}
              id={btnSendId}
              onFocus={() => {
                focus.setActive(btnSendId);
              }}
              onKeyUp={(e) => {
                if (e.key === KEY_BOARD.Enter) {
                  e.preventDefault();
                  document.getElementById(btnSendId)?.click();
                  return;
                }
                handleOnkeyUp(e);
              }}
              onKeyDown={handleOnkeyDown}
              type="submit"
              variant="success"
              className="me-2"
            >
              Send
            </Button>
            <Button
              tabIndex={focusOrderIds.indexOf(btnCancelId)}
              id={btnCancelId}
              onFocus={() => {
                focus.setActive(btnCancelId);
              }}
              onKeyUp={(e) => {
                if (e.key === KEY_BOARD.Enter) {
                  e.preventDefault();
                  handleCloseModal();
                  return;
                }
                handleOnkeyUp(e);
              }}
              onKeyDown={handleOnkeyDown}
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
