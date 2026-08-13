# Harry & G — Online Ordering System

Same design, menu, prices and images as your existing site. This adds a real
shopping cart, checkout, Supabase-backed order database, and a staff admin
dashboard — replacing the WhatsApp-redirect flow with an actual order system
(WhatsApp is now optional/backup, sent only if you tap the button after checkout).

## What's included

- **Cart & checkout** (`components/CartDrawer.tsx`) — 3-step flow: Cart → Details
  → Confirm, fully contained in a scrolling panel so filling the form never
  drags the page behind it (this was the scroll-jump bug — see "The scroll fix" below).
- **Order database** on Supabase — `customers`, `products`, `orders`, `order_items`
  tables (`supabase/schema.sql`).
- **Order API** (`app/api/orders/route.ts`) — validates input, saves the order
  server-side.
- **Order tracking** (`app/api/orders/track/route.ts` + the "Track Order" button) —
  customers look up status with their order number + phone.
- **Admin dashboard** (`app/admin`) — staff log in, see all orders, update status
  (New → Confirmed → Preparing → Ready → Delivered).
- **Cash on Delivery** and **Card on Delivery** — both work today.
- **Online Payment** — shown as "Coming soon" in the UI and actively rejected
  by the API if selected. No fake payment form, no invented credentials. See
  `lib/payments.ts` for exactly where to plug in a real gateway later.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project.
2. Once it's ready, open **SQL Editor** and run the entire contents of
   `supabase/schema.sql`. This creates all four tables, indexes, and the
   Row Level Security policies.
3. Go to **Project Settings → API** and copy three values — you'll need them
   in step 3:
   - `Project URL`
   - `anon` `public` key
   - `service_role` key (⚠️ secret — treat like a password)

## 2. Create a staff login for the admin dashboard

There's no public sign-up by design. In Supabase Studio:

1. Go to **Authentication → Users → Add user**.
2. Create an account with the email/password your staff will use to log in
   at `/admin/login`.
3. Add more staff accounts the same way as needed.

## 3. Environment variables

Copy `.env.local.example` to `.env.local` for local dev, and add the **same
three keys** in **Vercel → your project → Settings → Environment Variables**
before deploying:

| Variable | Where it's used | Public? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser (admin login/session) | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only (`app/api/**`) | **No — secret** |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional backup WhatsApp button | Yes |

I haven't invented values for any of these — you'll paste in the real ones
from your own Supabase project.

## 4. Run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin`
for the dashboard.

## 5. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Import it into Vercel.
3. Add the four environment variables from step 3 in Vercel's project settings.
4. Deploy.

## The scroll fix

The old site put the checkout form inside a footer element that wasn't
scrollable — so as you filled it in, the form grew taller than the drawer
and the whole page underneath scrolled with it. This version:

- Splits the drawer into a fixed header, one scrollable body, and a fixed
  footer (`.drawer-body { overflow-y: auto }` in `app/globals.css`) — the
  checkout form lives entirely inside that scrollable body.
- Locks background scroll while the drawer/track-order modal is open
  (`document.body.classList.add("no-scroll")` in `lib/cartContext.tsx`).
- Sets form inputs to `font-size: 16px`, which stops iOS Safari's
  auto-zoom-on-focus — that zoom is what usually causes the "jump" on mobile.

## Adding real online payment later

`lib/payments.ts` has the exact integration point and steps (get a merchant
account, add secret env vars, implement `createPaymentIntent`, add a webhook
route, verify payment server-side before marking an order paid). Nothing
here fakes that flow — "Online Payment" stays disabled until it's wired up.

## What I did not change

Design tokens, fonts, menu items, prices, dish photos, address, phone number,
and page layout are all identical to the current site — only the ordering
mechanics changed.
