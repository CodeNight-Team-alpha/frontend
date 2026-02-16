import { useQuery } from '@tanstack/react-query'
import { getLeaderboard } from '@/api/leaderboard'
import { getHighestBadge } from '@/services/badgeService'
import BadgeDisplay from '@/components/BadgeDisplay'
import { Trophy, Loader2, AlertCircle, Calendar } from 'lucide-react'

export default function LeaderboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => getLeaderboard(),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
        <p className="mt-4 text-slate-500">Sıralama yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 py-12 px-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="mt-4 text-center text-red-700">
          {error instanceof Error ? error.message : 'Sıralama yüklenemedi.'}
        </p>
      </div>
    )
  }

  const top = data?.top ?? []
  const asOfDate = data?.asOfDate ?? ''

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <Trophy className="h-7 w-7 text-amber-500" />
          Sıralama
        </h1>
        {asOfDate && (
          <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-600">
            <Calendar className="h-4 w-4" />
            {asOfDate}
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sıra
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                İsim
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Puan
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Rozet
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {top.map((entry) => {
              const badge = getHighestBadge(entry.badges ?? [])
              return (
                <tr
                  key={entry.userId}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {entry.rank}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {entry.displayName}
                  </td>
                  <td className="px-4 py-3 font-bold text-primary-600">
                    {entry.totalPoints.toFixed(0)}
                  </td>
                  <td className="px-4 py-3">
                    <BadgeDisplay badge={badge} size="small" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {top.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 py-12 text-center">
          <Trophy className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-4 text-slate-500">Henüz sıralama verisi yok.</p>
        </div>
      )}
    </div>
  )
}
