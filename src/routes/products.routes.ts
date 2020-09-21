import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';
import usersRouter from './users.routes';

const productRoutes = Router();

productRoutes.post('/', ensureAuthenticated, async (request, response) => {
    try {
        const { name, description, price, photo } = request.body;

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
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

productRoutes.get('/', async (request, response) => {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return response.json(products);
});

export default productRoutes;
