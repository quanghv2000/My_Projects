import React from 'react';
import { LayoutFooter } from './footer';
import { LayoutHeader } from './header';

import styles from './user-layout.module.scss';

type IProps = {
  content?: JSX.Element;
};

export const UserLayout: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { content } = props;

  return (
    <div className={styles.userLayout}>
      <div className={styles.header}>
        <LayoutHeader />
      </div>
      <div className={styles.content}>{content}</div>
      <div className={styles.footer}>
        <LayoutFooter />
      </div>
    </div>
  );
};
