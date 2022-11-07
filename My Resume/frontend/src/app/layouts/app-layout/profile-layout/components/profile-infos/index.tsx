import { Timeline } from 'app/components';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
} from 'app/components/timeline/child-components';
import React from 'react';

import styles from './profile-infos.module.css';

type IProps = {};

export const ProfileInfos: React.FC<IProps> = () => {
  const connector = { enabled: true, height: 18 };

  return (
    <div className={styles.profileInfos}>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator
            connector={connector}
            icon={<i className="fa fa-user"></i>}
          />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'Name', value: 'Hà Văn Quang' }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'Gender', value: 'Male' }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent
            info={{ title: 'Birthday', value: '29 June, 2000' }}
          />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'Phone', value: '0986.915.765' }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent
            info={{ title: 'School', value: 'FPT University' }}
          />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot />
          <TimelineContent info={{ title: 'Job', value: 'Web Developer' }} />
        </TimelineItem>
      </Timeline>
    </div>
  );
};
