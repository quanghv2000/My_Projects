export const modalsActionType = {
  OPEN_MODAL: 'MODALS/OPEN_MODAL',
  CLOSE_MODAL: 'MODALS/CLOSE_MODAL'
};

export const openModalAction = (payload: string) => ({
  type: modalsActionType.OPEN_MODAL,
  payload
});

export const closeModalAction = () => ({
  type: modalsActionType.CLOSE_MODAL
});
