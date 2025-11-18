import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ email, onLogout }) {
  const { pathname } = useLocation()
  const navLink = (to, label) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === to ? 'bg-white/10 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white font-semibold tracking-tight">
              Vibe Builder Aggregator
            </Link>
            <div className="hidden sm:flex items-center gap-2">
              {navLink('/', 'Home')}
              {navLink('/connect', 'Connect APIs')}
              {navLink('/history', 'History')}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {email ? (
              <>
                <span className="text-white/80 text-sm hidden sm:inline">{email}</span>
                <button onClick={onLogout} className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white transition">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white transition">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
