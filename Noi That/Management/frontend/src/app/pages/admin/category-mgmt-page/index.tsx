/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Spin, Table } from 'antd';
import { Helmet } from 'react-helmet-async';
import { AppButton, AppInputSearch } from 'app/components';
import { ctgInfoColumns } from './components/ctg-info-columns';
import { RootState } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequestAction } from './actions';
import { AddCategoryModal } from './subsystems';
import { showInfoModal } from 'helpers/info-modal-dialog';

import style from './style.module.scss';

export const AdminCategoryMGMTPage: React.FC<any> = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: RootState) => state);
  const { isLoadingPage, categoriesInfo } = storedData.CategoryMGMTPageReducer;

  /** @Dispatch */
  const dispatch = useDispatch();

  /** @Component_State */
  const [spinning, setSpinning] = React.useState<boolean>(true);
  const [openAddCtgModal, setOpenCtgModal] = React.useState<boolean>(false);

  /** @Logic_Handler */
  const openAddCategoryModal = () => {
    setOpenCtgModal(true);
  };

  const closeAddCategoryModal = () => {
    setOpenCtgModal(false);
  };

  /** @Effect */
  React.useEffect(() => {
    dispatch(getCategoriesRequestAction());
  }, []);

  React.useEffect(() => {
    setSpinning(isLoadingPage);
  }, [isLoadingPage]);

  return (
    <Spin spinning={spinning}>
      <Helmet>
        <title>Admin - Quản lý danh mục</title>
        <meta name="description" content="Admin - Quản lý danh mục" />
      </Helmet>
      <div className={style.ctgMGMT}>
        <div className={style.header}>
          <div className={style.btn}>
            <AppButton
              className="mr-16"
              type="export"
              onClick={() => {
                showInfoModal('info', 'Tính năng đang được phát triển!');
              }}
            >
              Xuất File
            </AppButton>
            <AppButton type="add" onClick={openAddCategoryModal}>
              Thêm danh mục
            </AppButton>
          </div>
          <div>
            <AppInputSearch
              id="inputSearch"
              placeholder="Nhập tên danh mục"
              className={`${style.inputSearch} mr-16`}
            />
          </div>
        </div>
        <Table
          columns={ctgInfoColumns}
          dataSource={categoriesInfo}
          className={style.tblCategories}
          rowKey="id"
        />
      </div>
      <AddCategoryModal
        isOpenModal={openAddCtgModal}
        closeModal={closeAddCategoryModal}
      />
    </Spin>
  );
};
