-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', null),
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'USER')
  )
  on conflict (id) do nothing;
  
  return new;
end;
$$;

-- Trigger to auto-create profile on signup
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Add updated_at triggers
create trigger set_updated_at_profiles
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at_clients
  before update on public.clients
  for each row
  execute function public.handle_updated_at();

create trigger set_updated_at_loan_requests
  before update on public.loan_requests
  for each row
  execute function public.handle_updated_at();
