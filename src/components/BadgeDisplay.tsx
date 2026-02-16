import type { BadgeDto } from '@/types'
import styles from './BadgeDisplay.module.css'

interface BadgeDisplayProps {
  badge: BadgeDto | null
  size?: 'small' | 'medium'
}

const thresholdLabels: Record<string, string> = {
  Bronze: 'Bronz',
  Silver: 'Gümüş',
  Gold: 'Altın',
}

function getLabel(name: string): string {
  return thresholdLabels[name] ?? name
}

function getBadgeClass(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('gold')) return styles.gold
  if (n.includes('silver')) return styles.silver
  if (n.includes('bronze')) return styles.bronze
  return styles.default
}

export default function BadgeDisplay({ badge, size = 'medium' }: BadgeDisplayProps) {
  if (!badge) {
    return (
      <span className={`${styles.badge} ${styles.empty} ${styles[size]}`}>
        Rozet yok
      </span>
    )
  }

  return (
    <span
      className={`${styles.badge} ${getBadgeClass(badge.badgeName)} ${styles[size]}`}
      title={`${getLabel(badge.badgeName)} (eşik: ${badge.threshold})`}
    >
      {getLabel(badge.badgeName)}
    </span>
  )
}
