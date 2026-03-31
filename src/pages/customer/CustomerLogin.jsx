import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerLogin() {
  const navigate = useNavigate();
  const { loginCustomer } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please enter your email and password.');
      return;
    }
    // Check registered customers or allow demo login
    const customers = JSON.parse(localStorage.getItem('registered_customers') || '[]');
    const found = customers.find(c => c.email === form.email && c.password === form.password);

    // Also allow a demo account
    if (found) {
      loginCustomer({ name: found.name, email: found.email });
      navigate('/customer/dashboard');
    } else if (form.email === 'demo@customer.com' && form.password === 'demo123') {
      loginCustomer({ name: 'Demo Customer', email: 'demo@customer.com' });
      navigate('/customer/dashboard');
    } else {
      setError('Invalid email or password. Try demo@customer.com / demo123');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">✦</div>
          <h1>Welcome back</h1>
          <p>Sign in to your customer account</p>
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
          💡 Demo: <strong>demo@customer.com</strong> / <strong>demo123</strong>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Your password" value={form.password} onChange={handleChange} />
          </div>
          <button className="btn btn-accent btn-full" type="submit" style={{ marginTop: 8 }}>
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          New here? <a onClick={() => navigate('/customer/register')} style={{ cursor: 'pointer' }}>Create account</a>
        </div>
        <div className="auth-footer" style={{ marginTop: 8 }}>
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--text-subtle)' }}>← Back to home</a>
        </div>
      </div>
    </div>
  );
}
