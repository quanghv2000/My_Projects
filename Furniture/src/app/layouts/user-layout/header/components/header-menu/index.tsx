import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from 'app/layouts/user-layout/constant';

import './header-menu.css';

type IProps = {};

export const HeaderMenu: React.FC<IProps> = () => {
  const { pathname } = useLocation();

  return (
    <nav className="navbar navbar-main navbar-expand navbar-light border-top border-bottom">
      <div className="container">
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav">
            <li className="nav-item" style={{ marginRight: 16 }}>
              <Dropdown style={{ height: '40px' }}>
                <Dropdown.Toggle id="dropdown-basic" className="dropdown-toggle">
                  <i className="fa-solid fa-bars"></i>
                  <h3>DANH MỤC SẢN PHẨM</h3>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item className="dropdown-item">Đồ thờ</Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">Nội thất phòng thờ</Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">Nội thất phòng khách</Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">Nội thất phòng ngủ</Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">Nội thất nhà bếp</Dropdown.Item>
                  <Dropdown.Item className="dropdown-item">Tủ kệ</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            {navItems.map((item, index) => {
              return (
                <li
                  className={`nav-item nav-item-link d-none d-lg-block ${
                    item.key.includes(pathname) ? 'nav-menu-item-active' : ''
                  }`}
                  key={index}
                >
                  <NavLink className="nav-link" to={item.path}>
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
