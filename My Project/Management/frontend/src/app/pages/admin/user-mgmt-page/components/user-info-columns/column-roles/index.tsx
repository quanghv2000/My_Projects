import React from 'react';
import { RoleType } from 'models/api-model/types';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

type IProps = {
  roles: RoleType[];
};

export const ColumnRoles: React.FC<IProps> = (props: IProps) => {
  const { roles } = props;
  const userRole =
    roles[0] === 'ROLE_ADMIN' ? (
      <>
        <CrownOutlined
          className="mr-8"
          style={{
            fontSize: '18px',
            color: '#FEC339',
            stroke: '#FEC339',
            strokeWidth: 30,
          }}
        />
        Quản trị viên
      </>
    ) : (
      <>
        <UserOutlined className="mr-8" />
        Người dùng
      </>
    );

  return <span className="d-flex aligns-center">{userRole}</span>;
};
