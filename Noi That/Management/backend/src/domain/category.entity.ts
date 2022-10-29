import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { SubCategory } from './sub-category.entity';

@Entity('category')
export class Category extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    sortValue: number;

    @OneToMany(
        () => SubCategory,
        subCategory => subCategory.category,
    )
    subCategories: SubCategory[];
}
