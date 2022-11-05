import React from 'react';
import { Button } from 'app/components';
import { ProfileInfos } from './components';

import styles from './profile-layout.module.css';

type IProps = {};

export const ProfileLayout: React.FC<IProps> = () => {
  return (
    <div className={styles.profileLayout}>
      <div className={styles.profileHeader}>
        <h3 className={styles.profileName}>Hà Văn Quang</h3>
        <p className={styles.profileEmail}>quanghv2000.dev@gmail.com</p>
      </div>

      <figure className={styles.profileImage}>
        <img
          src="https://res.cloudinary.com/fpt-food/image/upload/v1641068997/My%20Projects/NodeJS%20and%20ReactJS/profile_avatar_kdwi1n.jpg"
          alt="profileImage"
        />
      </figure>

      <div className={styles.profileInfo}>
        <ProfileInfos />
        <div className={styles.btnDownloadCV}>
          <a
            href={"https://www.topcv.vn/xem-cv/C1RQAgJcUlEAAVUCBlQHUAIPUAxWVwVUAVAEAw1850"}
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <Button text={'Download CV'} icon={<i className="fa fa-download"></i>}/>
          </a>
        </div>
      </div>
    </div>
  );
};
