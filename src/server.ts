import express, { Request, Response } from 'express';
import product_routes from './handlers/products';
import user_routes from './handlers/users';
import order_routes from './handlers/orders';
import dashboardRoutes from './handlers/dashboards';

const app: express.Application = express();
const address = '0.0.0.0:5000';

app.get('/', function (req: Request, res: Response) {
  res.send('Welcome to the grocery.');
});

product_routes(app);

user_routes(app);

order_routes(app);

dashboardRoutes(app);

app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
