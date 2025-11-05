import type { Product } from '../models/product';
import { ProductsRepository } from '../repositories/products.repository';

export class ProductsService {
  constructor(private repo: ProductsRepository) {}

  list(): Product[] { return this.repo.findAll(); }
  get(sku: string) { return this.repo.findBySku(sku); }

  create(input: Omit<Product, 'createdAt'>): Product {
    const now = new Date().toISOString();
    const product: Product = { ...input, createdAt: now };
    return this.repo.create(product);
  }

  update(sku: string, partial: Partial<Product>) { return this.repo.update(sku, partial); }
  delete(sku: string) { return this.repo.delete(sku); }
}
