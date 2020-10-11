import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import ProductsRepository from '../repositories/ProductsRepository';

class DeleteProductOfferService {
    public async execute(product_id: string): Promise<void> {
        if (!product_id) {
            throw new AppError('Invalid product id');
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne({
            where: { id: product_id },
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        product.offer = null;

        await productsRepository.save(product);
    }
}

export default DeleteProductOfferService;
