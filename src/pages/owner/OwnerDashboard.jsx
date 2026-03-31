import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ownerSalon, mockBookings } from '../../data/mockData';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { owner, logoutOwner } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState(ownerSalon.services);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saveMsg, setSaveMsg] = useState('');

  if (!owner) { navigate('/owner/login'); return null; }

  const salonName = owner.salonName || ownerSalon.name;

  const handleLogout = () => { logoutOwner(); navigate('/'); };

  const startEdit = (service) => {
    setEditingId(service.id);
    setEditForm({ name: service.name, price: service.price, duration: service.duration });
  };

  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const saveEdit = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...editForm, price: parseInt(editForm.price) } : s));
    setEditingId(null);
    setSaveMsg('Changes saved!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const statusBadge = (status) => {
    const map = { confirmed: 'badge-success', pending: 'badge-warning', cancelled: 'badge-danger' };
    return <span className={`badge ${map[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
  };

  const confirmedCount = mockBookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = mockBookings.filter(b => b.status === 'pending').length;
  const totalRevenue = mockBookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-brand">✦ Luxe<span>Book</span></div>
        <nav className="sidebar-nav">
          {[
            { key: 'overview', icon: '◈', label: 'Overview' },
            { key: 'services', icon: '✂', label: 'Services & Pricing' },
            { key: 'bookings', icon: '📅', label: 'Bookings' },
          ].map(item => (
            <button
              key={item.key}
              className={`sidebar-link ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
            {owner.name}
          </div>
          <button className="btn btn-outline btn-sm btn-full" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }} onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>{salonName}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Park Street, Kolkata · ★ {ownerSalon.rating}</p>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            Owner Portal
          </div>
        </div>

        <div className="dashboard-content">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <h1 className="page-title">Dashboard</h1>
              <p className="page-subtitle">Your salon performance at a glance</p>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-label">Total Bookings</div>
                  <div className="stat-value">{mockBookings.length}</div>
                  <div className="stat-sub">This month</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Confirmed</div>
                  <div className="stat-value" style={{ color: 'var(--success)' }}>{confirmedCount}</div>
                  <div className="stat-sub">Appointments</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Pending</div>
                  <div className="stat-value" style={{ color: 'var(--warning)' }}>{pendingCount}</div>
                  <div className="stat-sub">Awaiting confirm</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Revenue</div>
                  <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
                  <div className="stat-sub">This month</div>
                </div>
              </div>

              {/* Recent bookings preview */}
              <div className="card">
                <h2 className="section-heading">Recent Bookings</h2>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.slice(0, 4).map(b => (
                        <tr key={b.id}>
                          <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>{b.id}</td>
                          <td style={{ fontWeight: 500 }}>{b.customer}</td>
                          <td>{b.service}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{b.date} · {b.time}</td>
                          <td style={{ fontWeight: 500 }}>₹{b.amount.toLocaleString('en-IN')}</td>
                          <td>{statusBadge(b.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: 12 }} onClick={() => setActiveTab('bookings')}>
                  View all bookings →
                </button>
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div>
              <h1 className="page-title">Services & Pricing</h1>
              <p className="page-subtitle">Edit your services and prices — changes apply to your live listing</p>

              {saveMsg && <div className="alert alert-success">✓ {saveMsg}</div>}

              <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 100px auto', gap: 10, padding: '8px 0 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 500 }}>Service Name</span>
                  <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 500 }}>Price (₹)</span>
                  <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', fontWeight: 500 }}>Duration</span>
                  <span></span>
                </div>

                {services.map(service => (
                  <div key={service.id} className="edit-row">
                    {editingId === service.id ? (
                      <>
                        <input
                          className="form-input"
                          value={editForm.name}
                          onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                        />
                        <input
                          className="form-input"
                          type="number"
                          value={editForm.price}
                          onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                        />
                        <input
                          className="form-input"
                          value={editForm.duration}
                          onChange={e => setEditForm({ ...editForm, duration: e.target.value })}
                        />
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-accent btn-sm" onClick={() => saveEdit(service.id)}>Save</button>
                          <button className="btn btn-ghost btn-sm" onClick={cancelEdit}>×</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: 15 }}>{service.name}</span>
                        <span style={{ fontWeight: 600, fontSize: 15 }}>₹{service.price.toLocaleString('en-IN')}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>{service.duration}</span>
                        <button className="btn btn-outline btn-sm" onClick={() => startEdit(service)}>Edit</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOOKINGS TAB */}
          {activeTab === 'bookings' && (
            <div>
              <h1 className="page-title">All Bookings</h1>
              <p className="page-subtitle">View and track all customer appointments</p>

              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'All', count: mockBookings.length },
                  { label: 'Confirmed', count: confirmedCount },
                  { label: 'Pending', count: pendingCount },
                  { label: 'Cancelled', count: mockBookings.filter(b => b.status === 'cancelled').length },
                ].map(f => (
                  <div key={f.label} style={{
                    padding: '8px 16px',
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 13,
                    color: 'var(--text-muted)',
                  }}>
                    {f.label} <strong style={{ color: 'var(--charcoal)' }}>{f.count}</strong>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map(b => (
                        <tr key={b.id}>
                          <td style={{ color: 'var(--text-muted)', fontSize: 13, fontFamily: 'monospace' }}>{b.id}</td>
                          <td style={{ fontWeight: 500 }}>{b.customer}</td>
                          <td>{b.service}</td>
                          <td>
                            <div style={{ fontSize: 14 }}>{b.date}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.time}</div>
                          </td>
                          <td style={{ fontWeight: 600 }}>₹{b.amount.toLocaleString('en-IN')}</td>
                          <td>{statusBadge(b.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
