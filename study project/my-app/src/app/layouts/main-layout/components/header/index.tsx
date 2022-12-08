import React from 'react';
import { SignInDialog } from 'app/pages/auth/sign-in-dialog';
import { DIALOG_STATUS } from 'const';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'routes/constants';
import { SignUpDialog } from 'app/pages/auth/sign-up-dialog';

export const Header: React.FC = () => {
  /** @State_Component */
  const [signInDialogStatus, setSignInDialogStatus] = React.useState<boolean>(DIALOG_STATUS.CLOSED);
  const [signUpDialogStatus, setSignUpDialogStatus] = React.useState<boolean>(DIALOG_STATUS.CLOSED);

  /** @Logic_Handler */
  const openSignInDialog = () => {
    setSignInDialogStatus(DIALOG_STATUS.OPENING);
  };

  const closeSignInDialog = () => {
    setSignInDialogStatus(DIALOG_STATUS.CLOSED);
  };

  const openSignUpDialog = () => {
    setSignUpDialogStatus(DIALOG_STATUS.OPENING);
  };

  const closeSignUpDialog = () => {
    setSignUpDialogStatus(DIALOG_STATUS.CLOSED);
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
            <button type="button" className="btn btn-outline-light me-3" onClick={openSignInDialog}>
              Sign-in
            </button>
            <button type="button" className="btn btn-warning" onClick={openSignUpDialog}>
              Sign-up
            </button>
          </div>
          <SignInDialog onClose={closeSignInDialog} isShowing={signInDialogStatus} />
          <SignUpDialog onClose={closeSignUpDialog} isShowing={signUpDialogStatus} />
        </div>
      </div>
    </header>
  );
};
