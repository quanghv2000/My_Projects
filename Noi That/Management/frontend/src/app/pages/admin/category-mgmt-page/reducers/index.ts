import { createReducer } from '@reduxjs/toolkit';
import { CategoryMGMTPageReducerType } from './types';
import { getCategoriesReducer } from './get-categories';

export const initialState: CategoryMGMTPageReducerType = {
  isLoading: false,
  error: false,
  categoriesInfo: [
    {
      id: 1,
      name: 'Đồ thờ',
      subCategories: [
        {
          id: 1,
          name: 'Án gian',
        },
        {
          id: 2,
          name: 'Sập thờ',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date(),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 2,
      name: 'Nội thất phòng thờ',
      subCategories: [
        {
          id: 1,
          name: 'Cuốn thư - câu đối',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date(),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 3,
      name: 'Nội thất phòng khách',
      subCategories: [],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 4,
      name: 'Nội thất phòng ngủ',
      subCategories: [
        {
          id: 1,
          name: 'Giường ngủ',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 5,
      name: 'Nội thất nhà bếp',
      subCategories: [
        {
          id: 1,
          name: 'Tủ bếp',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
    {
      id: 6,
      name: 'Tủ kệ',
      subCategories: [
        {
          id: 1,
          name: 'Tủ quần áo',
        },
        {
          id: 1,
          name: 'Kệ Tivi',
        },
      ],
      createdDate: new Date(),
      createdBy: 'Hà Văn Quang',
      lastmodifiedDate: new Date('1976-04-19T15:59:05'),
      lastmodifiedBy: 'Hà Văn Quang',
    },
  ],
};

export const CategoryMGMTPageReducer = createReducer(initialState, {
  ...getCategoriesReducer,
});
