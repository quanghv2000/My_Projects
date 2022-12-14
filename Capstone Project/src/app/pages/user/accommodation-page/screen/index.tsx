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
                    accommodationName="Nh?? tr??? Thu??? Khi??m"
                    acoommodationLocation="C??y x??ng 31 - Th???ch H??a - Th???ch Th???t"
                    accommodationDescription="Ch??? tr??? d??? t??nh, th??n thi???n. C??c b???n thu?? ph??ng ?????u ch??m ch??? h???c
                 h??nh v?? ?????c bi???t khu tr??? r???t t???t v??? m???t an ninh. C?? camera, kh??a v??n
                 tay... V??? tr?? g???n tr?????ng ?????i h???c FPT, thu???n ti???n di chuy???n."
                    accommodationPrice="(1 Tri???u 7 - 2 Tri???u) / Th??ng"
                    accommodationRate={5}
                  />
                  <AccommodationContent
                    marginTop={10}
                    accommodationName="Nh?? tr??? Tu???n C?????ng"
                    acoommodationLocation="Th??ng 6, L??ng V?? ?????i - Vi???t Nam"
                    accommodationDescription="Ch??? tr??? d??? t??nh, th??n thi???n. C??c b???n thu?? ph??ng ?????u ch??m ch??? h???c
                 h??nh v?? ?????c bi???t khu tr??? r???t t???t v??? m???t an ninh. C?? camera, kh??a v??n
                 tay... V??? tr?? g???n tr?????ng ?????i h???c FPT, thu???n ti???n di chuy???n."
                    accommodationPrice=" < 2Tri???u / Th??ng"
                    accommodationRate={4.5}
                  />
                  <AccommodationContent
                    marginTop={10}
                    accommodationName="Chung c?? Panelka"
                    acoommodationLocation="Qu???c l??? 21, G???n Ch??? H??a L???c - Th???ch Th???t - H?? N???i"
                    accommodationDescription="Ch??? tr??? d??? t??nh, th??n thi???n. C??c b???n thu?? ph??ng ?????u ch??m ch??? h???c
                 h??nh v?? ?????c bi???t khu tr??? r???t t???t v??? m???t an ninh. C?? camera, kh??a v??n
                 tay... V??? tr?? g???n tr?????ng ?????i h???c FPT, thu???n ti???n di chuy???n."
                    accommodationPrice="(4 Tri???u - 6 tri???u) / Th??ng"
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
