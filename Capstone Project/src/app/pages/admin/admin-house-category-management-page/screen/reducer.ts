import { createReducer } from '@reduxjs/toolkit';
import { landlordPageEnum } from 'app/pages/landlord/landlord-house-page/screen/types';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  dataResponse: {},
};
