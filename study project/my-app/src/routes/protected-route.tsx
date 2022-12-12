import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/RootState';
import jwtDecode from 'jwt-decode';
import { AUTHED_STATUS, LocalStorage } from 'utils/constants';
import { UnauthorizedPage } from 'app/pages/unauthorized-page';
import { ForbiddenPage } from 'app/pages/forbidden-page';
import { IUserLoggedInfo } from 'models/api-model/response/user-infos/user-logged-info';

type IProps = {
  page: FunctionComponent<any>;
  layout: FunctionComponent<any>;
  authorities?: string[];
};

export const ProtectedRoute: React.FC<IProps> = (props) => {
  /** @Props_Value */
  const { page: Page, layout: Layout, authorities: routeAuthorities } = props;

  /** @Localstorage_Data */
  const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { authedStatus } = storedData.SignInReducer;

  /** @Declare */
  const isAuthed = authedStatus === AUTHED_STATUS.AUTHENTICATED && accessToken;

  /** @Logic_Handler */
  if (!isAuthed) {
    return <Layout content={UnauthorizedPage} />;
  }

  const userLoggedInfo: IUserLoggedInfo = jwtDecode(accessToken);

  const isAuthorized = routeAuthorities?.includes(userLoggedInfo?.authorities[0]);

  if (!isAuthorized) {
    return <Layout content={ForbiddenPage} />;
  }

  return <Layout content={Page} />;
};
