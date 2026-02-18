import { useState } from 'react';

const DEFAULT_TOPIC = 'Photosynthesis';

const buildFallbackCards = (topic) => {
  const cleanTopic = topic.trim();
  return [
    {
      front: `What is ${cleanTopic}?`,
      back: `${cleanTopic} is a focused study topic. In this fallback mode, cards are generated locally so you can still practice while backend AI is unavailable. Use these prompts as a scaffold and replace them with course-specific details.`,
    },
    {
      front: `${cleanTopic}: core concept`,
      back: `Define the most important idea in ${cleanTopic} in 2-3 sentences. Include what it is, why it matters, and one example to make recall easier.`,
    },
    {
      front: `${cleanTopic}: key vocabulary`,
      back: `List 3-5 terms related to ${cleanTopic}. For each term, connect it to the main concept so definitions are meaningful rather than memorized in isolation.`,
    },
    {
      front: `${cleanTopic}: process question`,
      back: `Describe the sequence or workflow in ${cleanTopic}. Use ordered steps and indicate where common mistakes happen.`,
    },
    {
      front: `${cleanTopic}: compare/contrast`,
      back: `Compare two related ideas within ${cleanTopic}. Explain one similarity and one difference, then state when each idea is preferable.`,
    },
    {
      front: `${cleanTopic}: exam-style question`,
      back: `Answer a likely exam question about ${cleanTopic} using a concise claim, supporting evidence, and a clear conclusion.`,
    },
  ];
};

const parseCardResponse = (payload) => {
  if (!payload || !Array.isArray(payload.cards)) {
    throw new Error('Flashcard service did not return cards.');
  }

  const cleaned = payload.cards
    .filter((card) => card?.front && card?.back)
    .map((card) => ({
      front: String(card.front).trim(),
      back: String(card.back).trim(),
    }));

  if (cleaned.length === 0) {
    throw new Error('No usable flashcards were generated.');
  }

  return cleaned;
};

const FlashcardsView = () => {
  const [topic, setTopic] = useState(DEFAULT_TOPIC);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const toggleFlip = (index) => {
    setFlipped((current) => ({ ...current, [index]: !current[index] }));
  };

  const resetAllCards = () => {
    setFlipped({});
  };

  const flipAllCards = () => {
    setFlipped(Object.fromEntries(cards.map((_, index) => [index, true])));
  };

  const generateCards = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setLoading(true);

    const trimmedTopic = topic.trim();

    try {
      if (!trimmedTopic) {
        throw new Error('Please enter a topic first.');
      }

      const response = await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmedTopic }),
      });

      if (!response.ok) {
        throw new Error(`Flashcard generation failed (${response.status}).`);
      }

      const data = await response.json();
      const generatedCards = parseCardResponse(data);
      setCards(generatedCards);
      setFlipped({});
    } catch (requestError) {
      setCards(buildFallbackCards(trimmedTopic));
      setFlipped({});
      setNotice('Showing fallback flashcards because the AI backend is unavailable. Configure /api/flashcards to enable Claude-generated content.');
      setError(requestError.message || 'Unable to generate flashcards from backend AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 lg:p-10 space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">AI Flashcard Studio</h1>
        <p className="text-slate-600 mt-2">
          Enter a topic to generate interactive term/definition or question/answer flashcards.
        </p>

        <form className="mt-5 flex flex-col md:flex-row gap-3" onSubmit={generateCards}>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="e.g. World War II, SQL joins, Cellular respiration"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Flashcard topic"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Generating…' : 'Generate Flashcards'}
          </button>
        </form>

        <div className="mt-3 space-y-1">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {notice && <p className="text-amber-700 text-sm">{notice}</p>}
        </div>
      </section>

      <section className="space-y-4">
        {cards.length > 0 && (
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
              onClick={flipAllCards}
            >
              Flip all
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
              onClick={resetAllCards}
            >
              Reset all
            </button>
          </div>
        )}

        {cards.length === 0 ? (
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-8 text-center text-slate-600">
            Generate flashcards to start studying. Click any card to flip horizontally and reveal the answer.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card, index) => (
              <button
                type="button"
                key={`${card.front}-${index}`}
                className={`flashcard ${flipped[index] ? 'is-flipped' : ''}`}
                onClick={() => toggleFlip(index)}
                aria-pressed={Boolean(flipped[index])}
              >
                <span className="flashcard-inner">
                  <span className="flashcard-face flashcard-front">
                    <span className="text-xs uppercase tracking-wide text-blue-600 font-semibold">Front</span>
                    <span className="text-lg font-semibold text-slate-900 mt-3">{card.front}</span>
                  </span>
                  <span className="flashcard-face flashcard-back">
                    <span className="text-xs uppercase tracking-wide text-sky-100 font-semibold">Back</span>
                    <span className="text-sm leading-6 mt-3">{card.back}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default FlashcardsView;
