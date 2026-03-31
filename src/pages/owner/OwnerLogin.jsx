import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OwnerLogin() {
  const navigate = useNavigate();
  const { loginOwner } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    const owners = JSON.parse(localStorage.getItem('registered_owners') || '[]');
    const found = owners.find(o => o.email === form.email && o.password === form.password);

    if (found) {
      loginOwner({ name: found.name, email: found.email, salonName: found.salonName });
      navigate('/owner/dashboard');
    } else if (form.email === 'demo@owner.com' && form.password === 'demo123') {
      loginOwner({ name: 'Anjali Kapoor', email: 'demo@owner.com', salonName: 'Velvet & Bloom' });
      navigate('/owner/dashboard');
    } else {
      setError('Invalid email or password. Try demo@owner.com / demo123');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🏪</div>
          <h1>Owner Sign In</h1>
          <p>Manage your salon, services, and bookings</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div style={{
          background: 'var(--cream)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '10px 14px',
          fontSize: 13,
          color: 'var(--text-muted)',
          marginBottom: 18,
        }}>
          💡 Demo: <strong>demo@owner.com</strong> / <strong>demo123</strong>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" name="email" type="email" placeholder="salon@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Your password" value={form.password} onChange={handleChange} />
          </div>
          <button className="btn btn-primary btn-full" type="submit" style={{ marginTop: 8 }}>
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          New salon? <a onClick={() => navigate('/owner/register')} style={{ cursor: 'pointer' }}>Register here</a>
        </div>
        <div className="auth-footer" style={{ marginTop: 8 }}>
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--text-subtle)' }}>← Back to home</a>
        </div>
      </div>
    </div>
  );
}
