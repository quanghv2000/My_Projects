import React from 'react';
import { useSelector } from 'react-redux';
import { SignInModal, SignUpModal } from 'modals';
import { IRootState } from 'types/root-state';
import { MODAL_NAMES } from 'utils/constants';

const appModals = {
  [MODAL_NAMES.SIGN_IN_MODAL]: <SignInModal />,
  [MODAL_NAMES.SIGN_UP_MODAL]: <SignUpModal />
}

export const ModalOpening: React.FC = () => {
  /** @Stored_Data */
  const modalOpening = useSelector((state: IRootState) => state.GlobalReducer.modalOpening);

  if (modalOpening === '') {
    return <></>
  }

  return appModals[modalOpening];
};
