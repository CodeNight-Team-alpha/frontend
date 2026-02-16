import { useAuth } from '@/store/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getSnapshot } from '@/api/users'
import { getHighestBadge } from '@/services/badgeService'
import { getTodayNotifications } from '@/services/snapshotService'
import {
  getChallengeName,
  getChallengeNames,
  getMetricGoalHint,
} from '@/constants/challenges'
import MetricCard from '@/components/MetricCard'
import BadgeDisplay from '@/components/BadgeDisplay'
import NotificationList from '@/components/NotificationList'
import {
  Wallet,
  Layers,
  Cpu,
  CalendarDays,
  Target,
  Award,
  Bell,
  Loader2,
  AlertCircle,
} from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
        <p className="mt-4 text-slate-500">Yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 py-12 px-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="mt-4 text-center text-red-700">
          {error instanceof Error ? error.message : 'Veri yüklenemedi.'}
        </p>
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
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Layers className="h-5 w-5 text-primary-500" />
          Görev hedefleriniz
        </h2>
        <p className="mb-4 text-sm text-slate-500">
          Bu metrikler hangi görevlere yaklaştığınızı veya tamamladığınızı gösterir. Hedeflere ulaşın, puan kazanın.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Günlük harcama"
            value={metrics?.spendToday != null ? `₺${metrics.spendToday.toFixed(2)}` : '—'}
            icon={Wallet}
            goalHint={getMetricGoalHint('spendToday', metrics?.spendToday ?? null)}
          />
          <MetricCard
            title="Farklı kategorilerde harcama (bugün)"
            value={metrics?.uniqueCategoriesToday ?? '—'}
            icon={Layers}
            goalHint={getMetricGoalHint(
              'uniqueCategoriesToday',
              metrics?.uniqueCategoriesToday ?? null
            )}
          />
          <MetricCard
            title="Elektronik harcama (bugün)"
            value={metrics?.electronicsSpendToday != null ? `₺${metrics.electronicsSpendToday.toFixed(2)}` : '—'}
            icon={Cpu}
            goalHint={getMetricGoalHint(
              'electronicsSpendToday',
              metrics?.electronicsSpendToday ?? null
            )}
          />
          <MetricCard
            title="Son 7 gün toplam harcama"
            value={metrics?.spend7d != null ? `₺${metrics.spend7d.toFixed(2)}` : '—'}
            icon={CalendarDays}
            goalHint={getMetricGoalHint('spend7d', metrics?.spend7d ?? null)}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Target className="h-5 w-5 text-primary-500" />
          Puan
        </h2>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-primary-600">{totalPoints}</span>
          <span className="text-slate-500">toplam puan</span>
        </div>
      </section>

      {challenge && (challenge.challengeId || challenge.rewardPoints != null) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700">
            <Target className="h-5 w-5 text-primary-500" />
            Seçilen görev
          </h2>
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 space-y-2">
            <p className="text-slate-800">
              <strong className="text-slate-600">Görev:</strong>{' '}
              {challenge.challengeId
                ? getChallengeName(challenge.challengeId)
                : '—'}
            </p>
            <p className="text-slate-800">
              <strong className="text-slate-600">Ödül puanı:</strong>{' '}
              {challenge.rewardPoints ?? '—'}
            </p>
            {challenge.triggeredChallengeIds?.length ? (
              <p className="text-sm text-slate-600">
                <strong>Tamamladığınız görevler:</strong>{' '}
                {getChallengeNames(challenge.triggeredChallengeIds).join(', ')}
              </p>
            ) : null}
            {challenge.suppressedChallengeIds?.length ? (
              <p className="text-sm text-slate-600">
                <strong>Diğer tamamlanan görevler:</strong>{' '}
                {getChallengeNames(challenge.suppressedChallengeIds).join(', ')}
              </p>
            ) : null}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Award className="h-5 w-5 text-primary-500" />
          Öne çıkan rozet
        </h2>
        <BadgeDisplay badge={highestBadge} size="medium" />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-700">
          <Bell className="h-5 w-5 text-primary-500" />
          Bugünkü bildirimler
        </h2>
        <NotificationList
          notifications={todayNotifications}
          emptyMessage="Bugün bildirim yok."
          showDate={true}
        />
      </section>
    </div>
  )
}
