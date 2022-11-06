import React from 'react';
import { Resume, Skills } from './components';

type IProps = {};

export const ResumePage: React.FC<IProps> = () => {
  return (
    <>
      <Resume />
      <Skills />
    </>
  );
};
