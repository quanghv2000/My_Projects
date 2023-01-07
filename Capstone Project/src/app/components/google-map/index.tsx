import React, { Fragment } from 'react';

export interface GoogleMapProps {
  width?: number;
  height?: number;
}

export const GoogleMapComponent: React.FC<any> = ({
  width = 1200,
  height = 800,
}: GoogleMapProps) => {
  return (
    <Fragment>
      <div className="mapouter mt-50">
        <div className="gmap_canvas">
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/d/u/0/embed?mid=10FKP74jsKGHHzZMW-gXZEk1UcRpqFWJm&ehbc=2E312F"
              width={width ? width : '100%'}
              height={height ? height : '100%'}
              title="google-map"
              frameBorder={0}
              style={{ border: 0, marginTop: '0' }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
