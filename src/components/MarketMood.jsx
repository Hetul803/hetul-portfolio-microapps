import { useEffect, useState } from 'react'

export default function MarketMood() {
  const [price, setPrice] = useState(null)
  const [prev, setPrev] = useState(null)
  const [error, setError] = useState('')

  async function fetchBTC() {
    try {
      const r = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      const j = await r.json()
      const p = j?.bpi?.USD?.rate_float || parseFloat((j?.bpi?.USD?.rate || '').replace(/,/g,''))
      setPrev(price)
      setPrice(p)
    } catch (e) {
      setError('Failed to fetch price. Try again later.')
    }
  }

  useEffect(() => {
    fetchBTC()
    const id = setInterval(fetchBTC, 60_000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const delta = price && prev ? ((price - prev) / prev) * 100 : 0
  const mood = delta > 0 ? 'Optimistic' : delta < 0 ? 'Fearful' : 'Neutral'
  const color = delta > 0 ? 'bg-emerald-500' : delta < 0 ? 'bg-rose-500' : 'bg-slate-400'

  return (
    <div>
      <p className="text-white/80 mb-3">One‑word market signal updated minutely using BTC as a proxy.</p>
      <div className={`rounded-xl p-4 ${color}`}>
        <div className="text-black font-bold text-lg">{mood}</div>
        <div className="text-black/80 text-sm">BTC/USD {price ? price.toFixed(2) : '…'} {prev ? `(${delta.toFixed(3)}%)` : ''}</div>
      </div>
      <div className="text-white/60 text-xs mt-3">Source: CoinDesk public API</div>
      {error && <div className="text-rose-300 mt-2 text-sm">{error}</div>}
    </div>
  )
}