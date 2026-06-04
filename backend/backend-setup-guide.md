# 🚀 GNFC Backend Setup Guide

> **Project:** GNFC Development \
> **Stack:** Node.js, Express.js, PostgreSQL, Prisma ORM \
> **Architecture:** CommonJS (CJS)

---

## 📋 Phase 1: Core Initialization & Server Setup

### 1. Initialize Node.js Project
* Created the foundational `package.json` file using `npm init -y`.

### 2. Install Server Dependencies
* Installed **Express** for API routing using `npm install express`.
* Installed **Nodemon** for automatic server restarts using `npm install -g nodemon`.

### 3. Setup Entry Files
* Created `server.js` as the main server entry point to run on port 3001.
* Created `src/index.js` to manage the core Express logic and routes.
* Configured a modular CommonJS architecture (using `require`) to resolve ES Module import errors.

---

## 🗄️ Phase 2: Legacy Database Connection
*(This approach was initially used for raw SQL queries before migrating to Prisma).*

### 1. Install PostgreSQL Driver
* Installed the Node.js Postgres driver using `npm install pg`.

### 2. Configure Database Pool
* Created `src/db/db.js` and set up the connection pool.
* Used hardcoded credentials (`localhost:5432/my-dev`) instead of using `.env` variables.

---

## 💎 Phase 3: Modern ORM Integration (Prisma v7)

### 1. Install Prisma Packages
* Installed the Prisma CLI and Prisma Client using:
  - `npm install prisma --save-dev`
  - `npm install @prisma/client`

### 2. Initialize Prisma Environment
* Generated the required Prisma configuration folders and files using `npx prisma init`.

### 3. Configure Database URL (Prisma 7 Standard)
> **Note:** We are strictly avoiding the use of `.env` files for security and preference.
* Configured the database connection string directly inside the new `prisma.config.ts` file, which is the new standard for Prisma v7.

### 4. Define Database Schema
* Removed the deprecated `url` property from `prisma/schema.prisma`.
* Created the `AdminUser` table structure in the schema (including `id`, `username`, `password`, and `createdAt` fields).

### 5. Push Schema to PostgreSQL
* Successfully synced the Prisma schema with the actual PostgreSQL database to generate the physical tables using `npx prisma db push`.
