import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(() => {
    const saved = localStorage.getItem('salon_customer');
    return saved ? JSON.parse(saved) : null;
  });

  const [owner, setOwner] = useState(() => {
    const saved = localStorage.getItem('salon_owner');
    return saved ? JSON.parse(saved) : null;
  });

  const loginCustomer = (data) => {
    setCustomer(data);
    localStorage.setItem('salon_customer', JSON.stringify(data));
  };

  const loginOwner = (data) => {
    setOwner(data);
    localStorage.setItem('salon_owner', JSON.stringify(data));
  };

  const logoutCustomer = () => {
    setCustomer(null);
    localStorage.removeItem('salon_customer');
  };

  const logoutOwner = () => {
    setOwner(null);
    localStorage.removeItem('salon_owner');
  };

  return (
    <AuthContext.Provider value={{ customer, owner, loginCustomer, loginOwner, logoutCustomer, logoutOwner }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
