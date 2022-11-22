import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header-bottom.module.css';

type IProps = {
  ctgVerOpening: boolean;
  openCtgVerHanlder: () => void;
};

export const HeaderBottom: React.FC<IProps> = ({
  ctgVerOpening,
  openCtgVerHanlder,
}) => {
  return (
    <div className={styles.headerBottom}>
      <div className={styles.content}>
        <div className={styles.category} onClick={openCtgVerHanlder}>
          <i className="fa-solid fa-bars"></i>
          <h3>DANH MỤC SẢN PHẨM</h3>
          {ctgVerOpening ? (
            <i className="fa-solid fa-angle-up"></i>
          ) : (
            <i className="fa-solid fa-angle-down"></i>
          )}
        </div>
        <div className={styles.navLink}>
          <NavLink to="/gioi-thieu">
            <h3>GIỚI THIỆU</h3>
          </NavLink>
          <NavLink to="/gioi-thieu">
            <h3>HƯỚNG DẪN MUA HÀNG</h3>
          </NavLink>
          <NavLink to="/gioi-thieu">
            <h3>THÔNG TIN</h3>
          </NavLink>
          <NavLink to="/gioi-thieu">
            <h3>BẢO HÀNH</h3>
          </NavLink>
          <NavLink to="/gioi-thieu">
            <h3>LIÊN HỆ</h3>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
