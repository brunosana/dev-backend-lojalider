import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
    name: string;
    description?: string;
    image?: string;
    price: number;
}

class CreateProductService {
    public async execute({
        name,
        description = '',
        price,
        image = '',
    }: Request): Promise<Product> {
        if (!name) throw Error('name must be a valid value');
        if (!price || price <= 0) throw Error('price must be a valid value');

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = productsRepository.create({
            name,
            price,
            image,
            description,
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
