import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

export const FiterBarSkeleton: React.FC<any> = () => {
  const loading = data?.map((item: any, key: number) => {
    return (
      <div
        key={key}
        style={{
          display: 'flex',
          width: '100%',
          paddingLeft: 10,
        }}
      >
        <div>
          {' '}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 10,
            }}
          >
            <Skeleton width={30} height={30} />
          </div>
          <div>
            <Skeleton
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
              count={1}
              width={60}
              height={10}
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
        }}
      >
        {loading}
      </div>
    </Fragment>
  );
};
