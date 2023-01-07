import { LayoutAdmin } from 'app/components/admin-layout';
import { ReportList } from 'app/pages/admin/admin-report-management-page/base/report-list';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminReportManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Report Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<ReportList />} />
    </Fragment>
  );
};
