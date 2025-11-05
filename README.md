# Backend E-commerce (Mock API)

A small Node.js + TypeScript backend with an in-file JSON database. It shows a simple OOP design with models, repositories, and services. It includes a basic auth login and CRUD for products.

## Features

- Basic login endpoint using users from a JSON file
- CRUD for products using SKU as identifier
- In-memory read + write back to `src/db/db.json`
- OOP layers: Models, Repositories, Services, Controllers
- Clear startup message with available endpoints

## Requirements

- Node.js 18+
- npm

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev
```

By default the server runs on port 3000. You can change it using the `PORT` environment variable.

Example:
```bash
set PORT=4000 && npm run dev   # Windows PowerShell/CMD
```

## Database

This project uses a simple JSON file as a database:
- File: `src/db/db.json`
- It contains `users`, `products`, and `categories` arrays.
- On startup, the app ensures each user has a `password`. The default is `Password123!` if missing.

## API Endpoints

Base URL: `http://localhost:3000`

- Auth
  - POST `/api/auth/login`
    - Body: `{ "email": string, "password": string }`
    - Response: user info if credentials are valid, 401 otherwise.

- Products
  - GET `/api/products` — list all products
  - GET `/api/products/:sku` — get a product by SKU
  - POST `/api/products` — create a product
  - PUT `/api/products/:sku` — update a product (partial or full)
  - DELETE `/api/products/:sku` — delete a product

### Example requests

Login (PowerShell):
```bash
curl -X POST https://backend-ecommerce-mock.onrender.com/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"maria.lopez@example.com\",\"password\":\"Password123!\"}"
```

Create product:
```bash
curl -X POST https://backend-ecommerce-mock.onrender.com/api/products ^
  -H "Content-Type: application/json" ^
  -d "{\"sku\":\"P011\",\"name\":\"New Product\",\"brand\":\"BrandX\",\"quantity\":10,\"price\":19.99,\"isActive\":true,\"category\":\"Clothing\",\"imageUrl\":\"/images/products/new.jpg\",\"tags\":[\"tag1\"],\"dimensions\":{\"width\":10,\"height\":10,\"depth\":1},\"description\":\"Nice product\"}"
```

Update product:
```bash
curl -X PUT https://backend-ecommerce-mock.onrender.com/api/products/P011 ^
  -H "Content-Type: application/json" ^
  -d "{\"price\":21.5,\"quantity\":12}"
```

Delete product:
```bash
curl -X DELETE https://backend-ecommerce-mock.onrender.com/api/products/P011
```

## Project structure

```
src/
  controllers/
    auth.controller.ts
    products.controller.ts
  core/
    database.ts
  db/
    db.json
  models/
    category.ts
    product.ts
    user.ts
  repositories/
    products.repository.ts
    users.repository.ts
  routes/
    auth.routes.ts
    products.routes.ts
  services/
    auth.service.ts
    products.service.ts
  index.ts
```

## Architecture

- Models: define TypeScript interfaces for domain objects
- Core: `Database` utility to read and write the JSON file
- Repositories: data access for each entity using `Database`
- Services: business logic for authentication and products
- Controllers: express handlers that call services
- Routes: route definitions for Express

## Notes

- Passwords are kept in plain text for simplicity. In production, use a hashing library like bcrypt.
- This project is only for learning purposes and small demos.

## Scripts

- `npm run dev` — start in development with `ts-node-dev`

## License

ISC
