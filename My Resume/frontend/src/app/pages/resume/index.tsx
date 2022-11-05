import { Timeline } from 'app/components';
import React from 'react';

import styles from './resume.module.css';

type IProps = {};

export const ResumePage: React.FC<IProps> = () => {
  return (
    <div className={styles.resume}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">Resume</h6>
      </div>
      <Timeline />
    </div>
  );
};
