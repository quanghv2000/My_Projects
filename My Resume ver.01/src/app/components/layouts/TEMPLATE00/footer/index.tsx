import React, { memo } from 'react';
import { Typography } from '@material-ui/core';
import style from './style.module.scss';

const Footer: React.FC<any> = () => {
  return (
    <div className={style['footer']}>
      <div>
        <Typography>Fullstack Developer</Typography>
      </div>
      <div>
        <Typography className={style['footer_copyright']}>
          Designed and Developed by <a href="/">Resume Builder</a>
          <br />
          Clone idea from{' '}
          <a
            href="https://www.facebook.com/TravOnline-107102920886921/"
            target="_blank"
            rel="noreferrer"
          >
            Travonline
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default memo(Footer);
