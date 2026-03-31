import { petStageConfig } from '@/lib/mockData'

export function getPetStage(points: number): 1 | 2 | 3 {
  const stage = [...petStageConfig]
    .reverse()
    .find((s) => points >= s.minPoints)
  return (stage?.stage ?? 1) as 1 | 2 | 3
}

export function getProgressPercent(points: number, stage: 1 | 2 | 3): number {
  const current = petStageConfig.find((s) => s.stage === stage)
  if (!current) return 0
  // Stage 3 is max — show 100%
  if (stage === 3) return 100
  const next = petStageConfig.find((s) => s.stage === stage + 1)
  if (!next) return 100
  const rangeMin = current.minPoints
  const rangeMax = next.minPoints
  const pct = ((points - rangeMin) / (rangeMax - rangeMin)) * 100
  return Math.min(100, Math.max(0, Math.round(pct)))
}

export function getNextStagePoints(stage: 1 | 2 | 3): number | null {
  const next = petStageConfig.find((s) => s.stage === stage + 1)
  return next ? next.minPoints : null
}
