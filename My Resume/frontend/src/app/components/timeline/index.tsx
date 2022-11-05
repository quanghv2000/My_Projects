import React, { ReactNode } from 'react';

import styles from './timeline.module.css';

type IProps = {
  children?: ReactNode;
};

export const Timeline: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { children } = props;

  return <ul className={styles.timeline}>{children}</ul>;
};
