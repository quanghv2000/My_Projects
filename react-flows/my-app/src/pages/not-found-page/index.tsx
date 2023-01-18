import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const redirectToHomePage = () => {
    navigate("/");
  };

  return (
    <div
      className="mt-5"
      style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1 style={{ fontSize: '4em' }}>Oops 404!</h1>
      <button type="button" onClick={redirectToHomePage} className="btn btn-warning mt-3">
        Go To Home Page
      </button>
    </div>
  );
};
