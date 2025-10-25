"use client";

import Link from "next/link";
import { useMemo } from "react";
import { buildScoreInputForClient } from "@/lib/scoring-mapper";

export function ConfigurableScoreCard({ clientId = "c1" }: { clientId?: string }) {
  const score01 = useMemo(() => buildScoreInputForClient(clientId).score01, [clientId]);
  const score100 = Math.round(score01 * 100);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Configurable Score</div>
          <div className="text-2xl font-semibold">{score100} / 100</div>
        </div>
        <Link className="underline text-sm" href="/scoring">Adjust criteria</Link>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Based on last 6 months data for client <code>{clientId}</code>.
      </div>
    </div>
  );
}
