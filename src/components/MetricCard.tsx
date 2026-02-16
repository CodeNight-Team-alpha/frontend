import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: LucideIcon
}

export default function MetricCard({ title, value, subtitle, icon: Icon }: MetricCardProps) {
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
    </div>
  )
}
