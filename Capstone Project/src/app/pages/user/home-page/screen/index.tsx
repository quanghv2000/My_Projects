import { NavBar } from 'app/components/navbar';
import { PageWrapper } from 'app/components/page-wrapper';
import { Introduce } from 'app/pages/user/home-page/base/introduce';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useDispatch } from 'react-redux';
import 'antd/dist/antd.min.css';
import { BannerCarousel } from 'app/components/banner-carousel';
import { Footer } from 'app/components/footer';
import { RoomReceiveNotification } from 'app/components/room-receive-notification';
import { IntroAboutUs } from 'app/pages/user/home-page/base/intro-about-us';
import { RoomSuggestion } from 'app/pages/user/home-page/base/room-suggestion';
import { RoomType } from 'app/pages/user/home-page/base/room-type';
import 'app/pages/user/home-page/screen/style.scss';
import { ScrollToTop } from 'hooks/scroll-to-top';

export const HomePage: React.FC<any> = () => {
  // const dispatch = useDispatch();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(250);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY < 320) {
        // if scroll up show the navbar
        setShow(true);
      } else {
        // if scroll down hide the navbar
        setShow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // //useEffect
  // useEffect(() => {
  //   dispatch(getDataTypeOfRentalRequest(''));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Fragment>
      <Helmet>
        <title>
          Hola Houses | Tìm trọ, homestay, nhà nghỉ, KTX, dịch vụ, trải nghiệm
          và nhiều hơn nữa trên Hola Houses, Hoà lạc, hoa lac ...
        </title>
        <meta
          name="description"
          content="Hola Houses | Tìm trọ, homestay, nhà nghỉ, KTX, dịch vụ, trải nghiệm và
      nhiều hơn nữa trên Hola Houses ..."
        />
      </Helmet>
      <ScrollToTop />
      <div className={`active ${show && 'hidden'}`}>
        <NavBar navbarfixed={true} />
      </div>

      <BannerCarousel />
      <PageWrapper>
        <div className="page--content">
          {/* Introducing Hola House */}
          <Introduce />

          {/* Destination Place */}
          {/* <Destination /> */}

          {/* Type of reting */}
          {/* <TypeOfRental /> */}

          {/* Room type for user */}
          <RoomType />

          {/* Type of reting */}
          {/* <TypeOfRental /> */}

          {/* Suggession lists */}
          <RoomSuggestion />

          <RoomReceiveNotification />

          {/* About us */}
          <IntroAboutUs />
        </div>
      </PageWrapper>
      <Footer />
    </Fragment>
  );
};
