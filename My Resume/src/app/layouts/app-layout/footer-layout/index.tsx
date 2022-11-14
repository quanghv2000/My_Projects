import React from 'react';

import styles from './footer-layout.module.css';

type IProps = {};

export const FooterLayout: React.FC<IProps> = () => {
  return (
    <div className={styles.footerLayout}>
      <p className={styles.footerTitle}>Fullstack Developer</p>
      <p className={styles.footerCopyright}>
        Designed and Developed by<a href="/">Quang Cối</a>
        <br />
        Clone idea from
        <a href="/">Resume Builder</a>
      </p>
    </div>
  );
};
