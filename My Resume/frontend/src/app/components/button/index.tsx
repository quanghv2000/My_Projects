import React from 'react';

import styles from './button.module.css';

type IProps = {
  text?: string;
  icon?: JSX.Element;
  children?: JSX.Element | string;
  onClick?: () => void;
};

export const Button: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { text, icon, children, onClick } = props;

  return (
    <button className={styles.btn} onClick={onClick}>
      <span className={styles.btnText}>{text ? text : children}</span>
      <span className={styles.btnIcon}>{icon}</span>
    </button>
  );
};
