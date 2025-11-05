"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const database_1 = require("./core/database");
const users_repository_1 = require("./repositories/users.repository");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Ensure users have passwords on startup
const db = new database_1.Database("../db/db.json");
const usersRepo = new users_repository_1.UsersRepository(db);
usersRepo.ensurePasswords("Password123!");
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", products_routes_1.default);
app.get("/", (req, res) => {
    res.send("E-commerce Mock API en TypeScript funcionando!");
});
app.listen(PORT, () => {
    console.log('🛍️  E-commerce API Server');
    console.log('=======================');
    console.log(` Server running on: http://localhost:${PORT}`);
    console.log(' Available endpoints:');
    console.log(`   - GET    http://localhost:${PORT}/`);
    console.log(`   - POST   http://localhost:${PORT}/api/auth/login`);
    console.log(`   - GET    http://localhost:${PORT}/api/products`);
    console.log(`   - GET    http://localhost:${PORT}/api/products/:sku`);
    console.log(`   - POST   http://localhost:${PORT}/api/products`);
    console.log(`   - PUT    http://localhost:${PORT}/api/products/:sku`);
    console.log(`   - DELETE http://localhost:${PORT}/api/products/:sku`);
    console.log('\n Server started successfully!');
});
//# sourceMappingURL=index.js.map