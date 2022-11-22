import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header-top.module.css';

type IProps = {};

export const HeaderTop: React.FC<IProps> = () => {
  return (
    <div className={styles.headerTop}>
      <div className={styles.sologan}>
        Đồ Gỗ Hà Xiêm - Chất Lượng Tạo Niềm Tin!
      </div>
      <div className={styles.navLink}>
        <NavLink to="/gioi-thieu">Giới thiệu</NavLink>
        <NavLink to="/chinh-sach-mua-hang">Chính sách mua hàng</NavLink>
        <NavLink to="/van-chuyen">Vận chuyển</NavLink>
        <NavLink to="/thanh-toan">Thanh toán</NavLink>
        <NavLink to="/bao-hanh">Bảo hành</NavLink>
        <NavLink to="/huong-dan-mua-hang">Hướng dẫn mua hàng</NavLink>
        <NavLink to="/lien-he">Liên hệ</NavLink>
      </div>
    </div>
  );
};
