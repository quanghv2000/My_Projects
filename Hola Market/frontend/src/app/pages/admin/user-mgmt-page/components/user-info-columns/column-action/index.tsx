import React from 'react';
import { AppButton } from 'app/components';
import { Dropdown, Menu } from 'antd';
import {
  ApartmentOutlined,
  EllipsisOutlined,
  EyeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { IUserInfo } from 'models/api-model/response';

type IProps = {
  record: IUserInfo;
};

export const ColumnAction: React.FC<IProps> = (props: IProps) => {
  /** @Declare */
  const { record } = props;
  const menu = (
    <Menu
      items={[
        {
          key: 'view',
          label: (
            <span className="d-flex aligns-center">
              <EyeOutlined className="mr-8" /> Xem thông tin
            </span>
          ),
        },
        {
          key: 'changePassword',
          label: (
            <span className="d-flex aligns-center">
              <LockOutlined className="mr-8" /> Thay đổi mật khẩu
            </span>
          ),
        },
        {
          key: 'rolesSetting',
          label: (
            <span className="d-flex aligns-center">
              <ApartmentOutlined className="mr-8" /> Phân quyền
            </span>
          ),
        },
      ]}
    />
  );

  /** @Logic_Handler */
  const lockUser = (userId?: number | string) => {
    alert(`lock user: ${userId}`);
  };

  const unlockUser = (userId?: number | string) => {
    alert(`unlock user: ${userId}`);
  };

  const verifyUser = (userId?: number | string) => {
    alert(`verify user: ${userId}`);
  };

  const renderActionBtn = (record: IUserInfo) => {
    const { id: userId, status } = record;

    switch (status) {
      case 'isActive': {
        return (
          <AppButton
            type="lock"
            isBtnTag={true}
            onClick={() => {
              lockUser(userId);
            }}
          >
            Khóa
          </AppButton>
        );
      }
      case 'isLocked': {
        return (
          <AppButton
            type="unlock"
            isBtnTag={true}
            onClick={() => {
              unlockUser(userId);
            }}
          >
            Mở khóa
          </AppButton>
        );
      }
      case 'unverified': {
        return (
          <AppButton
            type="verify"
            isBtnTag={true}
            onClick={() => {
              verifyUser(userId);
            }}
          >
            Xác minh
          </AppButton>
        );
      }
      default: {
        return <></>;
      }
    }
  };

  return (
    <span style={{ display: 'flex' }}>
      <Dropdown overlay={menu} className="mr-16">
        <span
          style={{
            cursor: 'pointer',
            boxSizing: 'border-box',
            height: '26px',
            border: '1px solid #d9d9d9',
            borderRadius: '2px',
            padding: '0px 12px',
          }}
        >
          <EllipsisOutlined style={{ fontSize: 20 }} />
        </span>
      </Dropdown>
      {renderActionBtn(record)}
    </span>
  );
};
