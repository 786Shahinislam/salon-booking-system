import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { salons } from '../../data/mockData';
import Navbar from '../../components/Navbar';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { customer } = useAuth();
  const [search, setSearch] = useState('');

  if (!customer) { navigate('/customer/login'); return null; }

  const filtered = salons.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.location.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar userType="customer" />
      <div className="container" style={{ padding: '36px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 className="page-title">Find Your Salon ✦</h1>
          <p className="page-subtitle">Browse {salons.length} top-rated salons in Kolkata</p>

          {/* Search */}
          <input
            className="form-input"
            style={{ maxWidth: 420 }}
            placeholder="Search by name, location, or type..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginBottom: 28,
          padding: '16px 20px',
          background: 'white',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Salons available', val: filtered.length },
            { label: 'Services offered', val: '30+' },
            { label: 'Avg. rating', val: '4.7 ★' },
            { label: 'Starting from', val: '₹249' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-display)' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p>No salons found for "{search}"</p>
          </div>
        ) : (
          <div className="salons-grid">
            {filtered.map(salon => (
              <div
                key={salon.id}
                className="salon-card"
                onClick={() => navigate(`/customer/salon/${salon.id}`)}
              >
                <div className="salon-card-img">{salon.image}</div>
                <div className="salon-card-body">
                  <div className="salon-card-category">{salon.category}</div>
                  <div className="salon-card-name">{salon.name}</div>
                  <div className="salon-card-location">📍 {salon.location}</div>
                  <div className="salon-card-footer">
                    <div className="rating">
                      <span className="star">★</span>
                      {salon.rating}
                      <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>({salon.reviewCount})</span>
                    </div>
                    <div className="price-tag">From <strong>₹{salon.startingPrice}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
