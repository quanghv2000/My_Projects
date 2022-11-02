import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@material-ui/core';
import resumeData from 'utils/resumeData';

export const AboutMePageTEMPLATE00: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>My Resume - About Me</title>
        <meta name="description" content="My Resume" />
      </Helmet>
      <Grid container className="section">
        <Grid item className="section_title mb_30">
          <span></span>
          <h6 className="section_title_text">About Me</h6>
        </Grid>
        <Grid item xs={12}>
          <Typography className="aboutme-text">
            {resumeData.aboutMe.content1}
          </Typography>
          <br />
          <Typography className="aboutme-text">
            {resumeData.aboutMe.content2}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};
