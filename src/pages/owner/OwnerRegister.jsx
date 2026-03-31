import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function OwnerRegister() {
  const navigate = useNavigate();
  const { loginOwner } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', salonName: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.salonName) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const owners = JSON.parse(localStorage.getItem('registered_owners') || '[]');
    if (owners.find(o => o.email === form.email)) {
      setError('An account with this email already exists.');
      return;
    }
    owners.push(form);
    localStorage.setItem('registered_owners', JSON.stringify(owners));
    loginOwner({ name: form.name, email: form.email, salonName: form.salonName });
    navigate('/owner/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🏪</div>
          <h1>Register Your Salon</h1>
          <p>List your salon on LuxeBook and reach more clients</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Full Name</label>
            <input className="form-input" name="name" placeholder="Ravi Mehta" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Salon Name</label>
            <input className="form-input" name="salonName" placeholder="e.g. Velvet & Bloom" value={form.salonName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" name="email" type="email" placeholder="salon@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
          </div>
          <button className="btn btn-primary btn-full" type="submit" style={{ marginTop: 8 }}>
            Register Salon
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a onClick={() => navigate('/owner/login')} style={{ cursor: 'pointer' }}>Sign in</a>
        </div>
        <div className="auth-footer" style={{ marginTop: 8 }}>
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--text-subtle)' }}>← Back to home</a>
        </div>
      </div>
    </div>
  );
}
