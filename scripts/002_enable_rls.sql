-- Enable Row Level Security on all tables
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.transactions enable row level security;
alter table public.loan_requests enable row level security;
alter table public.monthly_financials enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- Clients policies (LENDER and ADMIN can manage)
create policy "Lenders and admins can view clients"
  on public.clients for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

create policy "Lenders and admins can insert clients"
  on public.clients for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

create policy "Lenders and admins can update clients"
  on public.clients for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

-- Transactions policies
create policy "Lenders and admins can view transactions"
  on public.transactions for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

create policy "Lenders and admins can insert transactions"
  on public.transactions for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

-- Loan requests policies
create policy "Lenders and admins can view loan requests"
  on public.loan_requests for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

create policy "Lenders and admins can insert loan requests"
  on public.loan_requests for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

create policy "Lenders and admins can update loan requests"
  on public.loan_requests for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

-- Monthly financials policies
create policy "Lenders and admins can view monthly financials"
  on public.monthly_financials for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

create policy "Lenders and admins can insert monthly financials"
  on public.monthly_financials for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('LENDER', 'ADMIN')
    )
  );

-- Audit logs policies (only admins)
create policy "Admins can view audit logs"
  on public.audit_logs for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

create policy "System can insert audit logs"
  on public.audit_logs for insert
  with check (true);
