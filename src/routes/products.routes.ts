import { Router } from 'express';
import {
  getProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller';

const router = Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:sku
router.get('/:sku', getProductBySku);

// POST /api/products
router.post('/', createProduct);

// PUT /api/products/:sku
router.put('/:sku', updateProduct);

// DELETE /api/products/:sku
router.delete('/:sku', deleteProduct);

export default router;