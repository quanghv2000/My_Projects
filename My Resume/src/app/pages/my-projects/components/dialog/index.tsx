import React from 'react';

type IProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export const Dialog: React.FC<IProps> = () => {
  return (
    <div
      className="modal fade bd-example-modal-lg p-0"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="modal-content" style={{ width: 700, height: 532 }}>
          <div
            style={{
              height: 64,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 0,
                padding: 0,
              }}
            >
              NestJS &amp; ReactJS - Website Đặt Vé Xem Phim
            </p>
          </div>
          <div
            style={{ backgroundColor: 'gray', height: 365, margin: '0px 24px' }}
          ></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 24px 8px',
            }}
          >
            <p style={{ margin: 0, padding: 0, fontSize: '1rem' }}>
              Project NestJS &amp; ReactJS - Website Đặt Vé Xem Phim. Thanks for
              watching!
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a href="/" style={{ margin: '8px 12px' }}>
              <i
                className="fab fa-youtube"
                style={{ fontSize: '22px', color: '#2f4f4f' }}
              ></i>
            </a>
            <a href="/" style={{ margin: '8px 12px' }}>
              <i
                className="fab fa-github"
                style={{ fontSize: '22px', color: '#2f4f4f' }}
              ></i>
            </a>
            <a href="/" style={{ margin: '8px 12px' }}>
              <i
                className="fa fa-globe"
                style={{ fontSize: '22px', color: '#2f4f4f' }}
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
