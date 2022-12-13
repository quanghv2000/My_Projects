import { Product } from '../../domain/product.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
