import { IBaseModel } from '../base.model';
import { ISubCategoryInfo } from '../sub-category/sub-category-info.model';

export interface ICategoryInfo extends IBaseModel {
  id?: number;
  name?: string;
  subCategories?: ISubCategoryInfo[];
}
