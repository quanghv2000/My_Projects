import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryInfoDTO } from './dtos/category-info.dto';
import { CategoryInfoMapper } from './mappers';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository) {}

    async findAll(): Promise<CategoryInfoDTO[]> {
        const result = await this.categoryRepository.find({
            relations: ['subCategories']
        });
        return CategoryInfoMapper.fromEntityToDTO(result);
    }
}
