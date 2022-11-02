import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, Typography } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineContent from '@material-ui/lab/TimelineContent';
import ResumeTimeline from 'app/components/TEMPLATE00/timeline';
import { ResumeTimelineSeparator } from 'app/components/TEMPLATE00/timeline-separator';
import resumeData from 'utils/resumeData';

import './style.scss';

export const ResumePageTEMPLATE00: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>My Resume</title>
        <meta name="description" content="My Resume" />
      </Helmet>
      <>
        {/* Education and experiences */}
        <Grid container className="section">
          <Grid item className="section_title mb_30">
            <span></span>
            <h6 className="section_title_text">Resume</h6>
          </Grid>

          <Grid item xs={12} className="resume_timeline">
            <Grid container>
              {/* Experiences */}
              <Grid item sm={12} md={6}>
                <ResumeTimeline title={'Work Experience'} icon={<WorkIcon />}>
                  {resumeData.experiences.map((experience, index) => (
                    <TimelineItem key={index}>
                      <ResumeTimelineSeparator />
                      <TimelineContent
                        style={{
                          paddingTop: 0,
                          paddingBottom: 20,
                        }}
                      >
                        <Typography
                          className="resume_timeline_title"
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginTop: 0,
                          }}
                        >
                          {experience.title}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            color: '#787878',
                            fontWeight: 'bold',
                            paddingTop: 4,
                          }}
                        >
                          {experience.date}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </ResumeTimeline>
              </Grid>
              {/* Education */}
              <Grid item sm={12} md={6}>
                <ResumeTimeline title={'Education'} icon={<SchoolIcon />}>
                  {resumeData.educations.map((experience, index) => (
                    <TimelineItem key={index}>
                      <ResumeTimelineSeparator />
                      <TimelineContent style={{ paddingTop: 0 }}>
                        <Typography
                          className="resume_timeline_title"
                          style={{ fontSize: 16, fontWeight: 'bold' }}
                        >
                          {experience.title}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            color: '#787878',
                            fontWeight: 'bold',
                            paddingTop: 4,
                          }}
                        >
                          {experience.date}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </ResumeTimeline>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* My Skills */}
        <Grid container className="section" style={{ marginTop: 30 }}>
          {/* <MySkills /> */}
        </Grid>
      </>
    </Fragment>
  );
};
