import React from 'react';

import styles from './profile-layout.module.css';

type IProps = {};

export const ProfileLayout: React.FC<IProps> = () => {
  return (
    <div className={styles.profileLayout}>
      <div className={styles.profileHeader}>
        <h3 className={styles.profileName}>Hà Văn Quang</h3>
        <p className={styles.profileEmail}>quanghv2000.dev@gmail.com</p>
      </div>

      <figure className={styles.profileImage}>
        <img
          src="https://res.cloudinary.com/fpt-food/image/upload/v1641068997/My%20Projects/NodeJS%20and%20ReactJS/profile_avatar_kdwi1n.jpg"
          alt="profileImage"
        />
      </figure>

      <div className={styles.profileInfo}>
        {/* <ResumeTimeline icon={<PersonOutlineIcon />} title={null}>
          <ResumeTimelineItem title="Name" text={resumeInfo.name} />
          <ResumeTimelineItem title="Gender" text={resumeInfo.gender} />
          <ResumeTimelineItem
            title="Birthday"
            text={moment(resumeInfo.dob).format('LL')}
          />
          <ResumeTimelineItem title="Phone" text={resumeInfo.phone} />
          <ResumeTimelineItem title="School" text={resumeInfo.school} />
          <ResumeTimelineItem
            title="Job"
            text={resumeInfo.job}
            hiddenConnector={true}
          />
        </ResumeTimeline> */}
        <div className={styles.btnDownloadCV}>
          {/* <a
            href={resumeInfo.cvLink}
            target="_blank"
            style={{ textDecoration: 'none' }}
            rel="noreferrer"
          >
            <ResumeButton text={'Download CV'} icon={<GetAppIcon />} />
          </a> */}
        </div>
      </div>
    </div>
  );
};
