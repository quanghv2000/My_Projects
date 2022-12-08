import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/RootState';

export const HomePage: React.FC = () => {
  const storedData = useSelector((state: IRootState) => state);
  console.log('storedData: ', storedData);

  return (
    <div
      className="mt-5"
      style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
    >
      <h1>Home Page</h1>
    </div>
  );
};
