# 🌱 FoodSaver

> A social-impact web app to reduce food waste by connecting food donors with NGOs and volunteers.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth v4 + Prisma Adapter
- **Database**: PostgreSQL via Prisma ORM
- **UI**: Tailwind CSS
- **Validation**: Zod
- **Deployment**: Vercel

## Features

- 🍽️ **Post food donations** with quantity, type, expiry, and location
- 🔍 **Browse & filter** available donations by city and food type
- ✋ **Claim donations** as NGO or volunteer
- 📊 **Dashboard** showing personal donations and claims
- 🔐 **Auth** with email/password login and role-based access (Donor, NGO, Volunteer, Admin)
- ✅ **Status tracking**: Available → Claimed → Collected

## Getting Started

### 1. Clone and install
```bash
git clone https://github.com/supportaff/foodsaver.git
cd foodsaver
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Fill in DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
```

### 3. Set up the database
```bash
npm run db:push      # Push schema to DB
npm run db:seed      # Seed with sample data
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Seed Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@foodsaver.app | admin123 |
| Donor | donor@foodsaver.app | donor123 |
| NGO | ngo@foodsaver.app | ngo123 |

## Deployment (Vercel)

1. Push to GitHub (already done ✅)
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donations` | List donations |
| POST | `/api/donations` | Create donation (auth required) |
| POST | `/api/donations/:id/claim` | Claim a donation (auth required) |
| PATCH | `/api/donations/:id/status` | Update donation status (donor/admin) |
| POST | `/api/auth/register` | Register new user |
