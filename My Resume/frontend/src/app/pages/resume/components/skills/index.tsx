import { Dot } from 'app/components/timeline/child-components';
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
      <div className={styles.skillsIntro}>
        <i className="fa-solid fa-laptop-code"></i>
        <p>Web Developer</p>
        <span>I want to become Fullstack Web Developer!</span>
      </div>
      <div className={styles.skillsInfo}>
        <div className="row">
          <div
            className="col-xl-3 col-lg-6 col-sm-6 col-12"
            style={{ padding: '10px 10px' }}
          >
            <div className={styles.skillItem}>
              <p className={styles.skillTitle}>FRONT-END</p>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>ReactJS</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>HTML, CSS, SCSS</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>Javascript</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>Typescript</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>Bootstrap, Antd</div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-sm-6 col-12"
            style={{ padding: '10px 10px' }}
          >
            <div className={styles.skillItem}>
              <p className={styles.skillTitle}>BACK-END</p>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>NodeJS</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>NestJS</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>Javascript</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>Typescript</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>Docker</div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-sm-6 col-12"
            style={{ padding: '10px 10px' }}
          >
            <div className={styles.skillItem}>
              <p className={styles.skillTitle}>DATABASES</p>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>MySQL</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>PostgreSQL</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>MongoDB</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>MSSQL Server</div>
              </div>
              <div className={styles.skillDes}></div>
            </div>
          </div>
          <div
            className="col-xl-3 col-lg-6 col-sm-6 col-12"
            style={{ padding: '10px 10px' }}
          >
            <div className={styles.skillItem}>
              <p className={styles.skillTitle}>SOURCE CONTROL</p>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>GitHub</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>GitLap</div>
              </div>
              <div className={styles.skillDes}>
                <div className={styles.skillDesDot}>
                  <Dot />
                </div>
                <div className={styles.skillDesInfo}>SVN</div>
              </div>
              <div className={styles.skillDes}></div>
              <div className={styles.skillDes}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
