import type { BadgeDto } from '@/types'
import { Award } from 'lucide-react'

const thresholdLabels: Record<string, string> = {
  Bronze: 'Bronz',
  Silver: 'Gümüş',
  Gold: 'Altın',
}

function getLabel(name: string): string {
  return thresholdLabels[name] ?? name
}

const badgeStyles: Record<string, string> = {
  bronze: 'bg-amber-700/90 text-amber-100 border-amber-600/50',
  silver: 'bg-slate-400 text-slate-900 border-slate-500/50',
  gold: 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-950 border-amber-500/50',
  default: 'bg-primary-500 text-white border-primary-600/50',
}

function getBadgeStyle(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('gold')) return badgeStyles.gold
  if (n.includes('silver')) return badgeStyles.silver
  if (n.includes('bronze')) return badgeStyles.bronze
  return badgeStyles.default
}

const sizeClasses = {
  small: 'px-2 py-0.5 text-xs',
  medium: 'px-3 py-1.5 text-sm',
}

interface BadgeDisplayProps {
  badge: BadgeDto | null
  size?: 'small' | 'medium'
}

export default function BadgeDisplay({ badge, size = 'medium' }: BadgeDisplayProps) {
  if (!badge) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses[size]} bg-slate-100 text-slate-500 border-slate-200`}
      >
        <Award className="h-3.5 w-3" />
        Rozet yok
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${getBadgeStyle(badge.badgeName)} ${sizeClasses[size]}`}
      title={`${getLabel(badge.badgeName)} (eşik: ${badge.threshold})`}
    >
      <Award className="h-3.5 w-3" />
      {getLabel(badge.badgeName)}
    </span>
  )
}
