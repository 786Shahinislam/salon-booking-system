import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { salons } from '../../data/mockData';
import Navbar from '../../components/Navbar';

export default function SalonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { customer } = useAuth();
  const salon = salons.find(s => s.id === parseInt(id));

  if (!customer) { navigate('/customer/login'); return null; }
  if (!salon) return (
    <div className="auth-page">
      <div style={{ textAlign: 'center' }}>
        <h2>Salon not found</h2>
        <button className="btn btn-accent" onClick={() => navigate('/customer/dashboard')} style={{ marginTop: 16 }}>← Back</button>
      </div>
    </div>
  );

  const handleBook = (service) => {
    alert(`✦ Booking requested!\n\nSalon: ${salon.name}\nService: ${service.name}\nPrice: ₹${service.price}\n\nIn a full app, this would open a date/time picker. Thank you!`);
  };

  return (
    <div>
      <Navbar userType="customer" />
      <div className="container" style={{ padding: '36px 24px' }}>
        <button className="back-link" onClick={() => navigate('/customer/dashboard')}>
          ← Back to salons
        </button>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f5ede0, #eddfc8)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px',
          marginBottom: 28,
          display: 'flex',
          gap: 28,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <div style={{ fontSize: 72 }}>{salon.image}</div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 12, color: 'var(--accent-dark)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
              {salon.category}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--charcoal)', marginBottom: 6 }}>
              {salon.name}
            </h1>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>📍 {salon.location}</span>
              <span className="rating">
                <span className="star">★</span>
                {salon.rating}
                <span style={{ color: 'var(--text-subtle)', fontWeight: 400, fontSize: 13 }}>({salon.reviewCount} reviews)</span>
              </span>
            </div>
            <p style={{ fontSize: 14, color: 'var(--charcoal-light)', lineHeight: 1.7 }}>{salon.description}</p>
          </div>
        </div>

        {/* Services */}
        <div className="card">
          <h2 className="section-heading">Services & Pricing</h2>
          <div className="services-list">
            {salon.services.map(service => (
              <div key={service.name} className="service-item">
                <div>
                  <div className="service-name">{service.name}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="service-price">₹{service.price}</div>
                  <button
                    className="btn btn-accent btn-sm"
                    onClick={() => handleBook(service)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 24,
            padding: '16px',
            background: 'var(--cream)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 13,
            color: 'var(--text-muted)',
            display: 'flex',
            gap: 8,
            alignItems: 'flex-start',
          }}>
            <span>ℹ️</span>
            <span>Prices listed are starting rates and may vary based on hair length or additional services. Call the salon for a custom quote.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
