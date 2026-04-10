import { PrismaClient, UserRole, DonationStatus, DonationCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
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

  await prisma.donation.createMany({
    data: [
      // Food
      {
        title: 'Fresh Vegetables Bundle',
        description: 'Assorted fresh vegetables from our garden harvest',
        quantity: '5 kg',
        category: DonationCategory.FOOD,
        itemType: 'Vegetables',
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
        category: DonationCategory.FOOD,
        itemType: 'Cooked Food',
        expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
        status: DonationStatus.AVAILABLE,
        address: '45 T Nagar, Chennai',
        city: 'Chennai',
        donorId: donor.id,
      },
      // Clothes
      {
        title: 'Winter Jackets & Sweaters',
        description: 'Gently used warm clothing, sizes M-XL',
        quantity: '12 pieces',
        category: DonationCategory.CLOTHES,
        itemType: 'Winter Wear',
        expiresAt: null,
        status: DonationStatus.AVAILABLE,
        address: '78 Adyar, Chennai',
        city: 'Chennai',
        donorId: donor.id,
      },
      {
        title: "Children's Clothes Bundle",
        description: 'Clean clothes for kids aged 5-10 years',
        quantity: '20 pieces',
        category: DonationCategory.CLOTHES,
        itemType: "Children's Wear",
        expiresAt: null,
        status: DonationStatus.CLAIMED,
        address: '22 Velachery, Chennai',
        city: 'Chennai',
        donorId: donor.id,
        claimedById: ngo.id,
      },
      // Books
      {
        title: 'Class 6-10 Textbooks',
        description: 'CBSE textbooks in good condition, lightly used',
        quantity: '30 books',
        category: DonationCategory.BOOKS,
        itemType: 'Textbooks',
        expiresAt: null,
        status: DonationStatus.AVAILABLE,
        address: '5 Nungambakkam, Chennai',
        city: 'Chennai',
        donorId: donor.id,
      },
      {
        title: 'English Story Books',
        description: 'Collection of novels and story books for all ages',
        quantity: '15 books',
        category: DonationCategory.BOOKS,
        itemType: 'Story Books',
        expiresAt: null,
        status: DonationStatus.AVAILABLE,
        address: '9 Mylapore, Chennai',
        city: 'Chennai',
        donorId: donor.id,
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
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
