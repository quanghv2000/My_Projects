import React from 'react';

import styles from './category-vertical.module.css';

type IProps = {
  ctgVerOpening: boolean;
};

export const CategoryVertical: React.FC<IProps> = ({ ctgVerOpening }) => {
  /** @Declare */
  const categories = [
    {
      id: 1,
      name: 'Đồ thờ',
    },
    {
      id: 2,
      name: 'Nội thất phòng thờ',
    },
    {
      id: 3,
      name: 'Nội thất phòng khách',
    },
    {
      id: 4,
      name: 'Nội thất phòng ngủ',
    },
    {
      id: 5,
      name: 'Nội thất nhà bếp',
    },
    {
      id: 6,
      name: 'Tủ kệ',
    },
  ];
  return ctgVerOpening ? (
    <div className={styles.categoryVertical}>
      <ul className={styles.categoryList}>
        {categories.map((ctg, index) => {
          return (
            <li className={styles.categoryItem} key={index}>
              <span>{ctg.name}</span>
              <i className="fa-solid fa-angle-right"></i>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <></>
  );
};
