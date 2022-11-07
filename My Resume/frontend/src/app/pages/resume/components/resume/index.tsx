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
      <div className="section_title">
        <span></span>
        <h6 className="section_title_text">Resume</h6>
      </div>
      <div className="row">
        <div className="col-xl-6 col-lg-12 mt-30">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator
                connector={connector}
                icon={<i className="fa fa-briefcase"></i>}
              />
              <TimelineContent titleHeader="Work Experience" />
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator
                enabledDot
                connector={{ enabled: true, height: 70 }}
              />
              <TimelineContent
                titleDot="FPT Software Company"
                timelinePeriod="05/2021 - 06/2023"
                description={
                  <>
                    <span style={{ fontWeight: 600, color: 'gray' }}>
                      - Technical: Javascript, Typescript, ReactJS, NestJS
                    </span>
                    <br />
                    <span>
                      - Responsible for the design and construction of websites.
                    </span>
                  </>
                }
              />
            </TimelineItem>
          </Timeline>
        </div>
        <div className="col-xl-6 col-lg-12 mt-30">
          <Timeline>
            <TimelineItem>
              <TimelineSeparator
                connector={connector}
                icon={<i className="fa fa-graduation-cap"></i>}
              />
              <TimelineContent titleHeader="Education" />
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator
                enabledDot
                connector={{ enabled: true, height: 70 }}
              />
              <TimelineContent
                titleDot="FPT University - Hà Nội"
                timelinePeriod="09/2018 - 09/2022"
                description={
                  <>
                    <span style={{ fontWeight: 600, color: 'gray' }}>
                      - GPA: 3.0/4.0 - 7.6/10
                    </span>
                    <br />
                    <span>
                      - My major at university is software engineering!
                    </span>
                  </>
                }
              />
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  );
};
