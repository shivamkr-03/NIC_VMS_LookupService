import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
        Jharkhand Vehicle Management System (JHVMS)
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
        Welcome to the official administrative portal of the Government of Jharkhand. This system manages administrative vehicle acquisitions, allocation directories, logbooks, and fuel station transactions.
      </p>
      
      {/* Prominent Enter Button */}
      <Link 
        to="/dashboard" 
        className="btn btn-primary" 
        style={{ 
          fontSize: '1.2rem', 
          padding: '1rem 2.5rem', 
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        Enter Dashboard
        <ArrowRight size={20} />
      </Link>
    </div>
  );
};
