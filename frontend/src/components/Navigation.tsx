import { NavLink } from 'react-router-dom';
import { Car, Fuel, LogOut } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/dashboard" className="navbar-logo">
          <span className="gradient-text">JHVMS</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>Lookup System</span>
        </NavLink>
        <div className="navbar-menu">
          <NavLink to="/dashboard" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`} end>
            Dashboard
          </NavLink>
          <NavLink to="/vehicles" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Car size={16} /> Vehicle Lookup
            </span>
          </NavLink>
          <NavLink to="/fuelstations" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Fuel size={16} /> Fuel Station Lookup
            </span>
          </NavLink>
          <NavLink to="/" className="navbar-link">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <LogOut size={16} /> Exit Dashboard
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
