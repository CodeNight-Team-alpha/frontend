import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import { Zap, Loader2 } from 'lucide-react'

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-500 text-white shadow-lg">
            <Zap className="h-8 w-8" />
          </div>
        </div>
        <h1 className="text-center text-2xl font-bold text-slate-800">
          Cashback Battle Arena
        </h1>
        <p className="mt-2 text-center text-sm text-slate-500">
          Devam etmek için isminizi girin
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="displayName" className="block text-sm font-medium text-slate-700">
            İsim
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Örn. Ali"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-60"
            autoComplete="username"
            disabled={loading}
          />
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 font-semibold text-white shadow-md transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Giriş yapılıyor...
              </>
            ) : (
              'Giriş'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
