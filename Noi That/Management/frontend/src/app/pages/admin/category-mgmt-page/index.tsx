import React, { Fragment } from 'react';
import { Table } from 'antd';
import { Helmet } from 'react-helmet-async';
import { AppButton } from 'app/components/Button';
import { AppInputSearch } from 'app/components/InputSearch';
import { Link } from 'react-router-dom';
import { ctgInfoColumns } from './components/ctg-info-columns';
import { ICategoryInfo } from 'models/api-model/response';

import style from './style.module.scss';

export const AdminCategoryMGMTPage: React.FC<any> = () => {
  const dataSource: ICategoryInfo[] = [
    {
      id: 1,
      name: 'Đồ thờ',
      subCategories: [
        {
          id: 1,
          name: 'Án gian',
        },
        {
          id: 2,
          name: 'Sập thờ',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date(),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 2,
      name: 'Nội thất phòng thờ',
      subCategories: [
        {
          id: 1,
          name: 'Cuốn thư - câu đối',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date(),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 3,
      name: 'Nội thất phòng khách',
      subCategories: [],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 4,
      name: 'Nội thất phòng ngủ',
      subCategories: [
        {
          id: 1,
          name: 'Giường ngủ',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 5,
      name: 'Nội thất nhà bếp',
      subCategories: [
        {
          id: 1,
          name: 'Tủ bếp',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 6,
      name: 'Tủ kệ',
      subCategories: [
        {
          id: 1,
          name: 'Tủ quần áo',
        },
        {
          id: 1,
          name: 'Kệ Tivi',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
  ];

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
            <Link to="/admin/quan-ly-nguoi-dung/them-nguoi-dung">
              <AppButton type="add">Thêm danh mục</AppButton>
            </Link>
          </div>
        </div>
        <Table
          columns={ctgInfoColumns}
          dataSource={dataSource}
          className={style.tblCategories}
          rowKey="id"
        />
      </div>
    </Fragment>
  );
};
