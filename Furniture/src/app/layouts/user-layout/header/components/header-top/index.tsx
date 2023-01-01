import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from 'app/layouts/user-layout/constant';

import './header-top.css';

type IProps = {};

export const HeaderTop: React.FC<IProps> = () => {
  const { pathname } = useLocation();

  return (
    <div className="header-top d-none d-md-block container">
      <div className="top-bar">
        <ul className="top-links">
          <li>
            <i className="fa fa-envelope"></i> <span>noithathaxiem@gmail.com</span>
          </li>
          <li>
            <i className="fab fa-whatsapp"></i> <span>0966.828.920</span>
          </li>
          {navItems
            .filter(nav => nav.path !== '/trang-chu')
            .map((item, index) => {
              return (
                <li
                  className={`${item.className} ${item.key.includes(pathname) ? 'nav-top-item-active' : ''}`}
                  key={index}
                >
                  <NavLink to={item.path}>{item.label}</NavLink>
                </li>
              );
            })}
        </ul>
        <ul className="top-links">
          <li>
            <i className="fa fa-sign-in-alt"></i> <span>Đăng Nhập</span>
          </li>
          <li>
            <i className="fa fa-power-off"></i> <span>Đăng Ký</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
