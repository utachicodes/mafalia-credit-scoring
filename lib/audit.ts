import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./nextauth-options";
import type { NextRequest } from "next/server";

export async function logAccess(req: NextRequest, params: {
  endpoint: string;
  resourceId?: string;
  meta?: Record<string, any>;
}) {
  try {
    const session = await getServerSession(authOptions as any);
    const userId = (session as any)?.user?.id ?? null;
    const role = (session as any)?.role ?? "guest";
    const ip = req.headers.get("x-forwarded-for") || undefined;
    await prisma.auditLog.create({
      data: {
        userId: userId ?? undefined,
        role: String(role),
        endpoint: params.endpoint,
        method: req.method,
        resourceId: params.resourceId,
        ip,
        meta: params.meta as any,
      },
    });
  } catch (e) {
    // swallow errors in audit path
    console.error("audit log error", e);
  }
}
