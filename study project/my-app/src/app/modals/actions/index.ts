import { createAction } from '@reduxjs/toolkit';
import { actionPayload } from 'types/reducers';

export const modalsActionType = {
  OPEN_MODAL: 'MODALS/OPEN_MODAL',
  CLOSE_MODAL: 'MODALS/CLOSE_MODAL'
};

export const openModalAction = createAction(modalsActionType.OPEN_MODAL, (payload: string) => actionPayload(payload));

export const closeModalAction = createAction(modalsActionType.CLOSE_MODAL);
