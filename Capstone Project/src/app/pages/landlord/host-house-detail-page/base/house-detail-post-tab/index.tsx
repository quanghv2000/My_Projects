import { HousePost } from 'app/pages/landlord/host-house-detail-page/base/house-post';
import React, { Fragment } from 'react';

export const HouseDetailPostTab: React.FC<any> = () => {
  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: ' 100%',
        }}
      >
        <HousePost />
      </div>
    </Fragment>
  );
};
