import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main id="main-content" className="main-content" style={{ flex: 1, padding: '2.5rem 1.5rem', maxWidth: '1400px', width: '100%', margin: '0 auto' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
