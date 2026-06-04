const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient} = require('@prisma/client')

const pool = new Pool({
  connectionString: "postgresql://postgres:1234@localhost:5432/my-dev"
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({adapter})

module.exports = prisma;
