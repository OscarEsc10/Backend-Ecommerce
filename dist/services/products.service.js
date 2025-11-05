"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
class ProductsService {
    constructor(repo) {
        this.repo = repo;
    }
    list() { return this.repo.findAll(); }
    get(sku) { return this.repo.findBySku(sku); }
    create(input) {
        const now = new Date().toISOString();
        const product = { ...input, createdAt: now };
        return this.repo.create(product);
    }
    update(sku, partial) { return this.repo.update(sku, partial); }
    delete(sku) { return this.repo.delete(sku); }
}
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map