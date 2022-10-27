import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types';

import styles from './categories.module.scss';

export const Categories: React.FC<any> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { categoriesInfo } = storedData.HomePageReducer;

  return (
    <div className={styles.categoryContent}>
      <h3>Danh mục dành cho bạn</h3>
      <div className={`${styles.categoryList}`}>
        {categoriesInfo.map((item, index) => {
          return (
            <div className={`${styles.categoryItem}`} key={index}>
              <img
                src={item.imageUrl}
                alt="Category Card"
                className={styles.categoryImg}
              />
              <p className={styles.categoryName}>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
