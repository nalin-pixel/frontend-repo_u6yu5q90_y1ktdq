import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PromptForm from './components/PromptForm'
import ResultsGrid from './components/ResultsGrid'
import ConnectKeys from './components/ConnectKeys'
import Login from './components/Login'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Home({ email }) {
  const [results, setResults] = useState(null)

  const onGenerate = async (payload) => {
    const res = await fetch(`${BACKEND_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    setResults(data)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Hero />
      <PromptForm onGenerate={onGenerate} />
      <ResultsGrid results={results} />
    </div>
  )
}

function ConnectPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <ConnectKeys />
    </div>
  )
}

function HistoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-white text-2xl font-semibold mb-2">History</h2>
      <p className="text-white/70">MVP placeholder — future version will store your past prompts and results.</p>
    </div>
  )
}

export default function App() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '{}')
    if (session.email) setEmail(session.email)
  }, [])

  const logout = () => {
    localStorage.removeItem('session')
    setEmail('')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar email={email} onLogout={logout} />
      <div className="py-4">
        <Routes>
          <Route path="/" element={<Home email={email} />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <footer className="text-center py-6 text-white/50 text-sm">Built with Vibe Builder</footer>
    </div>
  )
}
