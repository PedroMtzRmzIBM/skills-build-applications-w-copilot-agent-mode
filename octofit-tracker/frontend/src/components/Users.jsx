import { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const apiUrl = `https://${import.meta.env.VITE_CODESPACE_NAME || 'localhost'}-8000.app.github.dev/api/users`;
    fetch(apiUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        const data = Array.isArray(payload) ? payload : payload?.data || payload?.results || [payload];
        setUsers(data);
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
