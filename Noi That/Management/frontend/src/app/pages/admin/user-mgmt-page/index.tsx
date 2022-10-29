/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from 'react';
import { RootState } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Select, Table } from 'antd';
import { Helmet } from 'react-helmet-async';
import { AppButton } from 'app/components/Button';
import { AppInputSearch } from 'app/components/InputSearch';
import { Link } from 'react-router-dom';
import { IUserInfo } from 'models/api-model/response';
import { userInfoColumns } from './components';
import { handleFocusOut } from 'utils';
import { addUserRequestAction, getUsersRequestAction } from './actions';
import {
  ApartmentOutlined,
  CrownOutlined,
  UserOutlined,
} from '@ant-design/icons';

import style from './style.module.scss';

const { Option } = Select;

export const AdminUserMGMTPage: React.FC<any> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { isLoading, usersInfo } = storedData.AdminUserMGMTPageReducer;

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Declare */
  let dataSource: IUserInfo[] = [];
  if (usersInfo.length > 0) {
    dataSource = [...usersInfo];
  }

  /** @Handle_Submit */
  const getUsers = () => {
    const data = dispatch(getUsersRequestAction());
  };

  const addUser = () => {
    const newUser: IUserInfo = {
      id: usersInfo.length + 1,
      username: `newbie${usersInfo.length + 1}`,
      fullName: 'New Bie',
      email: `newbie${usersInfo.length + 1}@gmail.com`,
      phone: '0987222888',
      status: 'unverified',
      roles: ['ROLE_USER'],
    };
    dispatch(addUserRequestAction({ newUser }));
  };

  const searchUers = () => {
    dispatch(getUsersRequestAction());
    handleFocusOut('inputSearch');
  };

  /** @Effect */
  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Admin - User Management Page</title>
        <meta name="description" content="Admin - User Management Page" />
      </Helmet>
      <div className={style.userMGMT}>
        <div className={style.header}>
          <div className="d-flex">
            <AppInputSearch
              id="inputSearch"
              placeholder="Nhập tài khoản người dùng"
              loading={isLoading}
              onSearch={searchUers}
              className={`${style.inputSearch} mr-16`}
            />
            <Select
              defaultValue="all"
              className="mr-16"
              style={{ width: 210 }}
              onChange={searchUers}
              disabled={isLoading}
            >
              <Option value="all">
                <Badge color="blue" text={'Trạng thái (Tất cả - 205)'} />
              </Option>
              <Option value="isActive">
                <Badge color="green" text="Đang hoạt động (144)" />
              </Option>
              <Option value="isLocked">
                <Badge color="red" text="Đang bị khóa (21)" />
              </Option>
              <Option value="unverified">
                <Badge color="gold" text="Chưa xác minh (40)" />
              </Option>
            </Select>
            <Select
              defaultValue="all"
              style={{ width: 225 }}
              onChange={searchUers}
              disabled={isLoading}
            >
              <Option value="all">
                <ApartmentOutlined className="mr-8" />
                <span>{'Phân quyền (Tất cả - 205)'}</span>
              </Option>
              <Option value="ROLE_ADMIN">
                <CrownOutlined
                  className="mr-8"
                  style={{
                    color: '#FEC339',
                    stroke: '#FEC339',
                    strokeWidth: 30,
                  }}
                />
                <span>{'Quản trị viên (55)'}</span>
              </Option>
              <Option value="ROLE_USER">
                <UserOutlined className="mr-8" />
                <span>{'Người dùng (160)'}</span>
              </Option>
            </Select>
          </div>
          <div className={style.btn}>
            <AppButton
              className="mr-16"
              type="export"
              disabled={isLoading}
              onClick={searchUers}
            >
              Xuất File
            </AppButton>
            <Link to="/admin/quan-ly-nguoi-dung/them-nguoi-dung">
              <AppButton type="add" disabled={isLoading} onClick={addUser}>
                Thêm tài khoản
              </AppButton>
            </Link>
          </div>
        </div>
        <Table
          columns={userInfoColumns}
          dataSource={dataSource}
          className={style.tblUsers}
          loading={isLoading}
          rowKey="id"
        />
      </div>
    </Fragment>
  );
};
