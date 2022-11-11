import React from 'react';
import { Timeline } from 'app/components';
import {
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
} from 'app/components/timeline/child-components';
import { MyInfos } from 'app/my-infos';

import styles from './profile-infos.module.css';

type IProps = {};

export const ProfileInfos: React.FC<IProps> = () => {
  const connector = { enabled: true, height: 18 };

  return (
    <div className={styles.profileInfos}>
      <Timeline>
        <TimelineItem>
          <TimelineSeparator connector={connector} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'Name', value: MyInfos.name }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'Gender', value: MyInfos.gender }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent
            info={{ title: 'Birthday', value: MyInfos.birthDay }}
          />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'Phone', value: MyInfos.phone }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot connector={connector} />
          <TimelineContent info={{ title: 'School', value: MyInfos.school }} />
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator enabledDot />
          <TimelineContent info={{ title: 'Job', value: MyInfos.job }} />
        </TimelineItem>
      </Timeline>
    </div>
  );
};
