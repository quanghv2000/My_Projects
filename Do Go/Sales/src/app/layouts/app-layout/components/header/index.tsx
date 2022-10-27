import React from 'react';
import { HeaderBottom, HeaderMain, HeaderTop } from './components';

import styles from './header.module.css';

type IProps = {};

export const HeaderLayout: React.FC<IProps> = () => {
  return (
    <div className={styles.headerLayout}>
      <HeaderTop />
      <HeaderMain />
      <HeaderBottom />
    </div>
  );
};
