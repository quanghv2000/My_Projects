import React from 'react';

type IProps = {
  index: number;
};

export const ColumnIndex: React.FC<IProps> = (props: IProps) => {
  const { index } = props;
  return <span style={{ fontWeight: 'bold' }}>{index + 1}</span>;
};
