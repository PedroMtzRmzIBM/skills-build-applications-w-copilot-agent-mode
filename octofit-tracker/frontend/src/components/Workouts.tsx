import { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../lib/api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/workouts`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        setWorkouts(normalizeApiResponse(payload));
      })
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {workouts.length === 0 ? (
            <p>No workouts available.</p>
          ) : (
            <ul>
              {workouts.map((workout, index) => (
                <li key={workout.id ?? workout._id ?? index}>
                  <strong>{workout.title ?? `Workout ${index + 1}`}</strong>
                  {workout.durationMinutes ? ` — ${workout.durationMinutes} min` : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default Workouts;
