"use client";

import { useMemo, useState } from "react";
import { defaultCriteria } from "@/lib/default-criteria";
import { computeScore } from "@/lib/criteria-scoring";
import type { ScoreInput } from "@/lib/criteria";
import { exampleScoreInput } from "@/lib/example-score-input";

export default function ScoringPage() {
  const [inputs, setInputs] = useState<ScoreInput>({});

  const normalizedCriteria = useMemo(() => defaultCriteria, []);
  const finalScore01 = useMemo(() => computeScore(normalizedCriteria, inputs), [normalizedCriteria, inputs]);
  const finalScore100 = Math.round(finalScore01 * 100);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 page-enter">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold">Credit Scoring Preview</h1>
        <p className="text-sm text-muted-foreground">
          Saisissez des sous-scores [0,1] pour chaque critère. Les pondérations sont normalisées si la somme ≠ 100%.
        </p>
      </div>

      <div>
        <button
          className="px-3 py-2 text-sm rounded border"
          onClick={() => setInputs(exampleScoreInput)}
        >
          Charger un exemple
        </button>
      </div>

      <div className="space-y-4">
        {normalizedCriteria.map((c) => {
          const value = inputs[c.id] ?? 0;
          return (
            <div key={c.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{c.label}</div>
                  <div className="text-xs text-muted-foreground">{c.description}</div>
                </div>
                <div className="text-sm">Poids: {c.defaultWeight}%</div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min={c.minScore}
                  max={c.maxScore}
                  step={0.01}
                  value={value}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [c.id]: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <input
                  type="number"
                  min={c.minScore}
                  max={c.maxScore}
                  step={0.01}
                  value={value}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [c.id]: parseFloat(e.target.value) }))}
                  className="w-20 border rounded px-2 py-1 text-right"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-0 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg p-4">
        <div className="text-lg font-semibold">Score final: {finalScore100} / 100</div>
        <div className="text-xs text-muted-foreground">Valeur: {finalScore01.toFixed(4)} (0-1)</div>
      </div>
    </div>
  );
}
