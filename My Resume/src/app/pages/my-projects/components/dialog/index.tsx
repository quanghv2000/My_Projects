import React from 'react';

// import styles from './dialog.module.css';

type IProps = {
  projectInfo?: any;
  isOpen?: boolean;
  onClose?: () => void;
};

export const Dialog: React.FC<IProps> = ({ projectInfo }) => {
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
        <div className="modal-content" style={{ height: 'auto' }}>
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
                textTransform: 'uppercase',
              }}
            >
              {projectInfo.name}
            </p>
          </div>
          <div style={{ margin: '0px 24px', height: 'auto' }}>
            <a href={projectInfo.linkWeb} target="_blank" rel="noreferrer">
              <img
                src={projectInfo.imgUrl}
                alt="projectImg.jpg"
                style={{ width: '100%' }}
              />
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 24px 8px',
            }}
          >
            <p
              style={{
                margin: 0,
                padding: 0,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {projectInfo.description}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 8,
            }}
          >
            {projectInfo?.linkYoutobe && (
              <a
                href={projectInfo?.linkYoutobe}
                target="_blank"
                style={{ margin: '8px 12px' }}
                rel="noreferrer"
              >
                <i
                  className="fab fa-youtube"
                  style={{ fontSize: '22px', color: '#2f4f4f' }}
                ></i>
              </a>
            )}
            <a
              href={projectInfo.linkGithub}
              target="_blank"
              style={{ margin: '8px 12px' }}
              rel="noreferrer"
            >
              <i
                className="fab fa-github"
                style={{ fontSize: '22px', color: '#2f4f4f' }}
              ></i>
            </a>
            <a
              href={projectInfo.linkWeb}
              target="_blank"
              style={{ margin: '8px 12px' }}
              rel="noreferrer"
            >
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
