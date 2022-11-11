import React from 'react';

import styles from './about-me.module.css';

type IProps = {};

export const AboutMePage: React.FC<IProps> = () => {
  /** @Declare */
  const numOfYearsExp = new Date().getFullYear() - 2021;

  return (
    <div className={styles.aboutMe}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">About Me</h6>
      </div>
      <div>
        <p>
          <b>Hello! I'm "Quang Cối".</b> I Have <b>{numOfYearsExp}+ years</b> of
          experience in building Web applications and experience in working on
          projects, good teamwork skills & self-training skills, problem
          solving, organizing, work well under pressure.
        </p>
        <br />
        <p>
          In addition, I am also a music lover and I can play traditional
          instruments such as <b>Flute</b>.
        </p>
        <br />
        <p>
          My goal is to become <b>Fullstack Web Developer</b>.
        </p>
      </div>
    </div>
  );
};
