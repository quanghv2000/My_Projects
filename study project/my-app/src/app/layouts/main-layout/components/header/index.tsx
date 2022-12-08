import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'routes/constants';
import { MODALS_NAME } from 'app/modals/constants';
import { openModalsAction } from 'app/modals/actions';

export const Header: React.FC = () => {
  /** @Dispacth_Store */
  const dispatch = useDispatch();

  /** @Logic_Handler */
  const handleOpenSignInModal = () => {
    dispatch(openModalsAction([MODALS_NAME.SIGN_IN_MODAL]));
  };

  const handleOpenSignUpModal = () => {
    dispatch(openModalsAction([MODALS_NAME.SIGN_UP_MODAL]));
  };

  const handleOpenForgotPasswordModal = () => {
    dispatch(openModalsAction([MODALS_NAME.FORGOT_PASSWORD_MODAL]));
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink to={ROUTES.HOME_PAGE_ROUTE} className="nav-link text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.ABOUT_PAGE_ROUTE} className="nav-link text-white">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.CONTACT_PAGE_ROUTE} className="nav-link text-white">
                Contact
              </NavLink>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-outline-light me-3" onClick={handleOpenSignInModal}>
              Sign-in
            </button>
            <button type="button" className="btn btn-warning me-3" onClick={handleOpenSignUpModal}>
              Sign-up
            </button>
            <button type="button" className="btn btn-danger" onClick={handleOpenForgotPasswordModal}>
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
