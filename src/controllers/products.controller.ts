import type { Request, Response } from 'express';
import { Database } from '../core/database';
import { ProductsRepository } from '../repositories/products.repository';
import { ProductsService } from '../services/products.service';

const db = new Database('../db/db.json');
const repo = new ProductsRepository(db);
const service = new ProductsService(repo);

export const getProducts = (req: Request, res: Response) => {
  try {
    const data = service.list();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

export const getProductBySku = (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const product = service.get(sku);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product' });
  }
};

export const createProduct = (req: Request, res: Response) => {
  try {
    const created = service.create(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
};

export const updateProduct = (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const updated = service.update(sku, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

export const deleteProduct = (req: Request, res: Response) => {
  try {
    const { sku } = req.params;
    const removed = service.delete(sku);
    if (!removed) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
};