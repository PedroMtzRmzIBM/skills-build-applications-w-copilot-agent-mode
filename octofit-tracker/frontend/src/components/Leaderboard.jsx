import { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/leaderboard`;
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload?.data || payload?.results || [payload];
        setItems(data);
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
