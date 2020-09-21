import { Router } from 'express';
import productsRoutes from './products.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/products', productsRoutes);

routes.use('/users', usersRoutes);

export default routes;
