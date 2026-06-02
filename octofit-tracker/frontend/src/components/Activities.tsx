import { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../lib/api';

const Activities = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/activities`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        setActivities(normalizeApiResponse(payload));
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
