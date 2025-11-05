import express from "express";
import type { Request, Response } from "express";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";
import { Database } from "./core/database";
import { UsersRepository } from "./repositories/users.repository";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure users have passwords on startup
const db = new Database("../db/db.json");
const usersRepo = new UsersRepository(db);
usersRepo.ensurePasswords("Password123!");

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
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
