import { getRoleFromCookieValue, type Role } from "./auth";
import { cookies as nextCookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "./nextauth-options";

export async function resolveRole(): Promise<Role> {
  try {
    const session = await getServerSession(authOptions as any);
    const role = (session as any)?.role as Role | undefined;
    if (role) return role;
  } catch {}
  try {
    const c = nextCookies();
    return getRoleFromCookieValue(c.get("mafalia_role")?.value);
  } catch {}
  return "guest";
}

export function ensureLender(role: Role) {
  if (!(role === "lender" || role === "admin")) {
    const err = new Error("Forbidden");
    (err as any).status = 403;
    throw err;
  }
}
