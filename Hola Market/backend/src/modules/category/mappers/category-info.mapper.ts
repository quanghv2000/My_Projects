import { Category } from 'src/domain/category.entity';
import { CategoryInfoDTO } from '../dtos/category-info.dto';

export class CategoryInfoMapper {
    static fromEntityToDTO(categoriesInfo: Category[]): CategoryInfoDTO[] {
        if (!categoriesInfo) {
            return [];
        }

        let categoriesInfoDTO: CategoryInfoDTO[] = [];
        categoriesInfo.map((category: Category) => {
            const { id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, name, imageUrl } = category;
            let categoryInfoDTO: CategoryInfoDTO = {
                id,
                createdBy,
                createdDate,
                lastModifiedBy,
                lastModifiedDate,
                name,
                imageUrl,
            };
            
            categoriesInfoDTO.push(categoryInfoDTO);
        });

        return categoriesInfoDTO;
    }
}
