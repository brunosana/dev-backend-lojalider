import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../middlewares/upload';
import ProductsRepository from '../repositories/ProductsRepository';
import Product from '../models/Product';
import AppError from '../errors/AppError';

interface Request {
    product_id: string;
    fileName: string;
}

class UpdateProductImageService {
    public async execute({ product_id, fileName }: Request): Promise<Product> {
        if (!product_id) {
            throw new AppError('Invalid product ID');
        }
        if (!fileName) {
            throw new AppError('Invalid filename');
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne({
            where: { id: product_id },
        });

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (product.image) {
            const productsFilePath = path.join(
                uploadConfig.directory,
                product.image,
            );
            const productsFileExists = await fs.promises.stat(productsFilePath);
            if (productsFileExists) {
                await fs.promises.unlink(productsFilePath);
            }
        }
        product.image = fileName;
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductImageService;
