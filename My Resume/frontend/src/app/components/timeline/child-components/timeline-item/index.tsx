import React, { ReactNode } from 'react';

import styles from './timeline-item.module.css';

type IProps = {
  children?: ReactNode;
};

export const TimelineItem: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { children } = props;

  return <li className={styles.timelineItem}>{children}</li>;
};
