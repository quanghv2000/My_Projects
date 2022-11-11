import React, { memo } from 'react';
import moment from 'moment';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineContent from '@material-ui/lab/TimelineContent';
import GetAppIcon from '@material-ui/icons/GetApp';
import ResumeButton from 'app/components/TEMPLATE00/button';
import ResumeTimeline from 'app/components/TEMPLATE00/timeline';
import { Typography } from '@material-ui/core';
import { ResumeTimelineSeparator } from 'app/components/TEMPLATE00/timeline-separator';
import { resumeInfo } from 'app/container/subsystem/TEMPLATE00/reducers';

import style from './style.module.scss';

const ResumeTimelineItem: React.FC<any> = ({
  title,
  text,
  hiddenConnector,
}) => {
  return (
    <TimelineItem>
      <ResumeTimelineSeparator hiddenConnector={hiddenConnector} />
      <TimelineContent className={style['timeline_content']}>
        <Typography className={style['timelineItem_text']}>
          <span>{title}:</span> {text}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

const Profile = () => {
  console.log('Profile...');

  return (
    <div className={style['profile']}>
      <div className={style['profile_header']}>
        <Typography className={style['profile_header_name']}>
          {resumeInfo.name}
        </Typography>
        <Typography className={style['profile_header_email']}>
          {resumeInfo.email}
        </Typography>
      </div>

      <figure className={style['profile_image']}>
        <img src={resumeInfo.avatarUrl} alt="" />
      </figure>

      {/* <div className={style['profile_information']}>
        {/* <ResumeTimeline icon={<PersonOutlineIcon />} title={null}>
          <ResumeTimelineItem title="Name" text={resumeInfo.name} />
          <ResumeTimelineItem title="Gender" text={resumeInfo.gender} />
          <ResumeTimelineItem
            title="Birthday"
            text={moment(resumeInfo.dob).format('LL')}
          />
          <ResumeTimelineItem title="Phone" text={resumeInfo.phone} />
          <ResumeTimelineItem title="School" text={resumeInfo.school} />
          <ResumeTimelineItem
            title="Job"
            text={resumeInfo.job}
            hiddenConnector={true}
          />
        </ResumeTimeline> */}
        <div className={style['btn_download_cv']}>

        </div>
      </div> */}
    </div>
  );
};

export default memo(Profile);
