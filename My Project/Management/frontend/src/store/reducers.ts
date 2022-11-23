/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
// Auth Reducer
import { SignInPageReducer } from 'app/pages/auth/sign-in-page/reducers';
// Admin Reducer
import { UserMGMTPageReducer } from 'app/pages/admin/user-mgmt-page/reducers';
import { CategoryMGMTPageReducer } from 'app/pages/admin/category-mgmt-page/reducers';

import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      ...injectedReducers,

      // Auth Reducer
      SignInPageReducer,

      // Admin Reducer
      UserMGMTPageReducer,
      CategoryMGMTPageReducer,
    });
  }
}