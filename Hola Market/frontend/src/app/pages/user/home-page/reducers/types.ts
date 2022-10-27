import { ICategoryInfo } from 'models/api-model/response';

export type HomePageReducerType = {
  isLoading: boolean;
  error: boolean;
  categoriesInfo: ICategoryInfo[];
};
