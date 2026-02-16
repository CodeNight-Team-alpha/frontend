import { useAuth } from '@/store/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getNotifications } from '@/api/users'
import NotificationList from '@/components/NotificationList'
import styles from './NotificationHistoryPage.module.css'

export default function NotificationHistoryPage() {
  const { user } = useAuth()
  const userId = user?.userId ?? ''

  const { data: notifications = [], isLoading, error } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Bildirimler yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error instanceof Error ? error.message : 'Bildirimler yüklenemedi.'}</p>
      </div>
    )
  }

  const sorted = [...notifications].sort((a, b) => {
    const tA = new Date(a.createdAt).getTime()
    const tB = new Date(b.createdAt).getTime()
    return tB - tA
  })

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Bildirim geçmişi</h1>
      <p className={styles.subtitle}>Tüm bildirimleriniz, en yeni üstte</p>
      <NotificationList
        notifications={sorted}
        emptyMessage="Henüz bildirim yok."
        showDate={true}
      />
    </div>
  )
}
