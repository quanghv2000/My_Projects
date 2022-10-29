import { BaseDTO } from '../../../domain/base/base.dto';

export class SubCategoryDTO extends BaseDTO{
    id?: number;
    name?: string;
    sortValuel?: number;
}

export class CategoryInfoDTO extends BaseDTO {
    name?: string;
    sortValue?: number;
    subCategories?: SubCategoryDTO[];
}
