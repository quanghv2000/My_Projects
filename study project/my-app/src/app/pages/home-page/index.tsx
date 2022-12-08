import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/RootState';

export const HomePage: React.FC = () => {
  const storedData = useSelector((state: IRootState) => state);
  console.log('storedData: ', storedData);

  return (
    <div style={{ height: '500px', textAlign: 'center' }}>
      <h3>Home Page</h3>
    </div>
  );
};
