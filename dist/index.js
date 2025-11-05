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
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Ensure users have passwords on startup
const db = new database_1.Database("../db/db.json");
const usersRepo = new users_repository_1.UsersRepository(db);
usersRepo.ensurePasswords("Password123!");
const allowList = new Set([
    'http://localhost:3000',
    'https://localhost:3000',
    'http://127.0.0.1:3000',
    'https://127.0.0.1:3000'
]);
const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowList.has(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.options('/:path(*)', (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", products_routes_1.default);
app.get("/", (req, res) => {
    res.send("E-commerce Mock API is working");
});
app.listen(PORT, () => {
    console.log('E-commerce API Server');
    console.log('=======================');
    console.log(` Server running on: http://localhost:${PORT}`);
    console.log(' Available endpoints:');
    console.log(`   - GET    https://backend-ecommerce-mock.onrender.com/`);
    console.log(`   - POST   https://backend-ecommerce-mock.onrender.com/api/auth/login`);
    console.log(`   - GET    https://backend-ecommerce-mock.onrender.com/api/products`);
    console.log(`   - GET    https://backend-ecommerce-mock.onrender.com/api/products/:sku`);
    console.log(`   - POST   https://backend-ecommerce-mock.onrender.com/api/products`);
    console.log(`   - PUT    https://backend-ecommerce-mock.onrender.com/api/products/:sku`);
    console.log(`   - DELETE https://backend-ecommerce-mock.onrender.com/api/products/:sku`);
    console.log('\n Server started successfully!');
});
//# sourceMappingURL=index.js.map