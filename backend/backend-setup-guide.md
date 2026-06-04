# 🚀 GNFC Backend Setup Guide

> **Project:** GNFC Development \
> **Stack:** Node.js, Express.js, PostgreSQL, Prisma ORM \
> **Architecture:** CommonJS (CJS)

---

## 📋 Phase 1: Core Initialization & Server Setup

### 1. Initialize Node.js Project
Create the foundational `package.json` file.
```bash
npm init -y
```

### 2. Install Server Dependencies
Install **Express** for routing and **Nodemon** for live-reloading during development.
```bash
npm install express
npm install -g nodemon
```

### 3. Setup Entry Files
We configured a modular CommonJS architecture to resolve ES Module import errors.

**File:** `server.js` (Server Entry Point)
```javascript
const app = require('./src/index');

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
    console.log(`🚀 Server running on port ${app.get("port")}`);
});
```

**File:** `src/index.js` (Express Logic)
```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
```

---

## 🗄️ Phase 2: Legacy Database Connection (Optional)
*Initially used for raw SQL queries before migrating to Prisma.*

### 1. Install PostgreSQL Driver
```bash
npm install pg
```

### 2. Configure Database Pool
**File:** `src/db/db.js`
```javascript
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my-dev",
  password: "1234",
  port: 5432,
});

module.exports = pool;
```

---

## 💎 Phase 3: Modern ORM Integration (Prisma v7)

### 1. Install Prisma Packages
Install the Prisma CLI (dev dependency) and the Prisma Client.
```bash
npm install prisma --save-dev
npm install @prisma/client
```

### 2. Initialize Prisma
Generate the required Prisma configuration files.
```bash
npx prisma init
```

### 3. Configure Database URL (Prisma 7 Standard)
> **Note:** Since we are strictly avoiding `.env` files, we configure the database connection directly in the new `prisma.config.ts` file introduced in Prisma v7.

**File:** `prisma.config.ts`
```typescript
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Hardcoded connection string replacing process.env["DATABASE_URL"]
    url: "postgresql://postgres:1234@localhost:5432/my-dev", 
  },
});
```

### 4. Define Database Schema
Create the `AdminUser` table structure.

**File:** `prisma/schema.prisma`
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  // The 'url' property is removed here as it is now handled by prisma.config.ts
}

model AdminUser {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

### 5. Push Schema to PostgreSQL
Sync the Prisma schema with the actual PostgreSQL database to generate the tables.
```bash
npx prisma db push
```

---

*Document generated for GNFC-DEV workspace.*
