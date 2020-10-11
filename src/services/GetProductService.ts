import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

class GetProductService {
    public async execute(product_id: string): Promise<Product> {
        if (!product_id) {
            throw new AppError('Id must be valid');
        }
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne({
            where: { id: product_id },
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return product;
    }
}

export default GetProductService;
