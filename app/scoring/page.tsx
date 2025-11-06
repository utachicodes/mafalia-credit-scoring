"use client";

import { useMemo, useState } from "react";
import { defaultCriteria } from "@/lib/default-criteria";
import { computeScore } from "@/lib/criteria-scoring";
import type { ScoreInput } from "@/lib/criteria";
import { exampleScoreInput } from "@/lib/example-score-input";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/components/language-provider";
import { Download } from "lucide-react";

export default function ScoringPage() {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<ScoreInput>({});

  const normalizedCriteria = useMemo(() => defaultCriteria, []);
  const finalScore01 = useMemo(() => computeScore(normalizedCriteria, inputs), [normalizedCriteria, inputs]);
  const finalScore100 = Math.round(finalScore01 * 100);

  return (
    <AppLayout>
      <div className="space-y-6 page-enter max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{t("nav.scoring")}</h1>
          <p className="text-muted-foreground mt-1">
            Enter sub-scores [0,1] for each criterion. Weights are normalized if the sum ≠ 100%.
          </p>
        </div>

        <div className="animate-slide-up animate-stagger-1">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Credit Scoring Calculator</CardTitle>
                  <CardDescription>Configure scoring criteria and weights</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setInputs(exampleScoreInput)}>
                  Load Example
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {normalizedCriteria.map((c, index) => {
                  const value = inputs[c.id] ?? 0;
                  return (
                    <div key={c.id} className="border border-border/50 rounded-lg p-4 space-y-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{c.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">{c.description}</div>
                        </div>
                        <div className="text-sm font-medium text-muted-foreground ml-4">Weight: {c.defaultWeight}%</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Input
                          type="range"
                          min={c.minScore}
                          max={c.maxScore}
                          step={0.01}
                          value={value}
                          onChange={(e) => setInputs((prev) => ({ ...prev, [c.id]: parseFloat(e.target.value) }))}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          min={c.minScore}
                          max={c.maxScore}
                          step={0.01}
                          value={value}
                          onChange={(e) => setInputs((prev) => ({ ...prev, [c.id]: parseFloat(e.target.value) }))}
                          className="w-24"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-slide-up animate-stagger-2">
          <Card className="border-border/50 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Final Score</div>
                  <div className="text-4xl font-bold text-foreground">{finalScore100} / 100</div>
                  <div className="text-xs text-muted-foreground mt-1">Value: {finalScore01.toFixed(4)} (0-1)</div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
