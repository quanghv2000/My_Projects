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
  const connector = { enabled: true, height: 20 };
  const info = {property: 'Name', value: 'Hà Văn Quang'}

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
          <TimelineContent info={info}/>
        </TimelineItem>
      </Timeline>
    </div>
  );
};
