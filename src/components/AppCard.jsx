import { motion } from 'framer-motion'

export default function AppCard({ title, emoji, blurb, tech, onOpen }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="glass text-left p-4 md:p-5 h-32 md:h-36 relative overflow-hidden"
    >
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-white/80">{blurb}</div>
      <div className="absolute bottom-2 right-3 text-[11px] text-white/60">{tech}</div>
    </motion.button>
  )
}