import { Fragment } from 'react';
import { Carousel } from 'antd';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components/macro';
// import { useTranslation } from 'react-i18next';
// import { translations } from 'locales/translations';
// import { Link } from 'react-router-dom';
import { SearchBarMobile } from 'app/components/search-bar-mobile';
import { SearchBar } from 'app/components/search-bar';
import { NavBar } from 'app/components/navbar-image';
import 'app/components/banner-carousel/style.scss';
// import { SearchBar } from 'app/components/search-bar';

// const contentStyle: any = {
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center',
//   background: '#6d2d2d',
// };

export const PageWrapper = styled.div`
  width: 100%;
  box-sizing: content-box;
`;

export const BannerCarousel: React.FC<any> = () => {
  // const { t } = useTranslation();
  return (
    <Fragment>
      {/* <PageWrapper> */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          className="banner__container"
          style={{
            position: 'absolute',
            zIndex: 99,
            color: 'white',
            // paddingLeft: 300,
            paddingTop: 50,
            // paddingRight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <NavBar />
          <div className="banner--discription--container">
            <div className="banner--discription">
              Ứng dụng tìm kiếm phòng trọ miễn phí cho học sinh, sinh viên tại
              Việt Nam
            </div>
            {/* <SearchBar /> */}
          </div>
          <div className="banner--searchBar--container">
            <div className="banner--searchBar">
              <SearchBar />
            </div>
          </div>
        </div>
        <Carousel
          autoplay
          // style={{ position: 'relative' }}
          // className="pt-50"
        >
          {/* <LazyLoadImage
            effect="blur"
            src="https://spa-homepage.uniplaces.com/_next/image?url=https://images.prismic.io/spa-homepage/bc91d65a-a238-4c11-b8c4-3147e2604f13_offer_pt_porto_252585_5.jpg?auto=compress,format&w=1920&q=70"
            alt="alt"
            style={{
              width: '100%',
              height: 200,
              borderRadius: '12px !important',
            }}
          /> */}
          {/* <LazyLoadImage
            effect="blur"
            src="https://www.ohanaliving.vn/542ac03681516bcca0dd605bedd41a2b.jpg"
            alt="alt"
            style={{
              width: '100%',
              height: 200,
              borderRadius: '12px !important',
            }}
          /> */}
          <img
            className="image--carousel"
            alt="long"
            src="https://res.cloudinary.com/hoahouse/image/upload/v1659539933/ivszhikmmjhqxhje9uf6.jpg"
          />
          {/* <img
            className="image--carousel"
            alt="long1"
            src="https://res.cloudinary.com/hoahouse/image/upload/v1659539933/xcubnm0suv7cstkabmje.jpg"
          /> */}
        </Carousel>
      </div>
      <div className="banner--searchBar--pc">
        <SearchBarMobile />
      </div>
      {/* </PageWrapper> */}
    </Fragment>
  );
};
