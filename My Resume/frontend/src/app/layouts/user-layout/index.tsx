import React from 'react';
import { FooterLayout } from './footer-layout';
import { HeaderLayout } from './header-layout';
import { ProfileLayout } from './profile-layout';

import styles from './user-layout.module.css';

type IProps = {
  breadcrumbs: string[];
  content: JSX.Element;
};

export const UserLayout: React.FC<IProps> = props => {
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
            {content}
            <FooterLayout />
          </div>
        </div>
      </div>
    </div>
  );
};
