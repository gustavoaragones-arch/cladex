# Cladex

Structured, legally-safe workflow software for real estate transactions. Not a broker, attorney, escrow provider, or financial advisor.

## Stack

- **Next.js 14+** (App Router)
- **TypeScript** (strict)
- **TailwindCSS** + shadcn-style UI
- **Supabase** (Auth, DB, Storage)
- **Stripe** (foundation only; no payments implemented yet)

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example env file and fill in values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `NEXT_PUBLIC_APP_URL` | Optional; app URL for redirects (e.g. `https://cladex.io`) |

### 3. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Authentication → URL Configuration**, set:
   - **Site URL**: `http://localhost:3000` (dev) or your production URL.
   - **Redirect URLs**: add `http://localhost:3000/auth/callback` and your production callback URL.
3. Enable **Email** and **Google** (or other) providers under **Authentication → Providers**.
4. Copy project URL and anon key into `.env.local`.

### 4. Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Build

```bash
npm run build
npm start
```

## Project structure

```
/app
  /(auth)          # login, signup
  /(dashboard)      # protected dashboard + layout
  /api              # API routes (auth, stripe webhook)
  /legal            # terms, privacy, disclaimer
/components         # UI components
/lib                # supabase, stripe, auth, utils
/types
/styles
```

## Auth

- Email + password and magic link via Supabase Auth.
- Google OAuth: configure in Supabase dashboard and use the same callback URL.
- Dashboard routes are protected; unauthenticated users are redirected to `/login`.
- Session is handled server-side with cookies (`@supabase/ssr`; Supabase recommends this over `@supabase/auth-helpers-nextjs` for App Router).

## Deployment (Vercel)

1. Connect the repo to Vercel.
2. Set all env vars in the Vercel project.
3. In Supabase, add your production URL and `https://<your-domain>/auth/callback` to redirect URLs.
4. Deploy.

No local-only code; build should pass with `npm run build`.
