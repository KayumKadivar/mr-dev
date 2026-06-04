const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

// 1. Naya Prisma v7 rule: Connection pehle raw 'pg' library se banana padta hai
const pool = new Pool({
  connectionString: "postgresql://postgres:1234@localhost:5432/my-dev"
});

// 2. Us connection ko Prisma ke adapter me daalna padta hai
const adapter = new PrismaPg(pool);

// 3. Phir adapter ko PrismaClient ke andar pass karna hota hai
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  const admin = await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'password123',
    },
  });

  console.log('Admin user successfully set:', admin);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
