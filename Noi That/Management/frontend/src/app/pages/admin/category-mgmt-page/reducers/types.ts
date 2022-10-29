import { ICategoryInfo } from 'models/api-model/response';

export type CategoryMGMTPageReducerType = {
  isLoading: boolean;
  error: boolean;
  categoriesInfo: ICategoryInfo[];
};
