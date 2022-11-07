import React from 'react';
import { Timeline } from 'app/components';
import {
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from 'app/components/timeline/child-components';

import styles from './resume.module.css';

type IProps = {};

export const Resume: React.FC<IProps> = (props: IProps) => {
  const connector = { enabled: true, height: 20 };

  return (
    <div className={styles.resume}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">Resume</h6>
      </div>
      <div className="row">
        <div className="col-6">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator
                connector={connector}
                icon={<i className="fa fa-briefcase"></i>}
              />
              <TimelineContent titleHeader="Work Experience" />
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator enabledDot connector={connector} />
              <TimelineContent
                titleDot="FPT Software Company"
                timelinePeriod="05/2021 - 06/2023"
              />
            </TimelineItem>
          </Timeline>
        </div>
        <div className="col-6">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator
                connector={connector}
                icon={<i className="fa fa-graduation-cap"></i>}
              />
              <TimelineContent titleHeader="Education" />
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator enabledDot connector={connector} />
              <TimelineContent
                titleDot="FPT University - Hà Nội"
                timelinePeriod="09/2018 - 09/2022"
              />
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  );
};
