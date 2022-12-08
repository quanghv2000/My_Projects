export const modalsActionType = {
  OPEN_MODALS: 'MODALS/OPEN_MODALS',
  CLOSE_MODALS: 'MODALS/CLOSE_MODALS'
};

export const openModalsAction = (payload: string[]) => ({
  type: modalsActionType.OPEN_MODALS,
  payload
});

export const closeModalsAction = (payload: string[]) => ({
  type: modalsActionType.CLOSE_MODALS,
  payload
});
