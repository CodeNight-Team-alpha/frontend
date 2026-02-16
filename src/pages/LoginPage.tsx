import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const trimmed = displayName.trim()
    if (!trimmed) {
      setError('Lütfen bir isim girin.')
      return
    }
    setLoading(true)
    try {
      await login(trimmed)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılamadı.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cashback Battle Arena</h1>
        <p className={styles.subtitle}>Devam etmek için isminizi girin</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="displayName" className={styles.label}>
            İsim
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Örn. Ali"
            className={styles.input}
            autoComplete="username"
            disabled={loading}
          />
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Giriş yapılıyor...' : 'Giriş'}
          </button>
        </form>
      </div>
    </div>
  )
}
