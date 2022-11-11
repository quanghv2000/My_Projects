import React from 'react';

import styles from './button.module.css';

type IProps = {
  type?: 'button' | 'submit' | 'reset';
  text?: string;
  icon?: JSX.Element;
  children?: JSX.Element | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<IProps> = (props: IProps) => {
  /** @Props_Value */
  const { type, text, icon, children, onClick } = props;

  return (
    <button className={styles.btn} type={type} onClick={onClick}>
      <span className={styles.btnText}>{text ? text : children}</span>
      <span className={styles.btnIcon}>{icon}</span>
    </button>
  );
};
