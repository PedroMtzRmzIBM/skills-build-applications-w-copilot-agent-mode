import { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/teams`;
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload?.data || payload?.results || [payload];
        setTeams(data);
      })
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {teams.length === 0 ? (
            <p>No teams available.</p>
          ) : (
            <ul>
              {teams.map((team, index) => (
                <li key={team.id ?? team._id ?? index}>
                  <strong>{team.name ?? `Team ${index + 1}`}</strong>
                  {Array.isArray(team.members) && team.members.length > 0 ? (
                    <small> — members: {team.members.map((member) => member.name ?? member.email ?? member).join(', ')}</small>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default Teams;
