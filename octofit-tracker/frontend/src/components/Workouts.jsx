import { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/workouts`;
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload?.data || payload?.results || [payload];
        setWorkouts(data);
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
