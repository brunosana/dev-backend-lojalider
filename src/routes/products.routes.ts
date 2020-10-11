import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';
import UploadProductImageService from '../services/UpdateProductImageService';

import uploadConfig from '../middlewares/upload';

const productRoutes = Router();
const upload = multer(uploadConfig);

productRoutes.post('/', ensureAuthenticated, async (request, response) => {
    const { name, description, price, image } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
        name,
        description,
        price,
        image,
    });

    return response.json(product);
});

productRoutes.get('/', async (request, response) => {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return response.json(products);
});

productRoutes.patch(
    '/:id/image',
    ensureAuthenticated,
    upload.single('image'),
    async (request, response) => {
        const { id } = request.params;
        const uploadProductImageService = new UploadProductImageService();
        const product = await uploadProductImageService.execute({
            product_id: id,
            fileName: request.file.filename,
        });
        return response.json(product);
    },
);

export default productRoutes;
