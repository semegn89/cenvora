# CENVORA INTERNATIONAL S.R.L. — Corporate Website

Production-ready corporate site for CENVORA INTERNATIONAL S.R.L. (B2B wholesale).  
7 pages, bilingual (RO/EN), catalog, cart, checkout, contact form, legal pages, cookie consent.

## Stack

- **Next.js 14** (App Router), TypeScript, TailwindCSS
- **SQLite + Prisma** (MVP); switch to Postgres via `DATABASE_URL` and schema provider when needed
- **Forms**: zod + react-hook-form
- **Email**: nodemailer (SMTP via env; optional — orders/contacts still saved to DB if SMTP not set)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Copy the example env and set at least `DATABASE_URL`:

```bash
cp .env.example .env
```

Edit `.env`:

- **DATABASE_URL** — required. SQLite: `file:./dev.db` (relative to project root). Postgres: `postgresql://user:pass@host:5432/dbname`
- **SMTP** (optional): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- **ORDER_TO_EMAIL**, **CONTACT_TO_EMAIL** — where to send order/contact emails
- **NEXT_PUBLIC_GA_ID** (optional) — Google Analytics; only loaded when user accepts Analytics cookies

### 3. Database

```bash
npm run db:generate   # generate Prisma client
npm run db:migrate    # run migrations (creates tables)
npm run db:seed       # seed 12 products (or: npx tsx prisma/seed.ts)
```

### 4. Run dev

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/ro`. Use the RO/EN link in the header to switch language.

## SMTP (email)

If SMTP is not configured:

- Orders and contact requests are still **saved to the database**.
- The UI shows a success message; you can tell the user “Request received; we will contact you.”

To enable email:

1. Set in `.env`: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
2. Set `ORDER_TO_EMAIL` and/or `CONTACT_TO_EMAIL` to the recipient addresses.

Example (Gmail-style):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password
SMTP_FROM=noreply@yourdomain.com
ORDER_TO_EMAIL=orders@cenvora.ro
CONTACT_TO_EMAIL=contact@cenvora.ro
```

## Deploy (Vercel / Render)

- **Build**: `npm run build`
- **Start**: `npm run start`
- **Database**: For Vercel, use a hosted DB (e.g. Postgres). Set `DATABASE_URL` in the dashboard. Change `provider` in `prisma/schema.prisma` to `"postgresql"` and run migrations in CI or manually.
- **SQLite**: Works for MVP on platforms that persist the filesystem (e.g. Render with a persistent disk). For serverless (Vercel), prefer Postgres.

## Project structure

- `src/config/company.ts` — company data (CUI, address, contacts); single source of truth
- `src/config/site.ts` — site name, locales, feature flags
- `src/lib/i18n.ts` — RO/EN translations
- `src/app/[locale]/` — 7 pages: home, company, activities, catalog, checkout, contacts, legal
- `src/app/api/order` — POST order (validate, save, optional email)
- `src/app/api/contact` — POST contact (validate, save, optional email)
- `prisma/schema.prisma` — Product, Order, OrderItem, ContactRequest

## Acceptance checklist

- [x] All 7 pages available and linked in nav/footer
- [x] Catalog → add to cart → checkout → order saved → order number shown
- [x] Contact form saves to DB and sends email when SMTP configured
- [x] Cookie consent (Accept / Reject / Settings); Analytics only if accepted
- [x] Legal page with Privacy, Cookies, Terms (real text, company details)
- [x] `npm run build` passes
