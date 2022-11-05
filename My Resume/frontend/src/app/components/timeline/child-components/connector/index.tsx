import React from 'react';

import styles from './connector.module.css';

type IProps = {};

export const Connector: React.FC<IProps> = () => {
  return <div className={styles.connector}></div>;
};
