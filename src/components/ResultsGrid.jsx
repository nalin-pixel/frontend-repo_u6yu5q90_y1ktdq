import { useState } from 'react'

function Card({ title, text }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">{title}</h3>
        <button onClick={copy} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white transition">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="text-white/90 text-sm whitespace-pre-wrap leading-relaxed">
        {text || 'No response'}
      </pre>
    </div>
  )
}

export default function ResultsGrid({ results }) {
  if (!results) return null
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="OpenAI" text={results.openai} />
      <Card title="Claude" text={results.claude} />
      <Card title="Llama (Groq)" text={results.llama} />
    </div>
  )
}
