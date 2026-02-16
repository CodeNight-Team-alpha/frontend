import { useAuth } from '@/store/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getSnapshot } from '@/api/users'
import { getHighestBadge } from '@/services/badgeService'
import { getTodayNotifications } from '@/services/snapshotService'
import MetricCard from '@/components/MetricCard'
import BadgeDisplay from '@/components/BadgeDisplay'
import NotificationList from '@/components/NotificationList'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const userId = user?.userId ?? ''

  const { data: snapshot, isLoading, error } = useQuery({
    queryKey: ['snapshot', userId],
    queryFn: () => getSnapshot(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error instanceof Error ? error.message : 'Veri yüklenemedi.'}</p>
      </div>
    )
  }

  const metrics = snapshot?.metrics
  const challenge = snapshot?.challenge
  const totalPoints = snapshot?.points?.totalPoints ?? 0
  const badges = snapshot?.badges ?? []
  const highestBadge = getHighestBadge(badges)
  const allNotifications = snapshot?.notifications ?? []
  const asOfDate = snapshot?.asOfDate ?? ''
  const todayNotifications = getTodayNotifications(allNotifications, asOfDate)

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Metrikler</h2>
        <div className={styles.metricsGrid}>
          <MetricCard
            title="Günlük harcama"
            value={metrics?.spendToday != null ? `₺${metrics.spendToday.toFixed(2)}` : '—'}
          />
          <MetricCard
            title="Bugünkü benzersiz kategoriler"
            value={metrics?.uniqueCategoriesToday ?? '—'}
          />
          <MetricCard
            title="Elektronik harcama (bugün)"
            value={metrics?.electronicsSpendToday != null ? `₺${metrics.electronicsSpendToday.toFixed(2)}` : '—'}
          />
          <MetricCard
            title="Son 7 gün harcama"
            value={metrics?.spend7d != null ? `₺${metrics.spend7d.toFixed(2)}` : '—'}
          />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Puan</h2>
        <div className={styles.pointsBlock}>
          <span className={styles.pointsValue}>{totalPoints}</span>
          <span className={styles.pointsLabel}>toplam puan</span>
        </div>
      </section>

      {challenge && (challenge.challengeId || challenge.rewardPoints != null) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Seçilen challenge</h2>
          <div className={styles.challengeCard}>
            <p>
              <strong>Challenge ID:</strong> {challenge.challengeId ?? '—'}
            </p>
            <p>
              <strong>Ödül puanı:</strong> {challenge.rewardPoints ?? '—'}
            </p>
            {challenge.triggeredChallengeIds?.length ? (
              <p className={styles.small}>
                Tetiklenen: {challenge.triggeredChallengeIds.join(', ')}
              </p>
            ) : null}
            {challenge.suppressedChallengeIds?.length ? (
              <p className={styles.small}>
                Bastırılan: {challenge.suppressedChallengeIds.join(', ')}
              </p>
            ) : null}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Öne çıkan rozet</h2>
        <BadgeDisplay badge={highestBadge} size="medium" />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Bugünkü bildirimler</h2>
        <NotificationList
          notifications={todayNotifications}
          emptyMessage="Bugün bildirim yok."
          showDate={true}
        />
      </section>
    </div>
  )
}
