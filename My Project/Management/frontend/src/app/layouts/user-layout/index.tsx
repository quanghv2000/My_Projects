import { UserFooterLayout, UserHeaderLayout } from './components';

import styles from './user-layout.module.scss';

export const UserLayout = Content => {
  return function () {
    return (
      <div className={styles.userLayout}>
        <div className={styles.header}>
          <UserHeaderLayout />
        </div>
        <div className={styles.content}>
          <Content />
        </div>
        <div className={styles.footer}>
          <UserFooterLayout />
        </div>
      </div>
    );
  };
};
