import { useEffect, useState } from 'react';

// Local fallbacks so it always works, even if public APIs are blocked.
const LOCAL_GENERAL = [
  { text: 'What you do today can improve all your tomorrows.', author: 'Ralph Marston' },
  { text: 'The future depends on what you do today.', author: 'Mahatma Gandhi' },
  { text: 'Well begun is half done.', author: 'Aristotle' },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
  { text: 'Action is the foundational key to all success.', author: 'Pablo Picasso' },
];

const LOCAL_TECH = [
  { text: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { text: 'Premature optimization is the root of all evil.', author: 'Donald Knuth' },
  { text: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { text: 'Simplicity is prerequisite for reliability.', author: 'Edsger W. Dijkstra' },
  { text: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke' },
];

// Public APIs (no key). We’ll try these first, then fall back to local lists.
async function fetchGeneralToday() {
  // ZenQuotes: daily quote
  const r = await fetch('https://zenquotes.io/api/today', { cache: 'no-store' });
  const j = await r.json();
  const item = Array.isArray(j) ? j[0] : null;
  if (item?.q) return { text: item.q, author: item.a || 'Unknown' };
  throw new Error('general today failed');
}
async function fetchGeneralRandom() {
  // ZenQuotes: random quote
  const r = await fetch('https://zenquotes.io/api/random', { cache: 'no-store' });
  const j = await r.json();
  const item = Array.isArray(j) ? j[0] : null;
  if (item?.q) return { text: item.q, author: item.a || 'Unknown' };
  throw new Error('general random failed');
}
async function fetchTechRandom() {
  // Quotable filtered to technology tag
  const r = await fetch('https://api.quotable.io/random?tags=technology', { cache: 'no-store' });
  const j = await r.json();
  if (j?.content) return { text: j.content, author: j.author || 'Unknown' };
  throw new Error('tech random failed');
}

// Pick an item from local fallback lists
function pickLocal(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ComplimentGen() {
  const [mode, setMode] = useState('general'); // 'general' | 'tech'
  const [quote, setQuote] = useState({ text: 'Loading today’s quote…', author: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  // Load “today’s” general quote on mount
  useEffect(() => {
    let ignore = false;
    async function loadToday() {
      setLoading(true); setErr('');
      try {
        const q = await fetchGeneralToday();
        if (!ignore) setQuote(q);
      } catch {
        // fall back to a random general if today’s endpoint fails
        try {
          const q2 = await fetchGeneralRandom();
          if (!ignore) setQuote(q2);
        } catch {
          if (!ignore) setQuote(pickLocal(LOCAL_GENERAL));
          setErr('Using offline quote (general).');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadToday();
    return () => { ignore = true; };
  }, []);

  async function refresh() {
    setLoading(true); setErr('');
    try {
      if (mode === 'general') {
        const q = await fetchGeneralRandom();
        setQuote(q);
      } else {
        const q = await fetchTechRandom();
        setQuote(q);
      }
    } catch {
      // Fallbacks per-mode
      if (mode === 'general') {
        setQuote(pickLocal(LOCAL_GENERAL));
        setErr('Using offline quote (general).');
      } else {
        setQuote(pickLocal(LOCAL_TECH));
        setErr('Using offline quote (tech).');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p className="text-white/80 mb-3">
        <span className="hidden sm:inline">Today’s quote.</span> Switch to <b>Tech</b> for engineering quotes. Use <b>Refresh</b> for a new one.
      </p>

      {/* Mode switch */}
      <div className="mb-3 flex items-center gap-2">
        <label className="text-sm text-white/80">Category:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 focus:outline-none"
        >
          <option value="general">General</option>
          <option value="tech">Technical</option>
        </select>
        <button onClick={refresh} disabled={loading} className="btn-future ml-auto">
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </div>

      {/* Quote box */}
      <div className="neo p-4">
        <div className="text-lg leading-relaxed">“{quote.text}”</div>
        {quote.author && <div className="text-white/70 text-sm mt-2">— {quote.author}</div>}
      </div>

      {err && <div className="text-amber-300 mt-2 text-sm">{err}</div>}
    </div>
  );
}
