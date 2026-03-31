import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerRegister() {
  const navigate = useNavigate();
  const { loginCustomer } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // Simulate registration → auto login
    const customers = JSON.parse(localStorage.getItem('registered_customers') || '[]');
    if (customers.find(c => c.email === form.email)) {
      setError('An account with this email already exists.');
      return;
    }
    customers.push(form);
    localStorage.setItem('registered_customers', JSON.stringify(customers));
    loginCustomer({ name: form.name, email: form.email });
    navigate('/customer/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">✦</div>
          <h1>Create Account</h1>
          <p>Join LuxeBook to book your next salon visit</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" name="name" placeholder="Priya Sharma" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} />
          </div>
          <button className="btn btn-accent btn-full" type="submit" style={{ marginTop: 8 }}>
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <a onClick={() => navigate('/customer/login')} style={{ cursor: 'pointer' }}>Sign in</a>
        </div>
        <div className="auth-footer" style={{ marginTop: 8 }}>
          <a onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'var(--text-subtle)' }}>← Back to home</a>
        </div>
      </div>
    </div>
  );
}
