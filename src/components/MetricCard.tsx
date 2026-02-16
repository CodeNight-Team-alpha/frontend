import styles from './MetricCard.module.css'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
}

export default function MetricCard({ title, value, subtitle }: MetricCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
      {subtitle != null && subtitle !== '' && (
        <div className={styles.subtitle}>{subtitle}</div>
      )}
    </div>
  )
}
