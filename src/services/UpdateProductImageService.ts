import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import uploadConfig from '../middlewares/upload';
import ProductsRepository from '../repositories/ProductsRepository';
import Product from '../models/Product';

interface Request {
    product_id: string;
    fileName: string;
}

class UpdateProductImageService {
    public async execute({ product_id, fileName }: Request): Promise<Product> {
        if (!product_id) {
            throw new Error('Invalid product ID');
        }
        if (!fileName) {
            throw new Error('Invalid filename');
        }

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne({
            where: { id: product_id },
        });

        if (!product) {
            throw new Error(
                'Only authenticated users can change the product image',
            );
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
