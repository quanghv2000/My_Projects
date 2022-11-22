import { EllipsisOutlined } from '@ant-design/icons';
import React from 'react';

type IProps = {};

export const AppEllipsis: React.FC<IProps> = () => {
  return (
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
  );
};
