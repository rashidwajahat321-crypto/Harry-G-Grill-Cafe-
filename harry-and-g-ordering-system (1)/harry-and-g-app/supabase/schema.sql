-- ============================================================
-- Harry & G Grill Café — Ordering System Schema
-- Run this in Supabase Studio → SQL Editor (run once).
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- CUSTOMERS ----------
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null unique,
  address text,
  created_at timestamptz not null default now()
);

-- ---------- PRODUCTS ----------
-- Mirrors the menu shown on the site. Not required for placing an order
-- (order_items stores its own name/price snapshot), but useful if you
-- later want the admin dashboard to manage menu items from the database
-- instead of hardcoded frontend data.
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2) not null,
  category text not null,
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- ORDERS ----------
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid not null references customers(id) on delete restrict,
  order_type text not null check (order_type in ('Delivery','Takeout','Dine-in')),
  payment_method text not null check (payment_method in ('Cash on Delivery','Card on Delivery','Online Payment')),
  status text not null default 'New' check (status in ('New','Confirmed','Preparing','Ready','Delivered')),
  subtotal numeric(10,2) not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- ORDER ITEMS ----------
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_name text not null,
  unit_price numeric(10,2) not null,
  quantity integer not null check (quantity > 0),
  line_total numeric(10,2) not null
);

create index if not exists idx_orders_status on orders(status);
create index if not exists idx_orders_created_at on orders(created_at desc);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_orders_order_number on orders(order_number);

-- keep updated_at fresh on status changes
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_orders_updated_at on orders;
create trigger trg_orders_updated_at
before update on orders
for each row execute function set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
-- Public (anon) clients get NO direct table access. All order writes
-- go through the /api/orders route using the service_role key on the
-- server, which bypasses RLS safely (the key never reaches the browser).
--
-- The admin dashboard reads/updates orders using a signed-in Supabase
-- Auth session, so those policies check auth.role() = 'authenticated'.
-- Create staff accounts manually in Supabase Auth (see README) rather
-- than enabling public sign-up.

alter table customers enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;

-- Admin (any authenticated user) can read everything.
create policy "authenticated can read customers" on customers
  for select using (auth.role() = 'authenticated');

create policy "authenticated can read products" on products
  for select using (auth.role() = 'authenticated');

create policy "authenticated can read orders" on orders
  for select using (auth.role() = 'authenticated');

create policy "authenticated can read order_items" on order_items
  for select using (auth.role() = 'authenticated');

-- Admin can update order status (and nothing else needs client-side writes).
create policy "authenticated can update orders" on orders
  for update using (auth.role() = 'authenticated');

-- Public can read active products (used only if you switch the menu to be DB-driven).
create policy "public can read active products" on products
  for select using (active = true);

-- Note: there are intentionally NO insert/update/delete policies for the
-- anon role on customers/orders/order_items — all writes happen server-side
-- via the service_role key in app/api/orders/route.ts.

-- ============================================================
-- Optional: seed a couple of products for reference (safe to skip/edit)
-- ============================================================
insert into products (name, price, category, image_url) values
  ('Chow Mein', 449, 'Popular', 'https://images.deliveryhero.io/image/fd-pk/products/45330196.jpg'),
  ('Mexican Beef Grilled Burger', 699, 'Popular', 'https://images.deliveryhero.io/image/fd-pk/products/4592766.jpg')
on conflict do nothing;
