import type { NotificationDto } from '@/types'

/**
 * Tarih string'ini YYYY-MM-DD olarak alır (ISO date).
 */
function toDateString(isoOrDate: string): string {
  return isoOrDate.slice(0, 10)
}

/**
 * Bugünün tarihi YYYY-MM-DD.
 */
export function getTodayString(): string {
  return toDateString(new Date().toISOString())
}

/**
 * Bildirimlerden sadece "bugün"e ait olanları döndürür.
 * asOfDate veya createdAt bugün ile eşleşenler.
 */
export function getTodayNotifications(
  notifications: NotificationDto[],
  asOfDate: string
): NotificationDto[] {
  const today = getTodayString()
  const snapshotDay = toDateString(asOfDate)
  return (notifications ?? []).filter((n) => {
    const createdDay = toDateString(n.createdAt)
    return createdDay === today || createdDay === snapshotDay
  })
}
