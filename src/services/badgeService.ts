import type { BadgeDto } from '@/types'

/**
 * badges listesinden threshold değeri en yüksek olan tek rozeti döndürür.
 * Dashboard ve leaderboard'da "öne çıkan rozet" olarak kullanılır.
 */
export function getHighestBadge(badges: BadgeDto[]): BadgeDto | null {
  if (!badges?.length) return null
  return badges.reduce((best, current) =>
    current.threshold > (best?.threshold ?? -1) ? current : best
  )
}
