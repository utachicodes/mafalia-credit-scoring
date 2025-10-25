-- Insert sample clients
insert into public.clients (id, name, type, location, joined_at) values
  ('11111111-1111-1111-1111-111111111111', 'Restaurant Le Baobab', 'Restaurant', 'Dakar, Plateau', '2024-01-15T10:00:00Z'),
  ('22222222-2222-2222-2222-222222222222', 'Boutique Fatou', 'Retail', 'Dakar, Medina', '2024-02-20T14:30:00Z'),
  ('33333333-3333-3333-3333-333333333333', 'Atelier Couture Aminata', 'Services', 'Thiès', '2024-03-10T09:15:00Z')
on conflict (id) do nothing;

-- Insert sample transactions for Restaurant Le Baobab
insert into public.transactions (client_id, date, amount, method, direction) values
  ('11111111-1111-1111-1111-111111111111', '2024-10-01T12:00:00Z', 45000, 'CASH', 'INFLOW'),
  ('11111111-1111-1111-1111-111111111111', '2024-10-01T14:30:00Z', 32000, 'WAVE', 'INFLOW'),
  ('11111111-1111-1111-1111-111111111111', '2024-10-02T11:00:00Z', 28000, 'ORANGE_MONEY', 'INFLOW'),
  ('11111111-1111-1111-1111-111111111111', '2024-10-02T15:00:00Z', 15000, 'CASH', 'OUTFLOW'),
  ('11111111-1111-1111-1111-111111111111', '2024-10-03T13:00:00Z', 52000, 'CARD', 'INFLOW')
on conflict do nothing;

-- Insert sample loan requests
insert into public.loan_requests (id, client_id, amount, term_months, status, purpose) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 5000000, 12, 'APPROVED', 'Equipment purchase'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 2500000, 6, 'ACTIVE', 'Inventory expansion'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 1500000, 9, 'PENDING', 'Working capital')
on conflict (id) do nothing;

-- Insert sample monthly financials
insert into public.monthly_financials (client_id, year_month, revenue, tx_count, expenses, cash, wave, orange, card) values
  ('11111111-1111-1111-1111-111111111111', '2024-09', 8500000, 245, 4200000, 3200000, 2800000, 1900000, 600000),
  ('11111111-1111-1111-1111-111111111111', '2024-08', 7800000, 228, 3900000, 2900000, 2600000, 1800000, 500000),
  ('22222222-2222-2222-2222-222222222222', '2024-09', 4200000, 156, 2100000, 1800000, 1400000, 800000, 200000)
on conflict (client_id, year_month) do nothing;
