import React from 'react';
import { ISubCategoryInfo } from 'models/api-model/response';
import { Tooltip } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import styles from './style.module.scss';

type IProps = {
  subCategories?: ISubCategoryInfo[];
};

export const ColumnSubCtg: React.FC<IProps> = ({ subCategories }) => {
  /** @Declare */
  const hasSubCategories = subCategories && subCategories.length > 0;

  return (
    <div className="d-flex aligns-center">
      <span className="font-bold">{subCategories?.length}</span>
      <span className="ml-16">
        {hasSubCategories ? (
          <Tooltip
            placement="rightTop"
            title={
              <>
                {subCategories?.map((subctg, index) => {
                  return (
                    <p key={index} className={styles.subctgName}>
                      {subctg.name}
                    </p>
                  );
                })}
              </>
            }
            color="white"
          >
            <span className={styles.labelUpdate}>Chỉnh sửa</span>
          </Tooltip>
        ) : (
          <span className={styles.labelAddNew}>Thêm mới</span>
        )}
      </span>
    </div>
  );
};
