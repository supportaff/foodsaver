import { PrismaClient, UserRole, DonationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@foodsaver.app' },
    update: {},
    create: {
      email: 'admin@foodsaver.app',
      name: 'Admin User',
      password: hashedPassword,
      role: UserRole.ADMIN,
      city: 'Chennai',
    },
  });

  const donor = await prisma.user.upsert({
    where: { email: 'donor@foodsaver.app' },
    update: {},
    create: {
      email: 'donor@foodsaver.app',
      name: 'Sample Donor',
      password: await bcrypt.hash('donor123', 10),
      role: UserRole.DONOR,
      city: 'Chennai',
    },
  });

  const ngo = await prisma.user.upsert({
    where: { email: 'ngo@foodsaver.app' },
    update: {},
    create: {
      email: 'ngo@foodsaver.app',
      name: 'Helping Hands NGO',
      password: await bcrypt.hash('ngo123', 10),
      role: UserRole.NGO,
      city: 'Chennai',
    },
  });

  // Seed sample donations
  await prisma.donation.createMany({
    data: [
      {
        title: 'Fresh Vegetables Bundle',
        description: 'Assorted fresh vegetables from our garden harvest',
        quantity: '5 kg',
        foodType: 'Vegetables',
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: DonationStatus.AVAILABLE,
        address: '12 Anna Nagar, Chennai',
        city: 'Chennai',
        donorId: donor.id,
      },
      {
        title: 'Cooked Rice and Dal',
        description: 'Freshly cooked rice and dal, enough for 20 people',
        quantity: '10 servings',
        foodType: 'Cooked Food',
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
        status: DonationStatus.AVAILABLE,
        address: '45 T Nagar, Chennai',
        city: 'Chennai',
        donorId: donor.id,
      },
      {
        title: 'Bread Loaves',
        description: 'Surplus bread from bakery - still fresh',
        quantity: '15 loaves',
        foodType: 'Bakery',
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        status: DonationStatus.CLAIMED,
        address: '78 Adyar, Chennai',
        city: 'Chennai',
        donorId: donor.id,
        claimedById: ngo.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed data created successfully');
  console.log('Admin:', admin.email);
  console.log('Donor:', donor.email);
  console.log('NGO:', ngo.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
