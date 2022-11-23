import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from 'types';

type IProps = {};

export const MenuStatus = {
  CLOSED: false,
  OPENED: true,
};

export const Header: React.FC<IProps> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { userInfo } = storedData.SignInPageReducer;

  console.log('userInfo: ', userInfo);

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @State_Component */
  const [menuStatus, setMenuStatus] = React.useState<boolean>(
    MenuStatus.CLOSED,
  );

  return (
    <header className="p-3 text-bg-dark bg-dark">
      <div className="container">
        <div
          className="d-flex flex-wrap align-items-center justify-content-between"
          style={{ fontSize: '1rem' }}
        >
          <div>
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <a href="/" className="nav-link px-2 text-secondary">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="/" className="nav-link px-2 text-white">
                  About
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

            {/* <div className="text-end">
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
            </div> */}

            <div className="dropdown text-end">
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setMenuStatus(!menuStatus)}
              >
                <img
                  src="https://github.com/mdo.png"
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
                  <a className="dropdown-item" href="/">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
