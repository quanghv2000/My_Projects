import React from 'react';
import { Dot } from '../dot';
import { Connector } from '../connector';

import styles from './timeline-separator.module.css';

type IProps = {
  enabledDot?: boolean;
  connector?: {
    enabled?: boolean;
    height?: number | string;
  };
  icon?: JSX.Element;
};

export const TimelineSeparator: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { enabledDot, connector, icon } = props;

  return (
    <>
      <div className={styles.timelineSeparator}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {enabledDot && <Dot />}
        {connector?.enabled && <Connector height={connector?.height}/>}
      </div>
    </>
  );
};
