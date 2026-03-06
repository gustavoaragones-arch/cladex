# Cladex.io — Phase 1: Infrastructure Foundation

Structured transaction workflow software for real estate. *Not a broker. Not legal advice.*

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** TailwindCSS
- **UI:** shadcn/ui (button, input, label, card, separator, badge, toast)
- **Backend:** Supabase (auth + database)
- **Payments:** Stripe (scaffold only; full logic in Phase 7)
- **Deploy:** Vercel-ready

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

- **Supabase:** Create a project at [supabase.com](https://supabase.com). Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- **Stripe:** For local dev you can use test keys from [Stripe Dashboard](https://dashboard.stripe.com). Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. Build and static pages work without these; the Stripe webhook and any Stripe server logic require them.
- **App:** `NEXT_PUBLIC_APP_URL` (e.g. `http://localhost:3000` for local).

### 3. Supabase schema

Run the SQL from `supabase/schema.sql` in the Supabase SQL Editor (Dashboard → SQL Editor). This creates tables, RLS policies, and the trigger that creates a `public.users` row when a user signs up.

### 4. shadcn/ui (optional for Phase 1)

```bash
npx shadcn@latest init
npx shadcn@latest add button input label card separator badge toast
```

Phase 1 uses minimal inline styles; you can adopt shadcn components in later phases.

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What’s included (Phase 1)

- **Auth:** Email/password and magic link sign-in, signup, sign-out. Supabase OAuth callback at `/api/auth/callback`. Route protection via middleware (dashboard routes require auth; auth pages redirect to dashboard when already signed in).
- **Dashboard:** Protected layout with sidebar and topbar. Stub pages: Dashboard, Properties, Transactions, Offers, Documents, Tasks, Risk Radar, Professionals, Billing, Settings.
- **Public:** Placeholder home at `/`. Legal stubs: Terms, Privacy, Not a Broker disclaimer. Footer with legal links on public/auth pages.
- **API:** `/api/auth/callback` (OAuth/magic link), `/api/auth/signout` (POST), `/api/stripe/webhook` (scaffold; no business logic).
- **Design:** CSS variables and Tailwind theme per spec. Inter font. No gradients, no decorative animations. Regulatory disclaimer component.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — type-check (zero errors expected)

## Vercel

Connect the repo to Vercel and set the same env vars. Ensure `NEXT_PUBLIC_APP_URL` is your production URL. Stripe webhook URL: `https://<your-domain>/api/stripe/webhook`.

## Phase 1 only

No transaction engine, offer scoring, or business logic. All such areas are placeholders or comments for later phases.
