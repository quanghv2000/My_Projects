import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, TextField, Typography } from '@material-ui/core';
import { Telegram } from '@material-ui/icons';
import { resumeInfo } from 'app/container/subsystem/TEMPLATE00/reducers';
import { ISocialUI } from '../../models/ui-models';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import ResumeButton from 'app/components/TEMPLATE00/button';

import './style.scss';

export const ContactPageTEMPLATE00: React.FC<any> = () => {
  const socials: ISocialUI[] = [
    {
      key: 'facebook',
      link: 'https://www.facebook.com/quanghavan29',
      account: 'Quang Cối',
      icon: <FacebookIcon />,
    },
    {
      key: 'twitter',
      link: 'https://www.facebook.com/quanghavan29',
      account: 'Quang Cối',
      icon: <TwitterIcon />,
    },
    {
      key: 'github',
      link: 'https://github.com/quanghv2000',
      account: 'quanghv2000',
      icon: <GitHubIcon />,
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>My Resume - Contact</title>
        <meta name="description" content="My Resume" />
      </Helmet>
      <Grid container className="section" spacing={7}>
        {/* Contact form */}
        <Grid item xs={12} lg={7}>
          <Grid container>
            <Grid item className="section_title mb_30">
              <span></span>
              <h6 className="section_title_text">Contact Form</h6>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 25 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="name" label="Name"></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="email" label="Email"></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="message"
                    label="Message"
                    multiline
                    rows={4}
                  ></TextField>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                  <ResumeButton text="Submit" icon={<Telegram />} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Contact information */}
        <Grid item xs={12} lg={5}>
          <Grid item className="section_title mb_30">
            <span></span>
            <h6 className="section_title_text">Contact Information</h6>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 25 }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography className="contactInfo_item">
                  <span>Name: </span> {resumeInfo.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className="contactInfo_item">
                  <span>Phone: </span> {resumeInfo.phone}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className="contactInfo_item">
                  <span>Email: </span> {resumeInfo.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className="contactInfo_item">
                  <span>Address: </span> {resumeInfo.address}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className="contactInfo_item">
                  <span>School: </span> {resumeInfo.school}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className="contactInfo_item">
                  <span>Job: </span> {resumeInfo.job}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Grid container className="contact_socials">
                  {Object.keys(socials).map(key => (
                    <Grid item key={key} className="contact_socials_icon">
                      <a
                        href={socials[key].link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {socials[key].icon}
                      </a>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
