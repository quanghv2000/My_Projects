import React, { CSSProperties } from 'react';

import styles from './connector.module.css';

type IProps = {
  style?: CSSProperties;
  className?: string;
  height?: number | string;
};

export const Connector: React.FC<IProps> = (props: IProps) => {
  const { style, className, height } = props;

  return (
    <div
      className={`${className} ${styles.connector}`}
      style={{ ...style, height: height }}
    ></div>
  );
};
