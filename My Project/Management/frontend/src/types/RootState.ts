import { ThemeState } from 'styles/theme/slice/types';
// Auth Reducer Type
import { SignInPageReducerType } from 'app/pages/auth/sign-in-page/reducers/types';

// Admin Reducer Type
import { UserMGMTPageReducerType } from 'app/pages/admin/user-mgmt-page/reducers/types';
import { CategoryMGMTPageReducerType } from 'app/pages/admin/category-mgmt-page/reducers/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;

  // Auth Reducer Type
  SignInPageReducer: SignInPageReducerType;

  // Admin Reducer Type
  UserMGMTPageReducer: UserMGMTPageReducerType;
  CategoryMGMTPageReducer: CategoryMGMTPageReducerType;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}