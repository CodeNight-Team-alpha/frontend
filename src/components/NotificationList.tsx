import type { NotificationDto } from '@/types'
import { Bell } from 'lucide-react'

interface NotificationListProps {
  notifications: NotificationDto[]
  emptyMessage?: string
  showDate?: boolean
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso.length === 10 ? iso + 'T12:00:00' : iso)
    return d.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

function displayDate(n: NotificationDto): string {
  const raw = n.completedAt ?? n.createdAt
  return formatDate(raw)
}

export default function NotificationList({
  notifications,
  emptyMessage = 'Bildirim yok',
  showDate = true,
}: NotificationListProps) {
  if (!notifications?.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-6 text-center">
        <Bell className="mx-auto h-10 w-10 text-slate-300" />
        <p className="mt-2 text-sm text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <ul className="space-y-2">
      {notifications.map((n) => (
        <li
          key={n.id}
          className="flex flex-col gap-1 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <span className="font-medium text-slate-800">{n.message}</span>
          {showDate && (
            <span className="text-xs text-slate-500">{displayDate(n)}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
