import { useMemo, useState } from 'react';

const DEFAULT_TOPIC = 'Photosynthesis';

const buildPrompt = (topic) => `Create 6 study flashcards about ${topic}.\nReturn ONLY valid JSON with this shape:\n{\n  \"cards\": [\n    {\n      \"front\": \"concise term or question\",\n      \"back\": \"detailed definition or answer (2-4 sentences)\"\n    }\n  ]\n}\nKeep front text short and back text educational and clear.`;

const parseCardResponse = (text) => {
  const trimmed = text.trim();
  const jsonStart = trimmed.indexOf('{');
  const jsonEnd = trimmed.lastIndexOf('}');

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('Claude did not return JSON.');
  }

  const payload = JSON.parse(trimmed.slice(jsonStart, jsonEnd + 1));
  if (!Array.isArray(payload.cards) || payload.cards.length === 0) {
    throw new Error('No flashcards were generated.');
  }

  return payload.cards
    .filter((card) => card.front && card.back)
    .map((card) => ({
      front: card.front.trim(),
      back: card.back.trim(),
    }));
};

const FlashcardsView = () => {
  const [topic, setTopic] = useState(DEFAULT_TOPIC);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKeyMissing = useMemo(() => !process.env.REACT_APP_CLAUDE_API_KEY, []);

  const toggleFlip = (index) => {
    setFlipped((current) => ({ ...current, [index]: !current[index] }));
  };

  const generateCards = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!topic.trim()) {
        throw new Error('Please enter a topic first.');
      }

      if (apiKeyMissing) {
        throw new Error('Missing REACT_APP_CLAUDE_API_KEY. Add it to your environment to generate cards.');
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1200,
          messages: [{ role: 'user', content: buildPrompt(topic.trim()) }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Claude request failed (${response.status}).`);
      }

      const data = await response.json();
      const text = data?.content?.[0]?.text || '';
      const generatedCards = parseCardResponse(text);

      setCards(generatedCards);
      setFlipped({});
    } catch (requestError) {
      setError(requestError.message || 'Unable to generate flashcards.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 lg:p-10 space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">AI Flashcard Studio</h1>
        <p className="text-slate-600 mt-2">
          Enter any study topic to generate interactive term/definition or question/answer flashcards.
        </p>

        <form className="mt-5 flex flex-col md:flex-row gap-3" onSubmit={generateCards}>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="e.g. World War II, SQL joins, Cellular respiration"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Generating…' : 'Generate with Claude'}
          </button>
        </form>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      </section>

      <section>
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
