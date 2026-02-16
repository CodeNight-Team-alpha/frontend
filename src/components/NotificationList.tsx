import type { NotificationDto } from '@/types'
import styles from './NotificationList.module.css'

interface NotificationListProps {
  notifications: NotificationDto[]
  emptyMessage?: string
  showDate?: boolean
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

export default function NotificationList({
  notifications,
  emptyMessage = 'Bildirim yok',
  showDate = true,
}: NotificationListProps) {
  if (!notifications?.length) {
    return <p className={styles.empty}>{emptyMessage}</p>
  }

  return (
    <ul className={styles.list}>
      {notifications.map((n) => (
        <li key={n.id} className={styles.item}>
          <span className={styles.message}>{n.message}</span>
          {showDate && (
            <span className={styles.date}>{formatDate(n.createdAt)}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
