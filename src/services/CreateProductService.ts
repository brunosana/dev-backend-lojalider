import { getCustomRepository } from 'typeorm';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
    name: string;
    description?: string;
    photo?: string;
    price: number;
}

class CreateProductService {
    public async execute({
        name,
        description = '',
        price,
        photo = '',
    }: Request): Promise<Product> {
        if (!name) throw Error('name must be a valid value');
        if (!price || price <= 0) throw Error('price must be a valid value');

        const productsRepository = getCustomRepository(ProductsRepository);

        const product = productsRepository.create({
            name,
            price,
            photo,
            description,
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
