import React from 'react';
import { MyInfos } from 'app/my-infos';

import styles from './my-projects.module.css';

type IProps = {};

export const MyProjectsPage: React.FC<IProps> = () => {
  const pageSize = 6;

  /** @State_Component */
  const [tabActive, setTabActive] = React.useState<string>('all');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [projects, setProjects] = React.useState(MyInfos.projects);

  const pageTotal = React.useMemo(() => {
    return projects.length % pageSize === 0
      ? projects.length / pageSize
      : Math.floor(projects.length / pageSize) + 1;
  }, [projects]);

  const pageItems = React.useMemo(() => {
    let result: number[] = [];
    for (let i = 0; i < pageTotal; i++) {
      result.push(i + 1);
    }

    return result;
  }, [pageTotal]);

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

    setProjects(projectsDispalyed);
    setTabActive(key);
    setCurrentPage(1);
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
        <div className={`${styles.tabsCbx} dropdown`}>
          <button className="btn btn-secondary btn-sm" data-toggle="dropdown">
            <span>
              {tabActive === 'all'
                ? 'ALL PROJECTS'
                : tabActive.toLocaleUpperCase()}
              {` (${projects.length})`}
            </span>
            <i className="fa fa-sort-down ml-2"></i>
          </button>
          <div className={`${styles.cbxMenu} dropdown-menu`}>
            {tabs.map((item, index) => {
              return (
                <span
                  className={`dropdown-item ${
                    tabActive === item.key ? 'dropdown-item-active' : ''
                  }`}
                  key={index}
                  onClick={() => {
                    onChangeTab(item.key);
                  }}
                >
                  {item.key === 'all' ? item.label + ' PROJECTS' : item.label}
                </span>
              );
            })}
          </div>
        </div>
        <div className="row mt-2">
          {projects
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((item, index) => {
              return (
                <div
                  className="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-12"
                  key={index}
                >
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
        {projects.length > pageSize && (
          <nav>
            <ul className="pagination">
              {currentPage > 1 && (
                <li
                  className="page-item"
                  onClick={() => {
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  <span className="page-link">&laquo;</span>
                </li>
              )}
              {pageItems.map((page, index) => {
                return (
                  <li
                    className={`page-item ${
                      page === currentPage ? 'page-item-active' : ''
                    }`}
                    key={index}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                  >
                    <span className="page-link">{page}</span>
                  </li>
                );
              })}
              {currentPage < pageTotal && (
                <li className="page-item">
                  <span
                    className="page-link"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                    }}
                  >
                    &raquo;
                  </span>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};
