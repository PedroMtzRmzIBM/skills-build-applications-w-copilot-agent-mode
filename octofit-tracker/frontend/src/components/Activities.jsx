import { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/activities`;
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload?.data || payload?.results || [payload];
        setActivities(data);
      })
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {activities.length === 0 ? (
            <p>No activities available.</p>
          ) : (
            <ul>
              {activities.map((activity, index) => (
                <li key={activity.id ?? activity._id ?? index}>
                  {activity.type ?? 'Activity'} — {activity.durationMinutes ?? activity.duration ?? 'unknown'} minutes
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default Activities;
