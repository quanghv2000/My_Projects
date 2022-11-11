import React from 'react';

import styles from './footer-layout.module.css';

type IProps = {};

export const FooterLayout: React.FC<IProps> = () => {
  return (
    <div className={styles.footerLayout}>
      <p className={styles.footerTitle}>Fullstack Developer</p>
      <p className={styles.footerCopyright}>
        Designed and Developed by<a href="/">Resume Builder</a>
        <br />
        Clone idea from
        <a
          href="https://www.facebook.com/TravOnline-107102920886921/"
          target="_blank"
          rel="noreferrer"
        >
          Travonline
        </a>
      </p>
    </div>
  );
};
