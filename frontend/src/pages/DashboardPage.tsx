import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Fuel, LogIn, ShieldAlert } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* 1. Page Title & Welcoming Header */}
      <section style={{ 
        textAlign: 'center', 
        padding: '2.5rem 1.5rem',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderLeft: '5px solid #0f294a',
        borderRadius: 'var(--radius-sm)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: 800,
          color: 'var(--primary)',
          margin: '0 0 0.75rem 0',
          letterSpacing: '-0.02em'
        }}>
          Jharkhand Vehicle Management Directory
        </h1>
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '1.05rem', 
          maxWidth: '750px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Authorized directory to lookup administrative transport allocations, capture/possession timeline details, trip logbooks, and petrol pump clearance vouchers.
        </p>
      </section>

      {/* 2. Main Navigation Cards Grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        
        {/* Admin Login Card */}
        <div className="glass-card" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem', 
          height: '100%',
          borderTopColor: '#ea580c' 
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(234, 88, 12, 0.08)',
            color: '#ea580c'
          }}>
            <LogIn size={26} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Admin System Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', flex: 1, margin: 0 }}>
            Log in to the secure JHVMS administrative center. Manage vehicle acquisitions, register new drivers/helpers, generate events, and authorize coupon codes.
          </p>
          <a 
            href="https://jhvms.jharkhand.gov.in/login" 
            target="_blank"
            rel="noreferrer"
            className="btn btn-accent" 
            style={{ marginTop: '0.75rem', width: '100%' }}
          >
            Go to Admin Login
          </a>
        </div>
        
        {/* Vehicle Lookup Card */}
        <div className="glass-card" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem', 
          height: '100%',
          borderTopColor: 'var(--primary)' 
        }}>
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
            <Car size={26} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Vehicle Information Search</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', flex: 1, margin: 0 }}>
            Audit acquisition logs, driver/helper rosters, detailed timeframes, active duty segments, trip distances, and issued fuel coupon slips.
          </p>
          <Link to="/vehicles" className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%' }}>
            Open Vehicle Registry
          </Link>
        </div>

        {/* Fuel Station Card */}
        <div className="glass-card" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1.25rem', 
          height: '100%',
          borderTopColor: '#16a34a' 
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(22, 163, 74, 0.08)',
            color: '#16a34a'
          }}>
            <Fuel size={26} />
          </div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>Fuel Pump Search</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6', flex: 1, margin: 0 }}>
            Query station profile registries, bank account details, daily fuel rate indexes, total coupon clearances, and finalized payment summary.
          </p>
          <Link to="/fuelstations" className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%' }}>
            Open Fuel Station Registry
          </Link>
        </div>

      </section>

      {/* 3. Security Warning Disclaimer */}
      <section style={{
        backgroundColor: '#fffbeb',
        border: '1px solid #fef3c7',
        borderRadius: 'var(--radius-sm)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start'
      }}>
        <ShieldAlert size={20} style={{ color: '#d97706', flexShrink: 0, marginTop: '0.1rem' }} />
        <div>
          <h4 style={{ margin: '0 0 0.25rem 0', color: '#92400e', fontSize: '0.85rem', fontWeight: 700 }}>Security Notice</h4>
          <p style={{ margin: 0, color: '#b45309', fontSize: '0.8rem', lineHeight: '1.5' }}>
            This portal is restricted to authorized state administrative departments. All search queries, IP addresses, and session activities are monitored under the security framework of NIC Jharkhand.
          </p>
        </div>
      </section>

    </div>
  );
};
