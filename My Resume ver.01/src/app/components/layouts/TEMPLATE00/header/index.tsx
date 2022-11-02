import React, { memo } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import ResumeButton from 'app/components/TEMPLATE00/button';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { HomeRounded, Telegram } from '@material-ui/icons';
import {
  INavLink,
  ISocialUI,
} from 'app/container/subsystem/TEMPLATE00/models/ui-models';

import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.module.scss';

const Header: React.FC<any> = props => {
  /** @Declare */
  const pathname = useLocation().pathname;
  const navLinkItems: INavLink[] = [
    {
      pathname: '/resume',
      caption: 'Resume',
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
  const socials: ISocialUI[] = [
    {
      key: 'facebook',
      link: 'https://www.facebook.com/quanghavan29',
      account: 'Quang Cối',
      icon: <FacebookIcon />,
    },
    {
      key: 'twitter',
      link: 'https://www.facebook.com/quanghavan29',
      account: 'Quang Cối',
      icon: <TwitterIcon />,
    },
    {
      key: 'github',
      link: 'https://github.com/quanghv2000',
      account: 'quanghv2000',
      icon: <GitHubIcon />,
    },
  ];

  console.log('Headerr....');

  return (
    <Navbar bg="light" expand="lg" className={style['header']} sticky="top">
      <Nav.Link as={NavLink} to="/resume" className={style['header_navlink']}>
        <Navbar.Brand className={style['header_home_rounded']}>
          <HomeRounded />
        </Navbar.Brand>
      </Nav.Link>

      <Navbar.Toggle></Navbar.Toggle>

      <Navbar.Collapse>
        <Nav className={style['header_left']}>
          {navLinkItems.map((navLink, index) => {
            return (
              <Nav.Link
                key={index}
                as={NavLink}
                to={navLink.pathname}
                className={
                  pathname === navLink.pathname
                    ? style['header_link_active']
                    : style['header_link']
                }
              >
                {navLink.caption}
              </Nav.Link>
            );
          })}
        </Nav>

        <div className={style['header_right']}>
          {socials.map((social, index) => {
            return (
              <a
                href={social.link}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            );
          })}
        </div>

        <Link to={'/contact'} style={{ textDecoration: 'none' }}>
          <ResumeButton text="Hire Me" icon={<Telegram />} />
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default memo(Header);
