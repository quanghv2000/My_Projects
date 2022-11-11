import React from 'react';
import { Button } from 'app/components';
import { ProfileInfos } from './components';
import { MyInfos } from 'app/my-infos';

import styles from './profile-layout.module.css';

type IProps = {};

export const ProfileLayout: React.FC<IProps> = () => {
  return (
    <div className={styles.profileLayout}>
      <div className={styles.profileHeader}>
        <h3 className={styles.profileName}>{MyInfos.name}</h3>
        <p className={styles.profileEmail}>{MyInfos.email}</p>
      </div>

      <div style={{ position: 'relative' }}>
        <figure className={styles.profileImage}>
          <img src={MyInfos.imgUrl} alt="profileImage" />
        </figure>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#ffc500',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: -20,
            left: 10,
          }}
        >
          <i className="fa fa-user" style={{ color: '#2f4f4f' }}></i>
        </div>
      </div>

      <ProfileInfos />

      <div className={styles.btnDownloadCV}>
        <a
          href={MyInfos.cvUrl}
          target="_blank"
          style={{ textDecoration: 'none' }}
          rel="noreferrer"
        >
          <Button
            text={'Download CV'}
            icon={<i className="fa fa-download"></i>}
          />
        </a>
      </div>
    </div>
  );
};
