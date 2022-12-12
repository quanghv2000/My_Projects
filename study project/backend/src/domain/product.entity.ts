import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('product')
export class Product extends BaseEntity {
    @Column()
    name: string;

    @Column()
    price: string;
}
