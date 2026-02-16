import { LucideIcon } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
  /** Görev hedefi / ilerleme: kullanıcıya anlamlı açıklama */
  goalHint?: {
    goalText: string
    detail: string
    status: 'done' | 'pending'
  }
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  goalHint,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {Icon && (
          <span className="rounded-lg bg-primary-50 p-1.5 text-primary-600">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
      {subtitle != null && subtitle !== '' && (
        <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
      )}
      {goalHint && (
        <div
          className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
            goalHint.status === 'done'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-slate-100 bg-slate-50 text-slate-600'
          }`}
        >
          <div className="flex items-start gap-2">
            {goalHint.status === 'done' && (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            )}
            <div>
              <p className="font-medium">{goalHint.goalText}</p>
              <p className="mt-0.5 text-slate-500">{goalHint.detail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
