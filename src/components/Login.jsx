import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '{}')
    if (session.email) navigate('/')
  }, [navigate])

  const submit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    localStorage.setItem('session', JSON.stringify({ email }))
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-white text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none" />
        <button type="submit" className="w-full px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-medium transition">Continue</button>
        {error && <p className="text-red-300 text-sm">{error}</p>}
      </form>
    </div>
  )
}
