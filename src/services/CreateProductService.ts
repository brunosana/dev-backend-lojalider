import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

interface Request {
    name: string;
    description?: string;
    photo?: string;
    price: number;
}

class CreateProductService {
    productsRepository: ProductsRepository;

    constructor(productsRepository: ProductsRepository) {
        this.productsRepository = productsRepository;
    }

    public execute({
        name,
        description = '',
        price,
        photo = '',
    }: Request): Product {
        if (!name) throw Error('name must be a valid value');
        if (!price || price <= 0) throw Error('price must be a valid value');

        const product = this.productsRepository.create({
            name,
            price,
            photo,
            description,
        });
        return product;
    }
}

export default CreateProductService;
