import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFocusManager from 'hooks/useFocusManager';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { defaultFormDataSignUp, ELEMENT_IDS, MODAL_NAMES, MODAL_STATUS, SAVE_DRAFT_STATUS } from 'utils/constants';
import { closeModalAction, openModalAction } from 'reducers/global/actions';
import { ISignUpFormData, IUserInfoSignUpRequest } from 'models';
import { SaveDraftButton } from 'components';
import { IRootState } from 'types/root-state';
import {
  resetSignUpResponseAction,
  saveDraftFormAction,
  signUpRequestAction,
  unsaveFormAction
} from 'reducers/sign-up/actions';
import { showNotification } from 'helpers';
import { KEY_BOARD } from 'utils/constants/key-board';
import { ConfirmModal } from '../confirm';

export const SignUpModal: React.FC = () => {
  /** @Stored_Data */
  const { formDataSavedStatus, formDataSaved, signUpResponse } = useSelector((state: IRootState) => state.SignUpReducer);

  const initialFormData = React.useMemo(() => formDataSaved, []);

  /** @Dispatch_Store */
  const dispatch = useDispatch();

  /** @Component_State */
  const [clearSavedDraftModalStatus, setClearSavedDraftModalStatus] = React.useState<boolean>(MODAL_STATUS.CLOSED);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  /** @Element_Ids */
  const elementIds = ELEMENT_IDS.signUpModal;
  const {
    textFieldUsernameId,
    textFieldPasswordId,
    textFieldEmailId,
    textFieldPhoneId,
    textFieldAddressId,
    textAreaDescriptionId,
    btnSaveDraftId,
    btnResetId,
    btnSignUpId,
    btnCancelId,
    lblSignInId
  } = elementIds;

  /** @Focus_Manager */
  const focusOrderIds = [
    textFieldUsernameId,
    textFieldPasswordId,
    textFieldEmailId,
    textFieldPhoneId,
    textFieldAddressId,
    textAreaDescriptionId,
    btnSaveDraftId,
    btnResetId,
    btnSignUpId,
    btnCancelId,
    lblSignInId
  ];

  const focus = useFocusManager({ focusOrderIds });

  /** @Use_Form */
  const formManager = useForm<ISignUpFormData>({ defaultValues: initialFormData });
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }
  } = formManager;

  /** @Logic_Handler */
  const handleCloseModal = () => {
    handleResetForm();
    dispatch(resetSignUpResponseAction());
    dispatch(closeModalAction());
  };

  const handleOpenSignInModal = () => {
    dispatch(openModalAction(MODAL_NAMES.SIGN_IN_MODAL));
  };

  const handleSaveDraftForm = () => {
    const formData = formManager.getValues();
    dispatch(saveDraftFormAction(formData));
  };

  const handleResetForm = () => {
    formManager.reset({ ...defaultFormDataSignUp });
  };

  const handleOpenClearSavedDraftModal = () => {
    setClearSavedDraftModalStatus(MODAL_STATUS.OPENING);
  };

  const handleCloseClearSavedDraftModal = () => {
    setClearSavedDraftModalStatus(MODAL_STATUS.CLOSED);
  };

  const handleCancelForm = () => {
    if (formDataSavedStatus === SAVE_DRAFT_STATUS.UNSAVED) {
      dispatch(closeModalAction());
      return;
    }

    handleOpenClearSavedDraftModal();
  };

  const handleClearFormDataSaved = () => {
    dispatch(unsaveFormAction());
    dispatch(closeModalAction());
    showNotification('success', 'Clear form data saved successfully!');
  };

  const handleOnkeyDown = (e: React.KeyboardEvent<Element>) => {
    if (focus.isFocusKeyBoard(e.key)) {
      e.preventDefault();
    }
  };

  const handleOnkeyUp = (e: React.KeyboardEvent<Element>) => {
    focus.moveByKeyUp(e);
  };

  /** @Submit_Handler */
  const handleSignUp = (formData: ISignUpFormData) => {
    const userInfoSignUp: IUserInfoSignUpRequest = { ...formData };
    dispatch(signUpRequestAction(userInfoSignUp));
  };

  /** @Effect */
  React.useEffect(() => {
    if (!signUpResponse) {
      return;
    }

    if (signUpResponse?.statusCode === 201) {
      handleCloseModal();
      showNotification('success', signUpResponse?.message);
      dispatch(resetSignUpResponseAction());
      return;
    }

    showNotification('error', signUpResponse?.message);
    setErrorMessage(signUpResponse.message);
  }, [signUpResponse]);

  React.useEffect(() => {
    focus.focusOn(textFieldUsernameId);
  }, []);

  return (
    <Modal
      show
      onHide={handleCloseModal}
      style={clearSavedDraftModalStatus === MODAL_STATUS.OPENING ? { zIndex: 1 } : {}}
    >
      <div className="user-select-none p-30">
        <h3 className="text-center m-0">Sign Up</h3>
        <Form className="mt-4" onSubmit={handleSubmit(handleSignUp)}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              tabIndex={focusOrderIds.indexOf(textFieldUsernameId)}
              id={textFieldUsernameId}
              onFocus={() => {
                focus.setActive(textFieldUsernameId);
              }}
              onKeyUp={handleOnkeyUp}
              onKeyDown={handleOnkeyDown}
              type="text"
              autoComplete="username"
              placeholder="Enter username"
              maxLength={20}
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required!'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Username contains no special characters!'
                },
                minLength: {
                  value: 4,
                  message: 'Username must be 4 - 20 characters!'
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be 4 - 20 characters!'
                }
              })}
            />
            <p className="text-danger">{formErrors.username?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              tabIndex={focusOrderIds.indexOf(textFieldPasswordId)}
              id={textFieldPasswordId}
              onFocus={() => {
                focus.setActive(textFieldPasswordId);
              }}
              onKeyUp={handleOnkeyUp}
              onKeyDown={handleOnkeyDown}
              type="password"
              autoComplete="password"
              placeholder="Enter password"
              maxLength={20}
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required!'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'Password contains no special characters!'
                },
                minLength: {
                  value: 6,
                  message: 'Password must be 6 - 20 characters!'
                },
                maxLength: {
                  value: 20,
                  message: 'Password must be 6 - 20 characters!'
                }
              })}
            />
            <p className="text-danger">{formErrors.password?.message}</p>
          </Form.Group>
          <div className="row">
            <div className="col-6">
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
                  placeholder="Enter email"
                  autoComplete="email"
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
            </div>
            <div className="col-6">
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  tabIndex={focusOrderIds.indexOf(textFieldPhoneId)}
                  id={textFieldPhoneId}
                  onFocus={() => {
                    focus.setActive(textFieldPhoneId);
                  }}
                  onKeyUp={handleOnkeyUp}
                  onKeyDown={handleOnkeyDown}
                  type="text"
                  placeholder="Enter phone"
                  autoComplete="phone"
                  {...register('phone', {
                    required: {
                      value: true,
                      message: 'Phone is required!'
                    },
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: 'Phone invalid format!'
                    }
                  })}
                />
                <p className="text-danger">{formErrors.phone?.message}</p>
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              tabIndex={focusOrderIds.indexOf(textFieldAddressId)}
              id={textFieldAddressId}
              onFocus={() => {
                focus.setActive(textFieldAddressId);
              }}
              onKeyUp={handleOnkeyUp}
              onKeyDown={handleOnkeyDown}
              type="text"
              placeholder="Enter address"
              autoComplete="address"
              {...register('address', {
                required: {
                  value: true,
                  message: 'Address is required!'
                }
              })}
            />
            <p className="text-danger">{formErrors.address?.message}</p>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              tabIndex={focusOrderIds.indexOf(textAreaDescriptionId)}
              id={textAreaDescriptionId}
              onFocus={() => {
                focus.setActive(textAreaDescriptionId);
              }}
              onKeyUp={handleOnkeyUp}
              onKeyDown={handleOnkeyDown}
              as="textarea"
              rows={3}
              placeholder="Enter description"
              autoComplete="description"
              {...register('description')}
            />
          </Form.Group>
          <br />
          <p className="text-danger mb-4">{errorMessage}</p>
          <div className="d-flex justify-content-end mt-3">
            <SaveDraftButton
              id={btnSaveDraftId}
              tabIndex={focusOrderIds.indexOf(btnSaveDraftId)}
              focus={focus}
              formManager={formManager}
              onSave={handleSaveDraftForm}
            />
            <Button
              tabIndex={focusOrderIds.indexOf(btnResetId)}
              id={btnResetId}
              onFocus={() => {
                focus.setActive(btnResetId);
              }}
              onKeyUp={(e) => {
                if (e.key === KEY_BOARD.Enter) {
                  e.preventDefault();
                  handleResetForm();
                  return;
                }
                handleOnkeyUp(e);
              }}
              onKeyDown={handleOnkeyDown}
              variant="primary"
              type="button"
              className="bg-danger border-danger me-3 h-38"
              onClick={handleResetForm}
            >
              Reset
            </Button>
            <Button
              tabIndex={focusOrderIds.indexOf(btnSignUpId)}
              id={btnSignUpId}
              onFocus={() => {
                focus.setActive(btnSignUpId);
              }}
              onKeyUp={(e) => {
                if (e.key === KEY_BOARD.Enter) {
                  e.preventDefault();
                  document.getElementById(btnSignUpId)?.click();
                  return;
                }
                handleOnkeyUp(e);
              }}
              onKeyDown={handleOnkeyDown}
              variant="primary"
              type="submit"
              className="bg-success border-success me-3 h-38"
            >
              Sign up
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
                  handleCancelForm();
                  return;
                }
                handleOnkeyUp(e);
              }}
              onKeyDown={handleOnkeyDown}
              variant="default"
              type="button"
              className="btn btn-outline-secondary h-38"
              onClick={handleCancelForm}
            >
              Cancel
            </Button>
          </div>
        </Form>
        <p className="text-center mt-4" style={{ fontSize: 16 }}>
          Already have an account?
          <span
            tabIndex={focusOrderIds.indexOf(lblSignInId)}
            id={lblSignInId}
            onFocus={() => {
              focus.setActive(lblSignInId);
            }}
            onKeyUp={(e) => {
              if (e.key === KEY_BOARD.Enter) {
                e.preventDefault();
                handleOpenSignInModal();
                return;
              }
              handleOnkeyUp(e);
            }}
            onKeyDown={handleOnkeyDown}
            className="focus-item"
            style={{ cursor: 'pointer', color: '#007BFF', textDecoration: 'underline', marginLeft: 4 }}
            onClick={handleOpenSignInModal}
          >
            Sign in
          </span>
        </p>
      </div>
      <ConfirmModal
        isOpening={clearSavedDraftModalStatus}
        onClose={handleCloseClearSavedDraftModal}
        onYes={handleClearFormDataSaved}
      />
    </Modal>
  );
};
