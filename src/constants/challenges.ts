/**
 * Challenge ID → kullanıcıya gösterilecek isim (challenges tablosu ile uyumlu)
 */
export const CHALLENGE_NAMES: Record<string, string> = {
  'C-01': 'Günlük Harcama',
  'C-02': 'Kategori Avcısı',
  'C-03': 'Elektronik Bonus',
  'C-04': 'Haftalık Aktif',
}

/** Görev hedefleri (condition) ve ödül puanı – kullanıcıya anlamlı metrik açıklaması için */
export const CHALLENGE_GOALS: Record<
  string,
  { threshold: number; unit: string; rewardPoints: number }
> = {
  'C-01': { threshold: 200, unit: '₺', rewardPoints: 60 },
  'C-02': { threshold: 3, unit: ' kategori', rewardPoints: 120 },
  'C-03': { threshold: 300, unit: '₺', rewardPoints: 180 },
  'C-04': { threshold: 1500, unit: '₺', rewardPoints: 220 },
}

/** Metrik alanı → ilgili challenge ID */
export const METRIC_TO_CHALLENGE: Record<string, string> = {
  spendToday: 'C-01',
  uniqueCategoriesToday: 'C-02',
  electronicsSpendToday: 'C-03',
  spend7d: 'C-04',
}

export function getChallengeName(id: string): string {
  return CHALLENGE_NAMES[id] ?? id
}

export function getChallengeNames(ids: string[]): string[] {
  return (ids ?? []).map(getChallengeName)
}

export function getMetricGoalHint(
  metricKey: string,
  currentValue: number | null
): { goalText: string; status: 'done' | 'pending'; detail: string } | null {
  const challengeId = METRIC_TO_CHALLENGE[metricKey]
  if (!challengeId) return null
  const goal = CHALLENGE_GOALS[challengeId]
  if (!goal) return null
  const name = getChallengeName(challengeId)
  const target = goal.threshold
  const unit = goal.unit
  const value = currentValue ?? 0
  const isDone = value >= target
  const remaining = Math.max(0, target - value)

  const targetStr = unit === '₺' ? `₺${target}` : `${target}${unit}`

  if (isDone) {
    return {
      goalText: `${name} görevi tamamlandı (+${goal.rewardPoints} puan)`,
      status: 'done',
      detail: `Hedef: ${targetStr}`,
    }
  }
  const remainingStr =
    unit === '₺'
      ? `₺${remaining.toFixed(0)} kaldı`
      : unit === ' kategori'
        ? `${remaining} kategori kaldı`
        : `₺${remaining.toFixed(0)} kaldı`
  return {
    goalText: `${name} için hedef: ${targetStr}`,
    status: 'pending',
    detail: remainingStr,
  }
}
