import { Col, Row } from 'antd';
import { GoogleMapComponent } from 'app/components/google-map';
import { NavBar } from 'app/components/navbar';
import AccommodationBreadcrumb from 'app/pages/user/accommodation-page/base/accommodation-breadcrumb';
import AccommodationFilterLeft from 'app/pages/user/accommodation-page/base/accommodation-filtersLeft';
import AccomodationFilterTop from 'app/pages/user/accommodation-page/base/accommodation-filtersTop';
import 'app/pages/user/accommodation-page/screen/style.scss';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AccommodationContent from '../base/accommodation-contents';

export interface AccommodationPageProps {
  AccommodationPagePlace: string;
}

export const AccommodationPage = ({
  AccommodationPagePlace,
}: AccommodationPageProps) => {
  const [viewBy, setViewBy] = useState('list');

  const onClickViewBy = (value: string) => {
    setViewBy(value);
  };

  useEffect(() => {
  }, [viewBy]);

  return (
    <Fragment>
      <Helmet>
        <title>Room, apartments and studio rooms in Hoa Lac</title>
        <meta name="description" content="Accommodation" />
      </Helmet>
      <ScrollToTop />
      <NavBar navbarfixed={false} />
      <Row className="accommodation__container">
        <Row className="accommodation__container-wrap">
          <Row className="accommodation__filter-top">
            <Col span={24}>
              <AccomodationFilterTop
                viewBy={viewBy}
                onHandleAccommodationView={onClickViewBy}
              />
            </Col>
          </Row>
          <Row className="accommodation__contents">
            <Row className="accommodation__contents__title">
              <Col span={24}>
                <AccommodationBreadcrumb />
              </Col>
            </Row>

            <Row className="accommodation__contents__filter">
              {viewBy && viewBy === 'list' ? (
                <Col span={18} push={6} className="contents_right">
                  <AccommodationContent
                    accommodationName="Nhà trọ Thuỷ Khiêm"
                    acoommodationLocation="Cây xăng 31 - Thạch Hòa - Thạch Thất"
                    accommodationDescription="Chủ trọ dễ tính, thân thiện. Các bạn thuê phòng đều chăm chỉ học
                 hành và đặc biệt khu trọ rất tốt về mặt an ninh. Có camera, khóa vân
                 tay... Vị trí gần trường đại học FPT, thuận tiện di chuyển."
                    accommodationPrice="(1 Triệu 7 - 2 Triệu) / Tháng"
                    accommodationRate={5}
                  />
                  <AccommodationContent
                    marginTop={10}
                    accommodationName="Nhà trọ Tuấn Cường"
                    acoommodationLocation="Thông 6, Làng Vũ Đại - Việt Nam"
                    accommodationDescription="Chủ trọ dễ tính, thân thiện. Các bạn thuê phòng đều chăm chỉ học
                 hành và đặc biệt khu trọ rất tốt về mặt an ninh. Có camera, khóa vân
                 tay... Vị trí gần trường đại học FPT, thuận tiện di chuyển."
                    accommodationPrice=" < 2Triệu / Tháng"
                    accommodationRate={4.5}
                  />
                  <AccommodationContent
                    marginTop={10}
                    accommodationName="Chung cư Panelka"
                    acoommodationLocation="Quốc lộ 21, Gần Chợ Hòa Lạc - Thạch Thất - Hà Nội"
                    accommodationDescription="Chủ trọ dễ tính, thân thiện. Các bạn thuê phòng đều chăm chỉ học
                 hành và đặc biệt khu trọ rất tốt về mặt an ninh. Có camera, khóa vân
                 tay... Vị trí gần trường đại học FPT, thuận tiện di chuyển."
                    accommodationPrice="(4 Triệu - 6 triệu) / Tháng"
                    accommodationRate={4}
                  />
                </Col>
              ) : (
                <Col span={18} push={6} className="contents_right">
                  <GoogleMapComponent />
                </Col>
              )}

              <Col span={6} pull={18} className="contents_left">
                <AccommodationFilterLeft />
              </Col>
            </Row>
          </Row>
        </Row>
      </Row>
    </Fragment>
  );
};
