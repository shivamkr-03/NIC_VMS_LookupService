import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation';

export const MainLayout = () => {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '2rem 1rem',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        Jharkhand Vehicle Management System (JHVMS) &bull; National Informatics Centre (NIC) Ranchi
      </footer>
    </div>
  );
};
