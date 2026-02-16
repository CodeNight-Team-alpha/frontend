import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import { LayoutDashboard, Trophy, Bell, LogOut, Zap } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLink =
    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-arena-dark to-slate-900 px-4 py-3 shadow-lg sm:px-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-lg font-bold text-white hover:text-primary-200 transition-colors"
        >
          <Zap className="h-6 w-6 text-amber-400" />
          Cashback Battle Arena
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/dashboard"
            className={navLink}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/leaderboard"
            className={navLink}
          >
            <Trophy className="h-4 w-4" />
            Sıralama
          </Link>
          <Link
            to="/notifications"
            className={navLink}
          >
            <Bell className="h-4 w-4" />
            Bildirimler
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-primary-200">
            {user?.displayName}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Çıkış
          </button>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  )
}
