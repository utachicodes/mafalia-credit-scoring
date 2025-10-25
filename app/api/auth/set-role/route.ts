import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { role, redirect } = await req.json().catch(() => ({ role: "guest" }));
  const res = NextResponse.redirect(redirect || "/");
  res.cookies.set("mafalia_role", String(role), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
