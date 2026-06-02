import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { apiBase, codespaceName } from './lib/api';

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  marginRight: '1rem',
  textDecoration: isActive ? 'underline' : 'none',
});

const App = () => {
  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <header>
        <h1>OctoFit Tracker</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <NavLink to="/users" style={linkStyle}>Users</NavLink>
          <NavLink to="/teams" style={linkStyle}>Teams</NavLink>
          <NavLink to="/activities" style={linkStyle}>Activities</NavLink>
          <NavLink to="/leaderboard" style={linkStyle}>Leaderboard</NavLink>
          <NavLink to="/workouts" style={linkStyle}>Workouts</NavLink>
        </nav>
      </header>

      <div style={{ marginBottom: '1rem' }}>
        <p>
          API base: <strong>{apiBase}</strong>
        </p>
        {!codespaceName && (
          <p style={{ color: '#b33' }}>
            VITE_CODESPACE_NAME is not defined. Using localhost fallback for API requests.
            Define it in <code>.env.local</code> to use Codespaces preview URLs.
          </p>
        )}
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
