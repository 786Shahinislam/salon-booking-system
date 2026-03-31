import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ userType = null }) {
  const navigate = useNavigate();
  const { customer, owner, logoutCustomer, logoutOwner } = useAuth();

  const handleLogout = () => {
    if (userType === 'customer') { logoutCustomer(); navigate('/'); }
    if (userType === 'owner') { logoutOwner(); navigate('/'); }
  };

  const user = userType === 'customer' ? customer : userType === 'owner' ? owner : null;

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          ✦ Luxe<span>Book</span>
        </div>
        <div className="navbar-actions">
          {user ? (
            <>
              <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>
                Hi, {user.name.split(' ')[0]} ✦
              </span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/customer/login')}>Customer Login</button>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/owner/login')}>Owner Login</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
