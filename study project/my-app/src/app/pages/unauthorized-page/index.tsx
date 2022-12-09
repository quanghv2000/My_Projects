import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/constants';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate(ROUTES.HOME_PAGE_ROUTE);
  };

  return (
    <div
      className="mt-5"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1 style={{ fontSize: '4em' }}>Error 401!</h1>
      <h3 style={{ textTransform: 'uppercase' }}>Unauthorized</h3>
      <button type="button" onClick={redirectToHomePage} className="btn btn-warning mt-3">
        Go To Home Page
      </button>
    </div>
  );
};
