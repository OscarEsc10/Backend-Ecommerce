"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
class ProductsRepository {
    constructor(db) {
        this.db = db;
    }
    findAll() {
        return this.db.snapshot.products;
    }
    findBySku(sku) {
        return this.findAll().find(p => p.sku === sku);
    }
    create(prod) {
        const items = this.findAll();
        items.push(prod);
        this.db.set('products', items);
        this.db.save();
        return prod;
    }
    update(sku, partial) {
        const items = this.findAll();
        const idx = items.findIndex(p => p.sku === sku);
        if (idx === -1)
            return undefined;
        const updated = { ...items[idx], ...partial };
        items[idx] = updated;
        this.db.set('products', items);
        this.db.save();
        return updated;
    }
    delete(sku) {
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
exports.ProductsRepository = ProductsRepository;
//# sourceMappingURL=products.repository.js.map