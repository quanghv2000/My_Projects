import React, { memo } from 'react';
import Header from './header';
import Profile from './profile';
import Footer from './footer';
import { Container, Grid } from '@material-ui/core';

import style from './style.module.scss';

type IProps = {
  content: JSX.Element;
};

const TEMPLATE00Layout: React.FC<any> = (props: IProps) => {
  const { content } = props;

  return (
    <div className={style['TEMPLATE00Layout']}>
      <Container className={style['top_60']}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} lg={3} md={4}>
            <Profile />
          </Grid>
          <Grid item xs>
            <Header />

            <div className={style['main_content']}>{content}</div>

            <Footer />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default memo(TEMPLATE00Layout);
