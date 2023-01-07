import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import React, { Fragment, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import {
  ArrowNext,
  ArrowPrev,
} from 'app/pages/user/home-page/base/destination/arrow-slick';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types/RootState';

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
export const TypeOfRental: React.FC<any> = () => {
  const dispatch = useDispatch();
  // get data type of rental in admin
  useEffect(() => {
    dispatch(getDataTypeOfRentalRequest(''));
  }, [dispatch]);

  const stateAdmin = useSelector(
    (state: RootState) => state?.adminTypeOfRentalPageReducer
  );
  let sliderItem;
  if (stateAdmin?.dataResponse?.length > 0) {
    sliderItem = stateAdmin?.dataResponse.map((item: any, key: any) => {
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
              style={{ fontSize: '16px', color: '#000000' }}
            >
              {item.name}
            </div>
            <div style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
              <strong>"{347}"</strong> chỗ ở
            </div>
          </div>
        </a>
      );
    });
  }

  return (
    <Fragment>
      <div>
        {/* <h2 className="bold mb-20">Địa điểm nổi bật</h2> */}
        <h2
          className="bold mb-20"
          style={{ color: '#222222', fontSize: 24, padding: '0px 10px' }}
        >
          Loại hình cho thuê
        </h2>
        <Slider {...settings}>{sliderItem}</Slider>
      </div>
    </Fragment>
  );
};
