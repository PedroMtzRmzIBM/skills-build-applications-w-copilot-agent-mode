import { useEffect, useState } from 'react';
import { apiBase, normalizeApiResponse } from '../lib/api';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/users`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const payload = await res.json();
        setUsers(normalizeApiResponse(payload));
      })
      .catch((err) => setError(err?.message ?? String(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div>
          {users.length === 0 ? (
            <p>No users available.</p>
          ) : (
            <ul>
              {users.map((user, index) => (
                <li key={user.id ?? user._id ?? index}>
                  {user.name ?? user.email ?? JSON.stringify(user)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default Users;
