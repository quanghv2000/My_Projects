import { ICategoryInfo } from 'models/api-model/response';

export type CategoryMGMTPageReducerType = {
  isLoadingPage: boolean;
  error: boolean;
  categoriesInfo: ICategoryInfo[];
};
