import type { Product } from '../models/product';
import { Database } from '../core/database';

export class ProductsRepository {
  constructor(private db: Database) {}

  findAll(): Product[] {
    return this.db.snapshot.products as Product[];
  }

  findBySku(sku: string): Product | undefined {
    return this.findAll().find(p => p.sku === sku);
  }

  create(prod: Product): Product {
    const items = this.findAll();
    items.push(prod);
    this.db.set('products', items);
    this.db.save();
    return prod;
  }

  update(sku: string, partial: Partial<Product>): Product | undefined {
    const items = this.findAll();
    const idx = items.findIndex(p => p.sku === sku);
    if (idx === -1) return undefined;
    const updated = { ...items[idx], ...partial } as Product;
    items[idx] = updated;
    this.db.set('products', items);
    this.db.save();
    return updated;
  }

  delete(sku: string): boolean {
    const items = this.findAll();
    const next = items.filter(p => p.sku !== sku);
    const removed = next.length !== items.length;
    if (removed) {
      this.db.set('products', next);
      this.db.save();
    }
    return removed;
  }
}
