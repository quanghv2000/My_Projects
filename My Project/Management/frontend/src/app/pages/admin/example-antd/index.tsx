import AdminLayout from 'app/layouts/admin-layout';
import React from 'react';

type IProps = {};

const ExampleAntd: React.FC<IProps> = (props: IProps) => {
  return <AdminLayout content={<div>ExampleAntd</div>} />;
};

export default ExampleAntd;
