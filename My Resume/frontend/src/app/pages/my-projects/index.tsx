import React from 'react';

import styles from './my-projects.module.css';

type IProps = {};

export const MyProjectsPage: React.FC<IProps> = () => {
  return (
    <div className={styles.myProjects}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">My Projects</h6>
      </div>
    </div>
  );
};
