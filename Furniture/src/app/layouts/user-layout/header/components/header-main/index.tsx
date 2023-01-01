import React from 'react';
import { NavLink } from 'react-router-dom';

import './header-main.css';

type IProps = {};

export const HeaderMain: React.FC<IProps> = () => {
  return (
    <div className="header-main border-top bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-3 col-12 col-sm-5">
            <NavLink className="navbar-brand mr-lg-5" to={'/trang-chu'}>
              <span className="logo" style={{ color: '#B5800F' }}>
                Nội Thất Hà Xiêm
              </span>
            </NavLink>
          </div>
          <div className="col-lg-6 col-12 col-sm-7">
            <form action="#" className="search">
              <div className="input-group w-100">
                <input type="text" className="form-control" placeholder="Bạn muốn tìm gì?" />
                <div className="input-group-append">
                  <button className="btn btn-primary btn-search" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-12 col-sm-6">
            <div className="right-icons pull-right d-none d-lg-block">
              <div className="single-icon wishlist">
                <NavLink to={'/'}>
                  <i className="fa fa-heart fa-2x"></i>
                </NavLink>
                <span className="badge badge-default">0</span>
              </div>
              <div className="single-icon shopping-cart">
                <NavLink to={'/'}>
                  <i className="fa fa-shopping-cart fa-2x"></i>
                </NavLink>
                <span className="badge badge-default">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
