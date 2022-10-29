import React from 'react';
import { AppButton } from 'app/components';
import { Dropdown, Menu } from 'antd';
import {
  ApartmentOutlined,
  EllipsisOutlined,
  EyeOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { ICategoryInfo } from 'models/api-model/response';

type IProps = {
  record: ICategoryInfo;
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
              <EyeOutlined className="mr-8" /> Xem chi tiết
            </span>
          ),
        },
        {
          key: 'changePassword',
          label: (
            <span className="d-flex aligns-center">
              <LockOutlined className="mr-8" /> Chỉnh sửa
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

  return (
    <div className="d-flex">
      <span>
        <AppButton isBtnTag type="update" text="Sửa" />
      </span>
      <span className="ml-16">
        <AppButton isBtnTag type="delete" text="Xóa" />
      </span>
    </div>
  );
};
