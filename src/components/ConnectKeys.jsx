import { useEffect, useState } from 'react'

export default function ConnectKeys() {
  const [openai, setOpenai] = useState('')
  const [claude, setClaude] = useState('')
  const [groq, setGroq] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('apiKeys') || '{}')
    if (stored.openai_api_key) setOpenai(stored.openai_api_key)
    if (stored.claude_api_key) setClaude(stored.claude_api_key)
    if (stored.groq_api_key) setGroq(stored.groq_api_key)
  }, [])

  const save = () => {
    localStorage.setItem('apiKeys', JSON.stringify({
      openai_api_key: openai.trim() || undefined,
      claude_api_key: claude.trim() || undefined,
      groq_api_key: groq.trim() || undefined,
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 1200)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-white text-2xl font-semibold mb-4">Connect API Keys</h2>
      <p className="text-white/70 mb-6">Keys are stored locally in your browser for this MVP and never sent anywhere unless you generate.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm mb-1">OpenAI API Key</label>
          <input value={openai} onChange={e=>setOpenai(e.target.value)} type="password" placeholder="sk-..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none" />
        </div>
        <div>
          <label className="block text-white/80 text-sm mb-1">Claude (Anthropic) API Key</label>
          <input value={claude} onChange={e=>setClaude(e.target.value)} type="password" placeholder="anthropic_..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none" />
        </div>
        <div>
          <label className="block text-white/80 text-sm mb-1">Groq API Key (for Llama)</label>
          <input value={groq} onChange={e=>setGroq(e.target.value)} type="password" placeholder="gsk_..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none" />
        </div>
        <button onClick={save} className="px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-medium transition">Save Keys</button>
        {saved && <span className="text-green-300 ml-3">Saved!</span>}
      </div>
    </div>
  )
}
