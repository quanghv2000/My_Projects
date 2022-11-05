import { Timeline } from "app/components";
import { TimelineItem, TimelineSeparator } from "app/components/timeline/child-components";
import React from "react";

import styles from './profile-infos.module.css';

type IProps = {}

export const ProfileInfos: React.FC<IProps> = () => {
    return (
        <div className={styles.profileInfos}>
            <Timeline>
                <TimelineItem>
                    <TimelineSeparator enabledConnector icon={<i className="fa fa-user"></i>} />
                    {/* <TimelineContent /> */}
                </TimelineItem>
                <TimelineItem>
                    <TimelineSeparator enabledDot enabledConnector />
                    {/* <TimelineContent /> */}
                </TimelineItem>
            </Timeline>
        </div>
    )
}