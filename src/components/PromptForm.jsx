import { useState } from 'react'

export default function PromptForm({ onGenerate }) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!prompt.trim()) {
      setError('Please enter an idea to generate.')
      return
    }
    setLoading(true)
    try {
      const stored = JSON.parse(localStorage.getItem('apiKeys') || '{}')
      await onGenerate({ prompt, ...stored })
    } catch (e) {
      console.error(e)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Enter your idea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-900 font-medium transition disabled:opacity-60"
        >
          {loading ? 'Generating…' : 'Generate Across AIs'}
        </button>
      </div>
      {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
    </form>
  )
}
