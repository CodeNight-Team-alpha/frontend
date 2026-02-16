import { useQuery } from '@tanstack/react-query'
import { getLeaderboard } from '@/api/leaderboard'
import { getHighestBadge } from '@/services/badgeService'
import BadgeDisplay from '@/components/BadgeDisplay'
import styles from './LeaderboardPage.module.css'

export default function LeaderboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderboard(),
  })

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Sıralama yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error instanceof Error ? error.message : 'Sıralama yüklenemedi.'}</p>
      </div>
    )
  }

  const top = data?.top ?? []
  const asOfDate = data?.asOfDate ?? ''

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Sıralama</h1>
      {asOfDate && (
        <p className={styles.asOf}>Tarih: {asOfDate}</p>
      )}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Sıra</th>
              <th>İsim</th>
              <th>Puan</th>
              <th>Rozet</th>
            </tr>
          </thead>
          <tbody>
            {top.map((entry) => {
              const badge = getHighestBadge(entry.badges ?? [])
              return (
                <tr key={entry.userId}>
                  <td>{entry.rank}</td>
                  <td className={styles.name}>{entry.displayName}</td>
                  <td className={styles.points}>{entry.totalPoints.toFixed(0)}</td>
                  <td>
                    <BadgeDisplay badge={badge} size="small" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {top.length === 0 && (
        <p className={styles.empty}>Henüz sıralama verisi yok.</p>
      )}
    </div>
  )
}
