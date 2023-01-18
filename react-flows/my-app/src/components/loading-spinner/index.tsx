import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/root-state';

export const LoadingSpinner: React.FC = () => {
  /** @Stored_Data */
  const spinnerLoading = useSelector((state: IRootState) => state.GlobalReducer.spinnerLoading);
  
  return (
    <>
      {spinnerLoading && (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 9999999,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div className="spinner-border text-secondary" style={{ position: 'absolute', top: '30%' }}>
            {/* <span className="sr-only">Loading...</span> */}
          </div>
        </div>
      )}
    </>
  );
};
