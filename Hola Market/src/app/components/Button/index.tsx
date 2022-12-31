import React from 'react';
import { Button, Tag } from 'antd';
import { ButtonType } from './types';
import { getColorBtn, getIconBtn } from './utils';

import btnStyles from './button.module.scss';

type IProps = {
  className?: string;
  text?: string;
  children?: JSX.Element | string;
  style?: object;
  icon?: JSX.Element | null;
  isBtnTag?: boolean;
  type: ButtonType;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const AppButton: React.FC<IProps> = (props: IProps) => {
  let {
    text,
    className,
    children,
    style,
    type,
    isBtnTag,
    icon = getIconBtn(type),
    color = getColorBtn(type),
    disabled,
    onClick,
  } = props;

  // color = color ?? getColorBtn(type);
  // icon = icon ?? getIconBtn(type);

  let disabledStyle = disabled ? 'disabledStyle' : '';

  if (isBtnTag) {
    return (
      <Tag
        onClick={onClick}
        className={`${className} ${btnStyles[type]} ${btnStyles.btnTag} ${btnStyles.btnApp} ${btnStyles[disabledStyle]}`}
        style={style}
        color={color}
        icon={icon}
      >
        {text ?? children}
      </Tag>
    );
  }

  return (
    <Button
      className={`${className} ${btnStyles[type]} ${btnStyles.btnApp} ${btnStyles[disabledStyle]}`}
      style={style}
      onClick={onClick}
      icon={icon}
      disabled={disabled}
    >
      {text ?? children}
    </Button>
  );
};
