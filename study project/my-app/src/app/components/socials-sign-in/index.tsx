import React from 'react';
import { Button } from 'react-bootstrap';

export const SocialsSignIn: React.FC = () => (
  <>
    <p className="text-center mt-3 mb-4">--------------------- OR ---------------------</p>
    <Button variant="primary" type="submit" className="w-100 bg-primary border-primary">
      <i className="fab fa-facebook-f" />
      <span className="m-2">Sign in with Facebook</span>
    </Button>
    <Button variant="primary" type="submit" className="w-100 bg-danger border-danger mt-3 mb-1">
      <i className="fab fa-google" />
      <span className="m-2">Sign in with Google</span>
    </Button>
  </>
);
