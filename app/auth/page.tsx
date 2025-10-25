"use client";

import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const params = useSearchParams();
  const from = params.get("from") ?? "/";

  const setRole = async (role: string) => {
    const res = await fetch("/api/auth/set-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, redirect: from }),
    });
    if (res.redirected) {
      window.location.href = res.url;
    } else {
      window.location.href = from;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded-lg p-6 space-y-4 w-[360px]">
        <div className="text-lg font-semibold">Sign in (demo)</div>
        <div className="text-sm text-muted-foreground">Select a role to continue.</div>
        <div className="grid gap-2">
          <button className="border rounded px-3 py-2" onClick={() => setRole("user")}>Continue as User</button>
          <button className="border rounded px-3 py-2" onClick={() => setRole("lender")}>Continue as Lender</button>
          <button className="border rounded px-3 py-2" onClick={() => setRole("admin")}>Continue as Admin</button>
          <button className="border rounded px-3 py-2" onClick={() => setRole("guest")}>Continue as Guest</button>
        </div>
      </div>
    </div>
  );
}
