import React, { Fragment, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/navbar';
import { PageWrapper } from 'app/components/page-wrapper';
import { DetailHeader } from 'app/pages/user/detail-room-page/base/detail-header/index';
import { DetailRoomContent } from 'app/pages/user/detail-room-page/base/detail-room-content/index';
import { ImageGallerys } from 'app/pages/user/detail-room-page/base/image-gallery/index';
import { FeedbackUser } from 'app/pages/user/detail-room-page/base/feedback-user/index';
import { Footer } from 'app/components/footer';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'types/RootState';
import { HouseMap } from 'app/pages/user/detail-room-page/base/house-map';
import {
  getDetailPostRequest,
  clearStateDetailRoom,
} from 'app/pages/user/detail-room-page/screen/action';

export const DetailRoomPage: React.FC<any> = () => {
  const state = useSelector((state: RootState) => state?.detailRoomReducer);

  const dispatch = useDispatch();
  let { id }: any = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getDetailPostRequest({ id: id }));
    }
  }, [id]);

  // clear state redux when component unmount
  useEffect(() => {
    return () => {
      dispatch(clearStateDetailRoom(''));
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>
          Hola Houses{' | '}
          {state?.dataResponse?.post?.house?.name
            ? state?.dataResponse?.post?.house?.name
            : ''}
        </title>
        <meta
          name="description"
          content={state?.dataResponse?.post?.house?.name}
        />
      </Helmet>
      <ScrollToTop />
      <NavBar navbarfixed={true} />

      <Spin spinning={state?.loading} delay={100}>
        <div style={{ paddingTop: 100 }}>
          <PageWrapper>
            {/* <div className="page--room--content"> */}
            <div className="container">
              <DetailHeader />
              <ImageGallerys />
              <DetailRoomContent />
              <div className="detail__room__content--detail__amenities">
                <HouseMap />
              </div>
              <FeedbackUser />
            </div>
          </PageWrapper>

          <Footer />
        </div>
      </Spin>
    </Fragment>
  );
};
