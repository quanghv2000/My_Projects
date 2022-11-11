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
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <img
            src="https://media.istockphoto.com/id/1273109788/vector/coming-soon-isolated-vector-icon-paper-style-promotion-sign-start-a-new-business-design.jpg?s=612x612&w=0&k=20&c=0APH6QCc371SuCEYLspgp6oh-tE5-rvbK0dzLMRmJGA="
            alt="coming-soon"
          />
        </div>
      </div>
    </div>
  );
};
