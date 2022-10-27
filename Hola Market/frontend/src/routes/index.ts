import { adminRoutes } from './admin-routes';
import { userRoutes } from './user-routes';

/** @Routes */
export const routes = [...adminRoutes, ...userRoutes];
