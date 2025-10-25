export type Role = "guest" | "user" | "lender" | "admin";

// Obtain role from a cookie value (string) if available
export function getRoleFromCookieValue(value?: string | null): Role {
  const role = (value ?? undefined) as Role | undefined;
  if (role === "lender" || role === "admin" || role === "user") return role;
  return "guest";
}

export function hasLenderAccess(role: Role): boolean {
  return role === "lender" || role === "admin";
}
