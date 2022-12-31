import React from 'react';
import { Carousel } from 'antd';
import { Categories } from './components/categories';
import { Products } from './components/products';

import styles from './home-page.module.scss';

export const HomePage: React.FC<any> = () => {
  const images = [
    'https://cdn.chotot.com/admincentre/yCX8feM36i2ULN_7Ypnea8GBoDk28bIelcXiRyRGRPo/preset:raw/plain/e99c27c504b7a386c3a7ca993e4cfdd1-2791449285793933357.jpg',
    'https://cdn.chotot.com/admincentre/2mcMHvkA-Nlw2yUsG3afzA-_lqf4AsO67pbKlkizg7I/preset:raw/plain/d6e9ef72c2a95fc7ed272e386fd8388f-2793628229297090096.jpg',
    'https://cdn.chotot.com/admincentre/qyuquuVZj9lhzbyLKBLx7Wy0vpdnQwM4VRAvUvLEB9w/preset:raw/plain/3cb28d86988a80a08465436c82a7dbeb-2777793256872343522.jpg',
  ];

  return (
    <div className={styles.homePage}>
      <Carousel autoplay className={styles.carousel}>
        {images.map((item, index) => {
          return (
            <div className={styles.imgCarousel} key={index}>
              <img src={item} alt="img-carousel" />
            </div>
          );
        })}
      </Carousel>
      <Categories />
      <Products />
    </div>
  );
};
