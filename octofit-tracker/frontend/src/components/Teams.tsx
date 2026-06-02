import { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../lib/api';

const Teams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/teams`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        setTeams(normalizeApiResponse(payload));
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
                    <small> — members: {team.members.map((member: any) => member.name ?? member.email ?? member).join(', ')}</small>
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
