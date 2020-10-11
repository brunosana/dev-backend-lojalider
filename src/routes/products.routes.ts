import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductsRepository from '../repositories/ProductsRepository';
import CreateProductService from '../services/CreateProductService';
import UploadProductImageService from '../services/UpdateProductImageService';
import GetProductService from '../services/GetProductService';
import CreateProductOfferService from '../services/CreateProductOfferService';

import uploadConfig from '../middlewares/upload';
import DeleteProductOfferService from '../services/DeleteProductOfferService';

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

productRoutes.patch(
    '/:id/offer',
    ensureAuthenticated,
    async (request, response) => {
        const { id } = request.params;
        const { offer } = request.body;

        const createProductOfferService = new CreateProductOfferService();

        const product = await createProductOfferService.execute({
            product_id: id,
            offer,
        });

        return response.json(product);
    },
);

productRoutes.delete(
    '/:id/offer',
    ensureAuthenticated,
    async (request, response) => {
        const { id } = request.params;

        const deleteProductOfferService = new DeleteProductOfferService();

        await deleteProductOfferService.execute(id);

        return response.status(204).send();
    },
);

productRoutes.get('/', async (request, response) => {
    const productsRepository = getCustomRepository(ProductsRepository);
    const products = await productsRepository.find();
    return response.json(products);
});

productRoutes.get('/:id', async (request, response) => {
    const { id } = request.params;
    const getProductService = new GetProductService();
    const product = await getProductService.execute(id);
    return response.json(product);
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
