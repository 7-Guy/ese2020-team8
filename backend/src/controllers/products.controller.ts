import express, { Router, Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { verifyToken } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';

const productController: Router = express.Router();
const productService = new ProductService();

productController.post(
  '/',
  verifyToken,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.create(req.body);
      res.send(product);
    } catch (err) {
      next(err);
    }
  }
);
productController.put(
  '/:productId/approve',
  verifyToken,
  checkIsAdmin,
  async (req: Request<{productId: string}>, res: Response, next: NextFunction) => {
    try {
      const productId = req.params.productId;
      const product = await productService.approve(productId);
      res.send(product);
    } catch (err) {
      return next(err);
    }
  }
);

productController.get(
  '/', // you can add middleware on specific requests like that
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAll();
      res.send(products);
    } catch (err) {
      next(err);
    }
  }
);

productController.get(
  '/pending', // you can add middleware on specific requests like that
  verifyToken,
  checkIsAdmin,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getToBeApproved();
      res.send(products);
    } catch (err)  {
      next(err);
    }
  }
);

export const ProductController: Router = productController;
