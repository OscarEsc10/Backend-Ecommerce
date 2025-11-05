"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
// GET /api/products
router.get('/', products_controller_1.getProducts);
// GET /api/products/:sku
router.get('/:sku', products_controller_1.getProductBySku);
// POST /api/products
router.post('/', products_controller_1.createProduct);
// PUT /api/products/:sku
router.put('/:sku', products_controller_1.updateProduct);
// DELETE /api/products/:sku
router.delete('/:sku', products_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=products.routes.js.map