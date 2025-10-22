import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AppCard from './components/AppCard.jsx'
import EmotionColor from './components/EmotionColor.jsx'
import MarketMood from './components/MarketMood.jsx'
import ComplimentGen from './components/ComplimentGen.jsx'

function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal-panel" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button onClick={onClose} className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30">Close</button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [open, setOpen] = useState(null)

  const apps = [
    {
      key: 'emotion',
      title: 'Emotion → Color',
      emoji: '🎭',
      blurb: 'Type a feeling; watch the UI adapt.',
      component: <EmotionColor />,
      tech: 'React • Tailwind • mini‑NLP'
    },
    {
      key: 'market',
      title: 'Market Mood Clock',
      emoji: '📈',
      blurb: 'BTC pulse as a one‑word signal.',
      component: <MarketMood />,
      tech: 'CoinDesk API • React'
    },
    {

      key: 'compliment',               // keep key the same
      title: 'Quote of the Day',       // new title
      emoji: '🧠',
      blurb: 'Today’s quote + Tech mode',
      component: <ComplimentGen />,
      tech: 'ZenQuotes • Quotable'

    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full max-w-5xl px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Hetul’s AI Lab</h1>
            <p className="text-white/70">Micro‑apps for AI × Quant × Fun</p>
          </div>
          <nav className="flex gap-3">
            <a className="glass px-4 py-2" href="https://github.com/Hetul803" target="_blank" rel="noreferrer">GitHub</a>
            <a className="glass px-4 py-2" href="#resume">Résumé</a>
          </nav>
        </div>
      </header>

      <main className="w-full max-w-5xl px-6 pb-16">
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {apps.map(a => (
            <AppCard key={a.key} title={a.title} emoji={a.emoji} blurb={a.blurb} tech={a.tech} onOpen={() => setOpen(a.key)} />
          ))}
        </section>

        <section id="resume" className="mt-12">
          <div className="glass p-5">
            <h2 className="text-xl font-semibold mb-2">Résumé / Contact</h2>
            <ul className="space-y-1 text-white/85">
              <li>
                <a className="underline" href={`${import.meta.env.BASE_URL}Hetul_Patel_Resume_Quant.pdf`} target="_blank" rel="noreferrer">Download Résumé (Quant)</a>
                <span className="text-white/60 text-sm"> — PDF hosted in <code>public/</code></span>
              </li>
              <li>
                <a className="underline" href="https://github.com/Hetul803" target="_blank" rel="noreferrer">github.com/Hetul803</a>
              </li>
              <li>
                <a className="underline" href="https://www.linkedin.com/in/hetul-patel-quant" target="_blank" rel="noreferrer">linkedin.com/in/hetul-patel-quant</a>
              </li>
              <li>
                <a className="underline" href="mailto:Hetul.patel.career@outlook.com">Hetul.patel.career@outlook.com</a>
              </li>
            </ul>
            <p className="text-white/70 mt-3 text-sm">MSCS @ AUM · AI/ML & Quant Research · Building micro‑apps that turn data into decisions.</p>
          </div>
        </section>
      </main>

      {apps.map(a => (
        <Modal key={a.key} open={open === a.key} onClose={() => setOpen(null)} title={`${a.emoji}  ${a.title}`}>
          {a.component}
        </Modal>
      ))}

      <footer className="pb-10 text-white/60">© {new Date().getFullYear()} Hetulkumar Patel</footer>
    </div>
  )
}
