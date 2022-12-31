import React from 'react';
import styles from './product.module.scss';

export const Products: React.FC<any> = () => {
  const productList = [
    {
      name: 'Giày độn đế kẻ nhỏ',
      price: 2300000,
      starScore: 4.5,
      postingTime: '23 giờ trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/e69b6e810b24f1b1dda8f989335b938c.jpg_200x200q80.jpg_.webp',
    },
    {
      name: 'Tai nghe Bluetooth I7',
      price: 538000,
      starScore: 4.2,
      postingTime: '2 ngày trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/mdc/381e652c022e667d4af424f619c5ed62.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Quần Jogger thể thao',
      price: 198000,
      starScore: 4.6,
      postingTime: '4 ngày trước',
      address: 'TP. HCM',
      img: 'https://lzd-img-global.slatic.net/g/p/950832f2dbced57735e5715f1f0f0ba9.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Áo sweater bỉ chui',
      price: 210000,
      starScore: 5,
      postingTime: '4 giờ trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/4a60234104c3fbdccc18605ce172f6e0.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Giày thể thao Sneaker',
      price: 650000,
      starScore: 4.7,
      postingTime: '16 giờ trước',
      address: 'TP. HCM',
      img: 'https://lzd-img-global.slatic.net/g/p/159b2ded93f68196b3487adbf9c59f1c.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Áo sơ mi nam cao cấp',
      price: 175000,
      starScore: 4.8,
      postingTime: '16 ngày trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/5df4867c505869b935d7d066becafe96.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Áo khoác dù FS',
      price: 250000,
      starScore: 4.8,
      postingTime: '6 ngày trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/63b7934fddfe7a1874be520059cb8aef.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Cốc uống cafe',
      price: 93000,
      starScore: 4.5,
      postingTime: '3 ngày trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/8fcea431b6d44fae743df78225ad28d8.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Dép Nam, Nữ MLB',
      price: 125000,
      starScore: 4.3,
      postingTime: '20 giờ trước',
      address: 'TP. HCM',
      img: 'https://lzd-img-global.slatic.net/g/p/06bc7c6ccc8fbe21428eb71cb30b42a8.jpg_400x400q80.jpg_.webp',
    },
    {
      name: 'Áo thun Polo Nam',
      price: 119000,
      starScore: 4.5,
      postingTime: '2 ngày trước',
      address: 'Hà Nội',
      img: 'https://lzd-img-global.slatic.net/g/p/80f76c949effd87524afea6c1383305e.jpg_400x400q80.jpg_.webp',
    },
  ];

  return (
    <div className={styles.products}>
      <h3>Sản phẩm mới</h3>
      <div className={`${styles.productList}`}>
        {productList.map((item, index) => {
          return (
            <div className={`${styles.productItem}`} key={index}>
              <div className={styles.productCard}>
                <img src={item.img} alt="img-product" />
                <div className={styles.description}>
                  <span>
                    {item.name}
                    <span>...</span>
                  </span>
                </div>
                <div className="d-flex justify-content-between aligns-center">
                  <span className={styles.price}>
                    {item.price.toLocaleString()} đ
                  </span>
                  <span className={styles.stars}>
                    <i className="fa fa-star"></i>
                    <small className="ml-6" style={{ fontSize: 12 }}>
                      {item.starScore}
                    </small>
                  </span>
                </div>
                <div className="d-flex justify-content-between aligns-center">
                  <span className={styles.clock}>
                    <i className="fa fa-clock"></i>
                    <small className="ml-6">{`• ${item.postingTime}`}</small>
                  </span>
                  <span className={styles.address}>{item.address}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
