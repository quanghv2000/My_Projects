import React from 'react';
import { MyInfos } from 'app/my-infos';

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
          <span>Name: </span> {MyInfos.name}
        </div>
        <div className={styles.contactInfoItem}>
          <span>Phone: </span> {MyInfos.phone}
        </div>
        <div className={styles.contactInfoItem}>
          <span>Email: </span> {MyInfos.email}
        </div>
        <div className={styles.contactInfoItem}>
          <span>Address: </span> {MyInfos.address}
        </div>
        <div className={styles.contactInfoItem}>
          <span>School: </span> {MyInfos.school}
        </div>
        <div className={styles.contactInfoItem}>
          <span>Job: </span> {MyInfos.job}
        </div>
        <div>
          <div className={styles.contactInfoSocials}>
            {MyInfos.socials.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
