import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
    product_id: string;
    offer: number;
}

class CreateProductOfferService {
    public async execute({ product_id, offer }: Request): Promise<Product> {
        if (!product_id) {
            throw new AppError('Invalid product ID');
        }
        if (!offer || offer <= 0) {
            throw new AppError('Offer price must be valid');
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne({
            where: { id: product_id },
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (offer >= product.price) {
            throw new AppError('Offer must be less than product price');
        }

        product.offer = offer;

        productsRepository.save(product);

        return product;
    }
}

export default CreateProductOfferService;
