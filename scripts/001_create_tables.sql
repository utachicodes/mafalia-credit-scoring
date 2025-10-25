-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enum types
create type user_role as enum ('USER', 'LENDER', 'ADMIN');
create type loan_status as enum ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'COMPLETED', 'DEFAULTED');
create type transaction_direction as enum ('INFLOW', 'OUTFLOW');
create type payment_method as enum ('CASH', 'WAVE', 'ORANGE_MONEY', 'MTN_MONEY', 'FREE_MONEY', 'CARD');

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  role user_role not null default 'USER',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Clients table
create table if not exists public.clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text not null,
  location text not null,
  joined_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Transactions table
create table if not exists public.transactions (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients(id) on delete cascade,
  date timestamptz not null default now(),
  amount bigint not null,
  method payment_method not null,
  direction transaction_direction not null,
  created_at timestamptz not null default now()
);

-- Loan requests table
create table if not exists public.loan_requests (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients(id) on delete cascade,
  amount bigint not null,
  term_months int not null,
  status loan_status not null default 'PENDING',
  purpose text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Monthly financials table
create table if not exists public.monthly_financials (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid not null references public.clients(id) on delete cascade,
  year_month text not null,
  revenue bigint not null default 0,
  tx_count int not null default 0,
  expenses bigint not null default 0,
  cash bigint not null default 0,
  wave bigint not null default 0,
  orange bigint not null default 0,
  card bigint not null default 0,
  created_at timestamptz not null default now(),
  unique(client_id, year_month)
);

-- Audit logs table
create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  at timestamptz not null default now(),
  user_id uuid references auth.users(id) on delete set null,
  role text not null,
  endpoint text not null,
  method text not null,
  resource_id text,
  ip text,
  meta jsonb
);

-- Create indexes
create index if not exists idx_transactions_client_date on public.transactions(client_id, date desc);
create index if not exists idx_loan_requests_client_created on public.loan_requests(client_id, created_at desc);
create index if not exists idx_monthly_financials_client_ym on public.monthly_financials(client_id, year_month desc);
create index if not exists idx_audit_logs_at on public.audit_logs(at desc);
