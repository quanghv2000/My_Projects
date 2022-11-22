import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { Category } from './category.entity';

@Entity('sub_category')
export class SubCategory extends BaseEntity {
    @Column()
    name: string;

    @Column({ nullable: true })
    sortValue: number;

    @ManyToOne(
        () => Category,
        category => category.subCategories,
    )
    category: Category;
}
