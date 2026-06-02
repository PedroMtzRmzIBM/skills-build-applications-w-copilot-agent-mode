import { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../lib/api';

const Leaderboard = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/leaderboard`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        setItems(normalizeApiResponse(payload));
      })
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {items.length === 0 ? (
            <p>No leaderboard entries available.</p>
          ) : (
            <ol>
              {items.map((entry, index) => (
                <li key={entry.user?.id ?? entry.user?._id ?? index}>
                  {entry.user?.name ?? entry.user?.email ?? JSON.stringify(entry.user)}
                  {entry.totalMinutes ? ` — ${entry.totalMinutes} min` : ''}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
