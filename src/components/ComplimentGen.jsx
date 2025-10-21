import { useState } from 'react'

export default function ComplimentGen() {
  const [compliment, setCompliment] = useState('Tap the button for instant positivity ✨')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function getCompliment() {
    setLoading(true); setErr('')
    try {
      const r = await fetch('https://complimentr.com/api')
      const j = await r.json()
      setCompliment(j?.compliment || 'You are remarkable.')
    } catch (e) {
      setErr('Could not fetch a compliment. Try again!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="text-white/80 mb-3">Public API → delightful micro‑interaction. Great for UX demos.</p>
      <div className="glass p-4 mb-3">
        <div className="text-lg">{compliment}</div>
      </div>
      <button onClick={getCompliment} disabled={loading} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30">
        {loading ? 'Summoning ✨…' : 'Compliment Me Again'}
      </button>
      {err && <div className="text-rose-300 mt-2 text-sm">{err}</div>}
    </div>
  )
}