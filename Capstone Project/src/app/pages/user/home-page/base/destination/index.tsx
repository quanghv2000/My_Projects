import React, { Fragment } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { useHistory } from 'react-router-dom';

import {
  ArrowNext,
  ArrowPrev,
} from 'app/pages/user/home-page/base/destination/arrow-slick';
import { destinationData } from 'app/pages/user/home-page/base/destination/template';

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// const sliderArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
export const Destination: React.FC<any> = () => {
  const sliderItem = destinationData.map((item: any, key: any) => {
    return (
      <a href="/accommodation" key={key}>
        <div style={{ padding: '0px 10px', cursor: 'pointer' }}>
          <div>
            <img
              style={{
                height: 300,
                borderRadius: 12,
                width: '100%',
              }}
              alt="images"
              src={item.imageUrl}
            />
          </div>
          <div
            className="mt-10 bold"
            style={{ fontSize: '20px', color: '#000000' }}
          >
            {item.name}
          </div>
          <div style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            Tìm kiếm nhà trọ tại <strong>"{item.name}"</strong> với hơn{' '}
            <strong>"{item.numberOfRoomsAvailable}"</strong> phòng trọ còn
            trống.
          </div>
        </div>
      </a>
    );
  });

  return (
    <Fragment>
      <div className="mt-20">
        <h2 className="bold mb-20">Địa điểm nổi bật</h2>
        <Slider {...settings}>{sliderItem}</Slider>
      </div>
    </Fragment>
  );
};
