import { PrismaClient } from '@prisma/client';

import { getCustomers } from './seeds/customers';

const prisma = new PrismaClient();

async function main() {
  const customers = await getCustomers();
  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { id: customer.id },
      update: {},
      create: customer,
    });
  }
  console.log(`Created ${customers.length} customers`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
