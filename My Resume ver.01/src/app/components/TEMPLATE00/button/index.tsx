import React from 'react';
import { Button } from '@material-ui/core';

import style from './style.module.scss';

const ResumeButton: React.FC<any> = ({ text, icon, onClick, children }) => {
  return (
    <Button
      className={style['custom_btn']}
      endIcon={
        icon ? <div className={style['custom_btn_icon']}>{icon}</div> : null
      }
      onClick={onClick}
    >
      <span className={style['custom_btn_text']}>{text ? text : children}</span>
    </Button>
  );
};

export default ResumeButton;
