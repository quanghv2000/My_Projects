import React from 'react';
import { FooterLayout, HeaderLayout } from './components';

import styles from './app-layout.module.css';

type IProps = {
  content: JSX.Element;
  breadcrumbs: string[];
};

export const AppLayout: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { content } = props;

  return (
    <div className={styles.appLayout}>
      <HeaderLayout />
      {content}
      <FooterLayout />
    </div>
  );
};
