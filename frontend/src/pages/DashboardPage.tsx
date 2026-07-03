import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Fuel, LogIn } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1100px', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '2rem 0' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          Vehicle Management System (JHVMS)
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          Government of Jharkhand official portal to lookup administrative vehicle acquisitions, allocation directories, logbooks, and fuel station transactions.
        </p>
      </section>

      {/* Main Cards Selection */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Admin Login Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--primary-glow)',
            color: 'var(--primary)'
          }}>
            <LogIn size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Admin Login</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flex: 1 }}>
            Access the secure JHVMS administration portal. Event creation, vehicle registration, and user privilege controls.
          </p>
          <a 
            href="https://jhvms.jharkhand.gov.in/login" 
            className="btn btn-primary" 
            style={{ marginTop: '1rem' }}
          >
            Go to Admin Login
          </a>
        </div>
        
        {/* Vehicle Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--primary-glow)',
            color: 'var(--primary)'
          }}>
            <Car size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Vehicle Lookup</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flex: 1 }}>
            Search vehicle acquisition entries, driver logs, detailed possession timelines, trip route logs, and issued fuel coupon slips.
          </p>
          <Link to="/vehicles" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Open Vehicle Search
          </Link>
        </div>

        {/* Fuel Station Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--primary-glow)',
            color: 'var(--primary)'
          }}>
            <Fuel size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Fuel Station Lookup</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flex: 1 }}>
            Query petrol pump information, bank details, dynamic coupon issuance metrics, fuel type aggregations, and finalized bill payment summary.
          </p>
          <Link to="/fuelstations" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Open Fuel Pump Search
          </Link>
        </div>

      </section>

    </div>
  );
};
