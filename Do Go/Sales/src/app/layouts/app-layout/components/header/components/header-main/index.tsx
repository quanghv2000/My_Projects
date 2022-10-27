import React from 'react';
import logo from 'assets/imgs/logo.png';

import styles from './header-main.module.css';

type IProps = {};

export const HeaderMain: React.FC<IProps> = () => {
  return (
    <div className={styles.headerMain}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.inputSearch}>
          <input type="text" />
        </div>
        <div className={styles.contact}>
          <div className={styles.contactItem}>
            <i className="fa-regular fa-envelope"></i>
            <h3>Zalo: 0966.828.920</h3>
          </div>
          <div className={styles.contactItem}>
            <i className="fa-solid fa-phone"></i>
            <h3>Hotline: 0966.828.920</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
