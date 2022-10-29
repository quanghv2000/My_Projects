/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from 'react';
import { Table } from 'antd';
import { Helmet } from 'react-helmet-async';
import { AppButton, AppInputSearch } from 'app/components';
import { Link } from 'react-router-dom';
import { ctgInfoColumns } from './components/ctg-info-columns';
import { RootState } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequestAction } from './actions';

import style from './style.module.scss';

export const AdminCategoryMGMTPage: React.FC<any> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { categoriesInfo } = storedData.CategoryMGMTPageReducer;

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Effect */
  React.useEffect(() => {
    dispatch(getCategoriesRequestAction());
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Admin - Quản lý danh mục</title>
        <meta name="description" content="Admin - Quản lý danh mục" />
      </Helmet>
      <div className={style.ctgMGMT}>
        <div className={style.header}>
          <div className="d-flex">
            <AppInputSearch
              id="inputSearch"
              placeholder="Nhập tên danh mục"
              className={`${style.inputSearch} mr-16`}
            />
          </div>
          <div className={style.btn}>
            <AppButton className="mr-16" type="export">
              Xuất File
            </AppButton>
            <Link to="/admin/quan-ly-danh-muc/them-danh-muc">
              <AppButton type="add">Thêm danh mục</AppButton>
            </Link>
          </div>
        </div>
        <Table
          columns={ctgInfoColumns}
          dataSource={categoriesInfo}
          className={style.tblCategories}
          rowKey="id"
        />
      </div>
    </Fragment>
  );
};
