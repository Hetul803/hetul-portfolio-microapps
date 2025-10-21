import { useEffect, useMemo, useState } from 'react'

// Tiny lexicon for emotion cues (client‑side ML‑ish heuristic)
const EMO_MAP = [
  { label: 'Joy', color: '#22c55e', words: ['happy','great','awesome','excited','love','grateful','joy'] },
  { label: 'Calm', color: '#06b6d4', words: ['calm','peace','ok','fine','relaxed','chill'] },
  { label: 'Proud', color: '#a78bfa', words: ['proud','accomplished','achieved','win','won'] },
  { label: 'Anxious', color: '#f59e0b', words: ['nervous','anxious','worried','stress','scared','uncertain'] },
  { label: 'Sad', color: '#60a5fa', words: ['sad','down','upset','tired','lonely','blue'] },
  { label: 'Angry', color: '#ef4444', words: ['angry','mad','furious','annoyed','irritated'] },
]

function inferEmotion(text) {
  const t = text.toLowerCase()
  let best = { label: 'Neutral', color: '#94a3b8', score: 0 }
  for (const emo of EMO_MAP) {
    let score = 0
    for (const w of emo.words) if (t.includes(w)) score += 1
    if (score > best.score) best = { label: emo.label, color: emo.color, score }
  }
  return best
}

export default function EmotionColor() {
  const [text, setText] = useState('I just got an interview at Microsoft!')
  const emo = useMemo(() => inferEmotion(text), [text])

  useEffect(() => {
    // animate page chrome color subtly
    const el = document.querySelector('.modal-panel')
    if (el) el.style.boxShadow = `0 0 40px ${emo.color}55`
  }, [emo.color])

  return (
    <div>
      <p className="text-white/80 mb-3">Type what you feel. The UI adapts instantly.</p>
      <textarea
        className="w-full h-28 p-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <div className="mt-4 p-4 rounded-xl" style={{ background: emo.color }}>
        <div className="text-black font-semibold">Emotion: {emo.label}</div>
        <div className="text-black/80 text-sm">Palette driven by your text</div>
      </div>

      <div className="text-white/60 text-xs mt-3">
        * No external API needed; lightweight heuristic for instant UX. Swap in a Hugging Face model later if you add a token.
      </div>
    </div>
  )
}