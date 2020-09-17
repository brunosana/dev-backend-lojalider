import { Router } from 'express';
import routes from '.';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';

const productsRepository = new ProductsRepository();
const createProductService = new CreateProductService(productsRepository);

const productRoutes = Router();

productRoutes.post('/', (request, response) => {
    try {
        const { name, description, price, photo } = request.body;
        const product = createProductService.execute({
            name,
            description,
            price,
            photo,
        });
        return response.json(product);
    } catch (err) {
        return response.status(400).json({ message: err.message });
    }
});

productRoutes.get('/', (request, response) => {
    return response.json(productsRepository.all());
});

export default productRoutes;
