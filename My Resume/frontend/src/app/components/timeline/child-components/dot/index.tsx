import React from 'react';

import styles from './dot.module.css';

type IProps = {};

export const Dot: React.FC<IProps> = () => {
  return (
    <div className={styles.dot}>
      <span></span>
    </div>
  );
};
