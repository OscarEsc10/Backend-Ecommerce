import express from "express";
import type { Request, Response } from "express";
import productsRouter from "./routes/products.routes";
import authRouter from "./routes/auth.routes";
import { Database } from "./core/database";
import { UsersRepository } from "./repositories/users.repository";

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure users have passwords on startup
const db = new Database("../db/db.json");
const usersRepo = new UsersRepository(db);
usersRepo.ensurePasswords("Password123!");

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
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
