import React from 'react';
import { FooterLayout } from './footer-layout';
import { HeaderLayout } from './header-layout';
import { ProfileLayout } from './profile-layout';

import styles from './app-layout.module.css';

type IProps = {
  content: JSX.Element;
};

export const AppLayout: React.FC<IProps> = props => {
  /** @Props_Value */
  const { content } = props;

  return (
    <div className={styles.userLayout}>
      <div className={`${styles.container}`}>
        <div className="row">
          <div className="col-24 col-sm-24 col-md-24 col-lg-4 col-xl-3 p-24">
            <ProfileLayout />
          </div>
          <div className="col-24 col-sm-24 col-md-24 col-lg-8 col-xl-9 p-24">
            <HeaderLayout />
            <div className={styles.content}>{content}</div>
            <FooterLayout />
          </div>
        </div>
      </div>
    </div>
  );
};
