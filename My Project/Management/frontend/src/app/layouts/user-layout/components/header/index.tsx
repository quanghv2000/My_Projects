/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { RootState } from 'types';
import { LocalStorage } from 'utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountRequestAction } from '../../actions';

type IProps = {};

export const MenuStatus = {
  CLOSED: false,
  OPENED: true,
};

export const UserHeaderLayout: React.FC<IProps> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { userInfo } = storedData.UserLayoutPageReducer;

  console.log('userInfo: ', userInfo);

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @State_Component */
  const [signInStatus, setSignInStatus] = React.useState(false);
  const [menuStatus, setMenuStatus] = React.useState<boolean>(
    MenuStatus.CLOSED,
  );

  /** @Logic_Handler */
  const onLogout = () => {
    localStorage.clear();
    window.location.href = '/home';
  };

  /** @Effect */
  React.useEffect(() => {
    /** @Localstorage_Data */
    const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

    if (!accessToken) {
      return;
    }

    dispatch(getAccountRequestAction());
    setSignInStatus(true);
  }, []);

  return (
    <header className="p-3 text-bg-dark bg-dark">
      <div className="container">
        <div
          className="d-flex flex-wrap align-items-center justify-content-between"
          style={{ fontSize: '1rem' }}
        >
          <div>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/home" className="nav-link px-2 text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="nav-link px-2 text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/me" className="nav-link px-2 text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <form
              className="col-12 col-lg-auto mb-3 mb-lg-0 mr-3"
              role="search"
            >
              <input
                type="search"
                className="form-control form-control-dark text-bg-dark"
                placeholder="Search..."
                aria-label="Search"
              />
            </form>

            {signInStatus ? (
              <div className="dropdown text-end">
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setMenuStatus(!menuStatus)}
                >
                  <img
                    src={
                      userInfo
                        ? userInfo?.imageUrl
                        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                    }
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle mr-2"
                  />
                  <span className="text-white">
                    {menuStatus ? (
                      <i className="fa fa-caret-up"></i>
                    ) : (
                      <i className="fa fa-caret-down"></i>
                    )}
                  </span>
                </div>

                <ul
                  className="dropdown-menu text-small"
                  style={{ display: menuStatus ? 'block' : 'none' }}
                >
                  <li>
                    <NavLink className="dropdown-item" to="/settings">
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li style={{ cursor: 'pointer' }} onClick={onLogout}>
                    <span className="dropdown-item">Sign out</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="text-end">
                <NavLink to={'/sign-in'}>
                  <button type="button" className="btn btn-outline-light mr-3">
                    Sign-in
                  </button>
                </NavLink>
                <NavLink to={'/sign-in'}>
                  <button type="button" className="btn btn-warning">
                    Sign-up
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
