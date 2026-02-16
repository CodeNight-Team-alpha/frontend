import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import styles from './Layout.module.css'

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

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/dashboard" className={styles.logo}>
          Cashback Battle Arena
        </Link>
        <nav className={styles.nav}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/leaderboard">Sıralama</Link>
          <Link to="/notifications">Bildirimler</Link>
        </nav>
        <div className={styles.userBar}>
          <span className={styles.displayName}>{user?.displayName}</span>
          <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
            Çıkış
          </button>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
