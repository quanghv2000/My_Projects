import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { INavLink } from 'models/common';
import { Button } from 'app/components';
import { MyInfos } from 'app/my-infos';

import styles from './header-layout.module.css';

type IProps = {};

export const HeaderLayout: React.FC<IProps> = () => {
  /** @Declare */
  const pathname = useLocation().pathname;
  const navLinkItems: INavLink[] = [
    {
      pathname: '/resume',
      caption: 'Resume',
    },
    {
      pathname: '/my-projects',
      caption: 'My Projects',
    },
    {
      pathname: '/about-me',
      caption: 'About Me',
    },
    {
      pathname: '/contact',
      caption: 'Contact',
    },
  ];

  return (
    <div className={styles.headerLayout}>
      <nav className={`${styles.navbar} navbar navbar-expand-sm`}>
        <NavLink className={styles.navbrand} to="/resume">
          <i className="fa-sharp fa-solid fa-house"></i>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
        >
          <i
            className="fa-solid fa-bars"
            style={{
              fontSize: 30,
              color: 'gray',
            }}
          ></i>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className={`${styles.navbarNav} navbar-nav mr-auto`}>
            {navLinkItems.map((navlink, index) => {
              return (
                <li
                  className={`${
                    navlink.pathname === pathname
                      ? styles.navItemActive
                      : styles.navItem
                  } nav-item`}
                  key={index}
                >
                  <NavLink
                    to={navlink.pathname}
                    className={
                      navlink.pathname === pathname
                        ? styles.navlinkActive
                        : styles.navlink
                    }
                  >
                    {navlink.caption}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className={`${styles.headerLeft} d-flex`}>
            <div className={styles.socials}>
              {MyInfos.socials.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className={item.icon}></i>
                  </a>
                );
              })}
            </div>

            <Link to={'/contact'} style={{ textDecoration: 'none' }}>
              <Button
                text="Hire Me"
                icon={<i className="fa-solid fa-paper-plane"></i>}
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
