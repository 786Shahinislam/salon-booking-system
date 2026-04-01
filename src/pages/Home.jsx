import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '80px 24px',
        background: 'linear-gradient(160deg, #FAF8F4 60%, #F2EAD8)',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--accent-light)',
          color: 'var(--accent-dark)',
          padding: '6px 16px',
          borderRadius: 20,
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 28,
        }}>
          ✦ Salon Booking, Simplified
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 6vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--charcoal)',
          marginBottom: 20,
          maxWidth: 680,
        }}>
          Beauty on your<br />
          <span style={{ color: 'var(--accent)' }}>schedule.</span>
        </h1>

        <p style={{
          fontSize: 18,
          color: 'var(--text-muted)',
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Discover top-rated salons, browse services, and book your next appointment — all in one place.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn btn-accent btn-lg"
            onClick={() => navigate('/customer/login')}
          >
            Book an Appointment
          </button>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => navigate('/owner/login')}
          >
            Manage My Salon
          </button>
        </div>

        {/* Feature pills */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginTop: 56,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {['6 Salons in Kolkata', '30+ Services', 'Instant Booking', '4.7★ Avg Rating'].map(f => (
            <div key={f} style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 24,
              padding: '8px 18px',
              fontSize: 13,
              color: 'var(--text-muted)',
            }}>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'white', padding: '64px 24px', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 8 }}>How it works</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: 15 }}>Three easy steps to your perfect look</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { icon: '🔍', title: 'Browse Salons', desc: 'Explore curated salons near you with ratings, services, and pricing.' },
              { icon: '📅', title: 'Pick a Service', desc: 'Choose from a variety of treatments and book the one that suits you.' },
              { icon: '✨', title: 'Arrive & Glow', desc: 'Show up at your appointment and leave feeling your absolute best.' },
            ].map(s => (
              <div key={s.title}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{
        background: 'var(--charcoal)',
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        padding: '20px',
        fontSize: 13,
      }}>
        ✦ LuxeBook — Salon Booking App 
      </footer>
    </div>
  );
}
