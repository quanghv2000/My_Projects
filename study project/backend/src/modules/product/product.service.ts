import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

    async findAll(): Promise<any[]> {
        return [
            {
                id: 1,
                name: 'Product 1',
                price: 10000,
                createdDate: new Date(),
                createdBy: 'quanghv7',
                lastModifiedDate: new Date(),
                lastModifiedBy: 'quanghv7',
            },
            {
                id: 2,
                name: 'Product 2',
                price: 20000,
                createdDate: new Date(),
                createdBy: 'quanghv7',
                lastModifiedDate: new Date(),
                lastModifiedBy: 'quanghv7',
            },
            {
                id: 3,
                name: 'Product 3',
                price: 30000,
                createdDate: new Date(),
                createdBy: 'quanghv7',
                lastModifiedDate: new Date(),
                lastModifiedBy: 'quanghv7',
            },
            {
                id: 4,
                name: 'Product 4',
                price: 40000,
                createdDate: new Date(),
                createdBy: 'quanghv7',
                lastModifiedDate: new Date(),
                lastModifiedBy: 'quanghv7',
            },
        ];
    }
}
