"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySku = exports.getProducts = void 0;
const database_1 = require("../core/database");
const products_repository_1 = require("../repositories/products.repository");
const products_service_1 = require("../services/products.service");
const db = new database_1.Database('../db/db.json');
const repo = new products_repository_1.ProductsRepository(db);
const service = new products_service_1.ProductsService(repo);
const getProducts = (req, res) => {
    try {
        const data = service.list();
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching products' });
    }
};
exports.getProducts = getProducts;
const getProductBySku = (req, res) => {
    try {
        const { sku } = req.params;
        const product = service.get(sku);
        if (!product)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching product' });
    }
};
exports.getProductBySku = getProductBySku;
const createProduct = (req, res) => {
    try {
        const created = service.create(req.body);
        res.status(201).json({ success: true, data: created });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error creating product' });
    }
};
exports.createProduct = createProduct;
const updateProduct = (req, res) => {
    try {
        const { sku } = req.params;
        const updated = service.update(sku, req.body);
        if (!updated)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true, data: updated });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error updating product' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => {
    try {
        const { sku } = req.params;
        const removed = service.delete(sku);
        if (!removed)
            return res.status(404).json({ success: false, message: 'Product not found' });
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting product' });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.controller.js.map