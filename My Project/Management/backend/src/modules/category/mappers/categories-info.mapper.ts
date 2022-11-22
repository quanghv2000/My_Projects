import { Category } from 'src/domain/category.entity';
import { CategoryInfoDTO, SubCategoryDTO } from '../dtos/category-info.dto';

export class CategoryInfoMapper {
    static fromEntityToDTO(categoriesInfo: Category[]): CategoryInfoDTO[] {
        if (!categoriesInfo) {
            return [];
        }

        let categoriesInfoDTO: CategoryInfoDTO[] = [];
        categoriesInfo.map((category: Category) => {
            const {
                id,
                createdBy,
                createdDate,
                lastModifiedBy,
                lastModifiedDate,
                name,
                sortValue,
                subCategories,
            } = category;
            const subCategoriesDTO: SubCategoryDTO[] = subCategories.map(subCategory => {
                const { id, name, sortValue } = subCategory;

                return { id, name, sortValue };
            });

            let categoryInfoDTO: CategoryInfoDTO = {
                id,
                createdBy,
                createdDate,
                lastModifiedBy,
                lastModifiedDate,
                name,
                sortValue,
                subCategories: subCategoriesDTO,
            };

            categoriesInfoDTO.push(categoryInfoDTO);
        });

        return categoriesInfoDTO;
    }
}
