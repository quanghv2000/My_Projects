import { LayoutAdmin } from 'app/components/admin-layout';
import { PostingFeedbackList } from 'app/pages/admin/admin-feedback-management-page/base/post-feedback-list';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

export const AdminFeedbackManagementPage: React.FC<any> = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Hola Houses Admin - Feedback Management</title>
        <meta name="description" content="Hola Houses" />
      </Helmet>
      <LayoutAdmin content={<PostingFeedbackList />} />
    </Fragment>
  );
};
