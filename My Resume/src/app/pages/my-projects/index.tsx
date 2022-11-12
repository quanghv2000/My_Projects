import React from 'react';
import { MyInfos } from 'app/my-infos';

import styles from './my-projects.module.css';

type IProps = {};

export const MyProjectsPage: React.FC<IProps> = () => {
  const pageSize = 6;

  /** @State_Component */
  const [tabActive, setTabActive] = React.useState<string>('all');
  // const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [projects, setProjects] = React.useState(
    MyInfos.projects.filter((item, index) => index < pageSize),
  );

  /** @Decalre */
  const tabs = [
    {
      key: 'all',
      label: 'ALL',
    },
    {
      key: 'html-css',
      label: 'HTML-CSS',
    },
    {
      key: 'reactjs',
      label: 'REACTJS',
    },
    {
      key: 'nodejs',
      label: 'NODEJS',
    },
    {
      key: 'other-projects',
      label: 'OTHER PROJECTS',
    },
  ];

  /** @Logic_Handler */
  const onChangeTab = (key: string) => {
    const projectsDispalyed =
      key === 'all'
        ? MyInfos.projects
        : MyInfos.projects.filter(item => item.key === key);

    setProjects(projectsDispalyed.filter((item, index) => index < pageSize));
    setTabActive(key);
  };

  return (
    <div className={styles.myProjects}>
      <div className="section_title mb_30">
        <span></span>
        <h6 className="section_title_text">My Projects</h6>
      </div>
      <div>
        <ul className={styles.tabs}>
          {tabs.map((item, index) => {
            return (
              <li
                key={index}
                className={`${
                  tabActive === item.key ? styles.tabItemActive : ''
                } ${styles.tabItem}`}
                onClick={() => {
                  onChangeTab(item.key);
                }}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
        <div className="row mt-2">
          {projects.map((item, index) => {
            return (
              <div className="col-4" key={index}>
                <div className={styles.card}>
                  <img
                    src={item.imgUrl}
                    className={styles.cardImg}
                    alt="project-img"
                  />
                  <div className="mt-2">
                    <h5 className={styles.cardTitle}>{item.name}</h5>
                    <p className={styles.cardText}>{item.type}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.pagination}>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <span className="page-link">&laquo;</span>
            </li>
            <li className="page-item">
              <span className="page-link">1</span>
            </li>
            <li className="page-item">
              <span className="page-link">2</span>
            </li>
            <li className="page-item">
              <span className="page-link">3</span>
            </li>
            <li className="page-item">
              <span className="page-link">&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
