import React from 'react';

import styles from './skills.module.css';

type IProps = {};

export const Skills: React.FC<IProps> = (props: IProps) => {
  return (
    <div className={styles.skills}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">My Skills</h6>
      </div>
    </div>
  );
};
