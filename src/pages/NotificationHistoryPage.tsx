import { useAuth } from '@/store/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { getNotifications } from '@/api/users'
import NotificationList from '@/components/NotificationList'
import { Bell, Loader2, AlertCircle } from 'lucide-react'

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
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
        <p className="mt-4 text-slate-500">Bildirimler yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 py-12 px-4">
        <AlertCircle className="h-10 w-10 text-red-500" />
        <p className="mt-4 text-center text-red-700">
          {error instanceof Error ? error.message : 'Bildirimler yüklenemedi.'}
        </p>
      </div>
    )
  }

  const sorted = [...notifications].sort((a, b) => {
    const dateA = a.completedAt ?? a.createdAt
    const dateB = b.completedAt ?? b.createdAt
    const tA = new Date(dateA.length === 10 ? dateA + 'T12:00:00' : dateA).getTime()
    const tB = new Date(dateB.length === 10 ? dateB + 'T12:00:00' : dateB).getTime()
    return tB - tA
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <Bell className="h-7 w-7 text-primary-500" />
          Bildirim geçmişi
        </h1>
        <p className="mt-2 text-slate-500">
          Tüm bildirimleriniz
        </p>
      </div>
      <NotificationList
        notifications={sorted}
        emptyMessage="Henüz bildirim yok."
        showDate={true}
      />
    </div>
  )
}
