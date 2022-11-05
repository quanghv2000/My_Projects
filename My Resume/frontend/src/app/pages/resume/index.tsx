import { Timeline } from 'app/components';
import {
  TimelineItem,
  TimelineSeparator,
} from 'app/components/timeline/child-components';
import React from 'react';

import styles from './resume.module.css';

type IProps = {};

export const ResumePage: React.FC<IProps> = () => {
  return (
    <>
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
                  enabledConnector
                  icon={<i className="fa fa-briefcase"></i>}
                />
                {/* <TimelineContent /> */}
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator enabledDot enabledConnector />
                {/* <TimelineContent /> */}
              </TimelineItem>
            </Timeline>
          </div>
          <div className="col-6">
            <Timeline>
              <TimelineItem>
                <TimelineSeparator
                  enabledConnector
                  icon={<i className="fa fa-graduation-cap"></i>}
                />
                {/* <TimelineContent /> */}
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator enabledDot enabledConnector />
                {/* <TimelineContent /> */}
              </TimelineItem>
            </Timeline>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};
