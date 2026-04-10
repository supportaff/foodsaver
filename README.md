# 🌱 FoodSaver (Now: GiveSaver)

> A social-impact web app to reduce waste by connecting donors of **food, clothes, and books** with NGOs and volunteers.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth**: NextAuth v4 + Prisma Adapter
- **Database**: PostgreSQL via Prisma ORM
- **UI**: Tailwind CSS
- **Validation**: Zod
- **Deployment**: Vercel

## Donation Categories

| Category | Item Types |
|----------|------------|
| 🍱 Food | Cooked Food, Vegetables, Fruits, Bakery, Dairy, Grains, Packaged |
| 👕 Clothes | Men's/Women's/Children's Wear, Winter Wear, Footwear, Accessories |
| 📚 Books | Textbooks, Story Books, Children Books, Religious, Reference, Magazines |

## Features

- 🎁 **Post donations** — Food, Clothes, or Books with quantity, type, and location
- 🔍 **Browse & filter** by category, city, and status
- ✋ **Claim donations** as NGO or volunteer
- 📊 **Dashboard** showing personal donations and claims
- 🔐 **Auth** with email/password and role-based access
- ✅ **Status tracking**: Available → Claimed → Collected
- ⏱️ **Expiry tracking** for food donations (not required for clothes/books)

## Getting Started

```bash
git clone https://github.com/supportaff/foodsaver.git
cd foodsaver
npm install
cp .env.example .env   # fill in DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
npm run db:push
npm run db:seed
npm run dev
```

## Seed Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@foodsaver.app | admin123 |
| Donor | donor@foodsaver.app | donor123 |
| NGO | ngo@foodsaver.app | ngo123 |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donations?category=FOOD\|CLOTHES\|BOOKS` | List donations |
| POST | `/api/donations` | Create donation (auth) |
| POST | `/api/donations/:id/claim` | Claim (auth) |
| PATCH | `/api/donations/:id/status` | Update status |
| POST | `/api/auth/register` | Register user |
