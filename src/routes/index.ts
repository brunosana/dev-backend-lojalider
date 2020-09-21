import { Router } from 'express';
import productsRoutes from './products.routes';
import usersRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/products', productsRoutes);

routes.use('/users', usersRoutes);

routes.use('/sessions', sessionsRoutes);

export default routes;
