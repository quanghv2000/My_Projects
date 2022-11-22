import React from 'react';
import { NavLink } from 'react-router-dom';
import { InputSearch } from './components';

import styles from './header.module.scss';

export const LayoutHeader: React.FC<any> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.logo}>
          <h1>My Project Study</h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navbar}>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                <i className="fa fa-home mr-8"></i>
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                <i className="fab fa-slideshare mr-8"></i>
                <span>Quản lý tin</span>
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                <i className="fa fa-shopping-bag mr-8"></i>
                <span>Đơn hàng</span>
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                <i className="fab fa-facebook-messenger mr-8"></i>
                <span>Chat</span>
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                <i className="fa fa-bell mr-8"></i>
                <span>Thông báo</span>
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink to="/" className={styles.navLink}>
                <i className="fa fa-ellipsis-h mr-8"></i>
                <span>Thêm</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.inputSearch}>
          <InputSearch />
        </div>
        <NavLink to="/admin/quan-ly-nguoi-dung">
          <div className={styles.login}>
            <i className="fa fa-user-circle mr-8"></i>
            <span>Đăng nhập</span>
          </div>
        </NavLink>
        <NavLink to="/admin/quan-ly-nguoi-dung">
          <div className={styles.btnPosting}>
            <button>
              <i className="fa fa-edit"></i>
              <span>ĐĂNG TIN</span>
            </button>
          </div>
        </NavLink>
      </div>
    </header>
  );
};
