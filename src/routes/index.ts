import { Router } from 'express';
import root from './root.route';

const routes = Router();
const allRoutes = [
  {
    path: '/',
    route: root,
  },
];

allRoutes.forEach((el) => {
  routes.use(el.path, el.route);
});

export default routes;
