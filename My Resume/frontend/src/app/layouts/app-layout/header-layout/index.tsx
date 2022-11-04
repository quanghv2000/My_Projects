import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { INavLink } from 'models/common';
import { Button } from 'app/components';

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

  console.log('pathname: ', pathname);

  return (
    <div className={styles.headerLayout}>
      <nav className="navbar navbar-expand-xl">
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
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            {navLinkItems.map((navlink, index) => {
              return (
                <li className="nav-item">
                  <NavLink
                    key={index}
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
          <div className="d-flex">
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/quanghavan29"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-square-facebook"></i>
              </a>
              <a
                href="https://www.facebook.com/quanghavan29"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a
                href="https://github.com/quanghv2000"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
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
