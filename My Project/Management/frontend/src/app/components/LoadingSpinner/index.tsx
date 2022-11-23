import React from 'react';

type IProps = {
  isLoading?: boolean;
};

export const LoadingSpinner: React.FC<IProps> = (props: IProps) => {
  const { isLoading = false } = props;

  return (
    <>
      {isLoading && (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            className="spinner-border text-secondary"
            style={{ position: 'absolute', top: '30%' }}
          >
            {/* <span className="sr-only">Loading...</span> */}
          </div>
        </div>
      )}
    </>
  );
};
