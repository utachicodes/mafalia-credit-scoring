import { Criterion, ScoreInput } from "./criteria";

export function normalizeWeights(criteria: Criterion[]): Criterion[] {
  const sum = criteria.reduce((s, c) => s + c.defaultWeight, 0);
  if (sum <= 0) return criteria;
  if (Math.abs(sum - 100) < 1e-6) return criteria;
  const factor = 100 / sum;
  return criteria.map((c) => ({ ...c, defaultWeight: +(c.defaultWeight * factor).toFixed(6) }));
}

export function applyWeightOverrides(
  criteria: Criterion[],
  overrides: Partial<Record<Criterion["id"], number>>
): Criterion[] {
  return criteria.map((c) =>
    overrides[c.id] !== undefined ? { ...c, defaultWeight: overrides[c.id]! } : c
  );
}

export function computeScore(criteria: Criterion[], inputs: ScoreInput): number {
  const normalized = normalizeWeights(criteria);
  let total = 0;
  for (const c of normalized) {
    const raw = inputs[c.id] ?? 0;
    const clamped = Math.max(c.minScore, Math.min(c.maxScore, raw));
    total += (clamped * c.defaultWeight) / 100; // contribution in [0,1]
  }
  return +total.toFixed(4); // final score in [0,1]
}
