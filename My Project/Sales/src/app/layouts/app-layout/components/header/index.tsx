import React from 'react';
import {
  CategoryVertical,
  HeaderBottom,
  HeaderMain,
  HeaderTop,
} from './components';

import styles from './header.module.css';

type IProps = {};

export const HeaderLayout: React.FC<IProps> = () => {
  /** @State_Component */
  const [ctgVerOpening, setCtgVerOpening] = React.useState<boolean>(false);

  /** @Logic_Handler */
  const openCtgVerHanlder = () => {
    setCtgVerOpening(!ctgVerOpening);
  };

  return (
    <div className={styles.headerLayout}>
      <HeaderTop />
      <HeaderMain />
      <HeaderBottom
        ctgVerOpening={ctgVerOpening}
        openCtgVerHanlder={openCtgVerHanlder}
      />
      <CategoryVertical ctgVerOpening={ctgVerOpening} />
    </div>
  );
};
