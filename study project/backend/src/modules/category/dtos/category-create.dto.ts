import { BaseDTO } from '../../../domain/base/base.dto';

export class CategoryCreateDTO extends BaseDTO {
    name: string;
    imageUrl: string;
}
