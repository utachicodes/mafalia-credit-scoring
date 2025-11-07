-- Wallet tables

create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  currency text not null default 'XOF',
  balance numeric not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists wallets_user_id_key on public.wallets(user_id);

create table if not exists public.wallet_transactions (
  id uuid primary key,
  wallet_id uuid not null references public.wallets(id) on delete cascade,
  type text not null check (type in ('topup','transfer_in','transfer_out','withdraw','refund','adjustment')),
  status text not null default 'succeeded' check (status in ('pending','succeeded','failed','cancelled')),
  amount numeric not null check (amount >= 0),
  currency text not null default 'XOF',
  note text,
  reference text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists wallet_transactions_wallet_id_created_at_idx on public.wallet_transactions(wallet_id, created_at desc);

alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;

-- Policies (basic)
drop policy if exists wallets_select_own on public.wallets;
create policy wallets_select_own on public.wallets for select using (auth.uid() = user_id);

drop policy if exists wallets_insert_self on public.wallets;
create policy wallets_insert_self on public.wallets for insert with check (auth.uid() = user_id);

drop policy if exists wallet_txs_select_own on public.wallet_transactions;
create policy wallet_txs_select_own on public.wallet_transactions for select using (
  exists (select 1 from public.wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

-- Service role bypasses RLS; updates are done via server/admin


