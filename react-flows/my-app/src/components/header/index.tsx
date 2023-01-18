import React from 'react';
import jwtDecode from 'jwt-decode';
import { Dropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Routes } from 'routes/constants';
import { IRootState } from 'types/root-state';
import { openModalAction } from 'reducers/global/actions';
import { MODAL_NAMES, SESSION_STORAGE, AUTHED_STATUS } from 'utils/constants';
import { IUserLoggedInfo } from 'models';
import { localStorageManager } from 'helpers';

import './header.css';

export const Header: React.FC = () => {
  /** @Localstorage_Data */
  const accessToken = localStorageManager.accessToken.getValue();
  const rememberMe = localStorageManager.rememberMe.getValue();
  const authedStatus = sessionStorage.getItem(SESSION_STORAGE.AUTHED_STATUS);

  const userLoggedInfo: IUserLoggedInfo = React.useMemo(() => {
    if (!accessToken) {
      return {};
    }

    return jwtDecode(accessToken);
  }, [accessToken]);

  /** @Stored_Data */
  const { signInStatus } = useSelector((state: IRootState) => state.SignInReducer);

  const isAuthed = React.useMemo(
    () => !!(rememberMe || authedStatus === AUTHED_STATUS.LOGGED),
    [signInStatus, rememberMe, authedStatus]
  );

  /** @Dispacth_Store */
  const dispatch = useDispatch();

  /** @Logic_Handler */
  const handleOpenSignInModal = () => {
    dispatch(openModalAction(MODAL_NAMES.SIGN_IN_MODAL));
  };

  const handleOpenSignUpModal = () => {
    dispatch(openModalAction(MODAL_NAMES.SIGN_UP_MODAL));
  };

  const handleSignOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = Routes.LIST_PAGE_ROUTE;
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul
            className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"
            style={{ marginLeft: '-16px' }}
          >
            <li>
              <NavLink to={Routes.LIST_PAGE_ROUTE} className="nav-link text-white">
                <h3>List</h3>
              </NavLink>
            </li>
          </ul>

          {isAuthed ? (
            <>
              <div className="me-3">
                <p className="m-0 p-0" style={{ fontSize: 16 }}>
                  Welcome, <b>{userLoggedInfo?.fullName}</b>
                </p>
              </div>
              <Dropdown align="end" className="dropdown-account">
                <Dropdown.Toggle
                  variant="warning"
                  id="dropdown-basic"
                  style={{ display: 'flex', padding: '3px 6px', alignItems: 'center' }}
                >
                  {userLoggedInfo?.imageUrl ? (
                    <img
                      src="https://github.com/mdo.png"
                      alt="mdo"
                      width="30"
                      height="30"
                      className="rounded-circle me-1"
                    />
                  ) : (
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="mdo"
                      width="30"
                      height="30"
                      className="rounded-circle me-1"
                    />
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ fontSize: 14 }}>
                  <div style={{ padding: '0px 16px' }}>
                    <p className="m-0 p-0">Sign in as</p>
                    <b>{userLoggedInfo.username}</b>
                  </div>
                  <hr style={{ margin: '4px 0px' }} />
                  <Dropdown.Item>My profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <hr style={{ margin: '4px 0px' }} />
                  <Dropdown.Item style={{ margin: '0px' }} onClick={handleSignOut}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <div className="text-end">
              <button type="button" className="btn btn-outline-light me-3" onClick={handleOpenSignInModal}>
                Sign-in
              </button>
              <button type="button" className="btn btn-warning me-3" onClick={handleOpenSignUpModal}>
                Sign-up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
