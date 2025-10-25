import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Users
  const adminPass = await bcrypt.hash("admin123", 10);
  const lenderPass = await bcrypt.hash("lender123", 10);
  const userPass = await bcrypt.hash("user123", 10);

  await prisma.user.upsert({
    where: { email: "admin@mafalia.test" },
    update: {},
    create: { email: "admin@mafalia.test", name: "Admin", password: adminPass, role: Role.ADMIN },
  });
  await prisma.user.upsert({
    where: { email: "lender@mafalia.test" },
    update: {},
    create: { email: "lender@mafalia.test", name: "Lender", password: lenderPass, role: Role.LENDER },
  });
  await prisma.user.upsert({
    where: { email: "user@mafalia.test" },
    update: {},
    create: { email: "user@mafalia.test", name: "User", password: userPass, role: Role.USER },
  });

  // Clients
  const c1 = await prisma.client.upsert({
    where: { id: "seed_c1" },
    update: {},
    create: { id: "seed_c1", name: "Restaurant Teranga", type: "restaurant", location: "Dakar Plateau", joinedAt: new Date("2024-01-15") },
  });
  const c2 = await prisma.client.upsert({
    where: { id: "seed_c2" },
    update: {},
    create: { id: "seed_c2", name: "Chez Awa Fast Food", type: "fast_food", location: "Pikine", joinedAt: new Date("2023-08-02") },
  });

  // Monthly Financials (6 months each)
  function* lastSixMonths() {
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      yield { ym };
    }
  }

  for (const { ym } of lastSixMonths()) {
    const base = 800000 + (ym.endsWith("-06") ? 50000 : 0);
    const revenue1 = base + 20000;
    const expenses1 = Math.round(revenue1 * 0.65);
    await prisma.monthlyFinancial.upsert({
      where: { clientId_ym: { clientId: c1.id, ym } },
      update: { revenue: revenue1, expenses: expenses1, txCount: 240, cash: 200000, wave: 300000, orange: 200000, card: 100000 },
      create: { clientId: c1.id, ym, revenue: revenue1, expenses: expenses1, txCount: 240, cash: 200000, wave: 300000, orange: 200000, card: 100000 },
    });

    const revenue2 = base - 100000;
    const expenses2 = Math.round(revenue2 * 0.7);
    await prisma.monthlyFinancial.upsert({
      where: { clientId_ym: { clientId: c2.id, ym } },
      update: { revenue: revenue2, expenses: expenses2, txCount: 200, cash: 150000, wave: 250000, orange: 150000, card: 100000 },
      create: { clientId: c2.id, ym, revenue: revenue2, expenses: expenses2, txCount: 200, cash: 150000, wave: 250000, orange: 150000, card: 100000 },
    });
  }

  // Transactions (a few samples)
  await prisma.transaction.createMany({
    data: [
      { clientId: c1.id, date: new Date(), amount: 120000, method: "wave", direction: "inflow", id: "seed_t1" },
      { clientId: c1.id, date: new Date(), amount: 45000, method: "cash", direction: "inflow", id: "seed_t2" },
      { clientId: c1.id, date: new Date(), amount: 40000, method: "wave", direction: "outflow", id: "seed_t3" },
      { clientId: c2.id, date: new Date(), amount: 60000, method: "wave", direction: "inflow", id: "seed_t4" },
    ],
    skipDuplicates: true,
  });

  // Loan requests
  await prisma.loanRequest.createMany({
    data: [
      { id: "seed_lr1", clientId: c1.id, amount: 1500000, termMonths: 12, status: "pending" },
      { id: "seed_lr2", clientId: c2.id, amount: 700000, termMonths: 6, status: "approved" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
