import { Input } from 'antd';
import React from 'react';

type IProps = {
  id?: string;
};

export const AppInput: React.FC<IProps> = (props: IProps) => {
  return <Input />;
};
