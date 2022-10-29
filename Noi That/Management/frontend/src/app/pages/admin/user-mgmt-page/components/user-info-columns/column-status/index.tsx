import React from 'react';
import { Badge } from 'antd';

type IProps = {
  status: string;
};

export const ColumnStatus: React.FC<IProps> = (props: IProps) => {
  const { status } = props;

  return (
    <span>
      {status === 'isActive' ? (
        <Badge color="green" text="Đang hoạt động" />
      ) : null}

      {status === 'isLocked' ? <Badge color="red" text="Đang bị khóa" /> : null}

      {status === 'unverified' ? (
        <Badge color="gold" text="Chưa xác minh" />
      ) : null}
    </span>
  );
};
