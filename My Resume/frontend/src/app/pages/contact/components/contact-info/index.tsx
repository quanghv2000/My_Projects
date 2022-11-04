import React from 'react';

import styles from './contact-info.module.css';

type IProps = {};

export const ContactInfo: React.FC<IProps> = () => {
  return (
    <>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">Contact Information</h6>
      </div>
      <div className={styles.contactInfos}>
        <div className={styles.contactInfoItem}>
          <span>Name: </span> Hà Văn Quang
        </div>
        <div className={styles.contactInfoItem}>
          <span>Phone: </span> 0986.915.765
        </div>
        <div className={styles.contactInfoItem}>
          <span>Email: </span> quanghv2000.dev@gmail.com
        </div>
        <div className={styles.contactInfoItem}>
          <span>Address: </span> Xuân Giang - Sóc Sơn - Hả Nội
        </div>
        <div className={styles.contactInfoItem}>
          <span>School: </span> FPT University
        </div>
        <div className={styles.contactInfoItem}>
          <span>Job: </span> Fullstack Developer
        </div>
        <div>
          <div className={styles.contactInfoSocials}>
            <a
              href="https://www.facebook.com/quanghavan29"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a
              href="https://www.facebook.com/quanghavan29"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://github.com/quanghv2000"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
