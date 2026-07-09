import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Fuel, LayoutDashboard, LogOut, Menu, X, Globe, LogIn, Accessibility, ChevronDown, Share2 } from 'lucide-react';
import emblemIndia from '../assets/emblem_india.svg';
import nicLogo from '../assets/nic_logo.svg';
import { AccessibilityWidget } from './AccessibilityWidget';

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccessOpen, setIsAccessOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  const isDashboardArea = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/vehicles') || 
    location.pathname.startsWith('/fuelstations');

  // Handle click outside to close the socials dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const socialsContainer = document.getElementById('socials-dropdown-container');
      if (
        isSocialsOpen &&
        socialsContainer &&
        !socialsContainer.contains(event.target as Node)
      ) {
        setIsSocialsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSocialsOpen]);

  return (
    <header className="gov-header" style={{ width: '100%', background: '#ffffff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      {/* 1. Saffron Top Bar */}
      <div className="gov-topbar" style={{
        backgroundColor: '#ea580c',
        color: '#ffffff',
        padding: '0.4rem 1.5rem',
        fontSize: '0.75rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 500,
        letterSpacing: '0.03em',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>झारखण्ड सरकार | GOVERNMENT OF JHARKHAND</span>
          <span style={{ opacity: 0.7, display: 'inline-block' }}>|</span>
          <a href="#main-content" style={{ color: '#ffffff', textDecoration: 'none' }} className="topbar-link">Skip to main content</a>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Social Links Dropdown */}
          <div 
            id="socials-dropdown-container"
            style={{ position: 'relative', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '1rem', display: 'flex', alignItems: 'center' }} 
            className="accessibility-widget-exclude"
          >
            <button
              id="socials-trigger-btn"
              onClick={() => setIsSocialsOpen(!isSocialsOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0'
              }}
              title="Social Media Channels"
            >
              <Share2 size={13} className="accessibility-widget-svg" />
              <span>SOCIAL MEDIA</span>
              <ChevronDown size={11} className="accessibility-widget-svg" style={{ transform: isSocialsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            
            {isSocialsOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  width: '180px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  padding: '0.5rem',
                  zIndex: 9999,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  animation: 'accessPanelFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <style>{`
                  .social-link-item {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    padding: 0.5rem 0.75rem;
                    color: #1e293b !important;
                    text-decoration: none !important;
                    font-size: 0.8rem;
                    font-weight: 600;
                    border-radius: 4px;
                    transition: background-color 0.2s ease;
                  }
                  .social-link-item:hover {
                    background-color: #f1f5f9;
                    color: #ea580c !important;
                  }
                `}</style>
                <a href="https://www.facebook.com/NICIndia" target="_blank" rel="noreferrer" className="social-link-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span>Facebook</span>
                </a>
                <a href="https://x.com/NICMeity" target="_blank" rel="noreferrer" className="social-link-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  <span>Twitter (X)</span>
                </a>
                <a href="https://www.linkedin.com/company/national-informatics-centre" target="_blank" rel="noreferrer" className="social-link-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.youtube.com/@NICMeitY" target="_blank" rel="noreferrer" className="social-link-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  <span>YouTube</span>
                </a>
              </div>
            )}
          </div>
 
          {/* Accessibility Option Trigger */}
          <div style={{ position: 'relative', borderRight: '1px solid rgba(255,255,255,0.3)', paddingRight: '1rem', display: 'flex', alignItems: 'center' }} className="accessibility-widget-exclude">
            <button
              id="accessibility-trigger-btn"
              onClick={() => setIsAccessOpen(!isAccessOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0'
              }}
              title="Accessibility Options"
            >
              <Accessibility size={13} className="accessibility-widget-svg" />
              <span>ACCESSIBILITY OPTIONS</span>
              <ChevronDown size={11} className="accessibility-widget-svg" style={{ transform: isAccessOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            <AccessibilityWidget isOpen={isAccessOpen} onClose={() => setIsAccessOpen(false)} />
          </div>
 
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
            <Globe size={13} />
            <span>ENGLISH</span>
          </div>
        </div>
      </div>

      {/* 2. Official Portal Branding Section */}
      <div className="gov-branding" style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Left: India State Emblem & NIC Ranchi text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Emblem Image */}
          <a href="https://www.jharkhand.gov.in/" target="_blank" rel="noreferrer" title="Government of Jharkhand (Opens in a new window)">
            <img 
              src={emblemIndia} 
              alt="State Emblem of India" 
              style={{ width: '45px', height: '60px', objectFit: 'contain', flexShrink: 0 }} 
            />
          </a>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.05em' }}>राष्ट्रीय सूचना विज्ञान केन्द्र</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f294a', lineHeight: 1.2, fontFamily: 'var(--font-sans)' }}>
              National Informatics Centre
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ea580c', letterSpacing: '0.02em', marginTop: '0.1rem' }}>
              झारखण्ड राज्य एकक, रांची | Jharkhand State Unit, Ranchi
            </span>
          </div>
        </div>

        {/* Right: National Portal / NIC Logo Graphic */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            borderLeft: '2px solid #e2e8f0',
            paddingLeft: '0.75rem',
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'column'
          }} className="md-flex-container">
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Department of Electronics & IT</span>
            <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#94a3b8' }}>Ministry of Electronics & Information Technology, GoI</span>
          </div>
          
          {/* NIC Brand Emblem Image */}
          <a href="https://www.nic.in/" target="_blank" rel="noreferrer" title="National Informatics Centre (Opens in a new window)">
            <img 
              src={nicLogo} 
              alt="NIC Logo" 
              style={{ height: '45px', objectFit: 'contain', display: 'block' }} 
            />
          </a>
        </div>
      </div>

      {/* 3. Primary Navigation Bar */}
      <nav style={{
        backgroundColor: '#0f294a',
        borderBottom: '3px solid #ea580c',
        position: 'relative',
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Desktop Navigation Links */}
          <div className="nav-desktop-menu" style={{ display: 'flex', gap: '0.5rem' }}>
            {!isDashboardArea ? (
              // LANDING PAGE MENU
              <>
                <Link to="/" className="nav-item-link active">Home</Link>
                <a href="#about-section" className="nav-item-link">About Us</a>
                <a href="#services-section" className="nav-item-link">State Services</a>
                <a href="#links-section" className="nav-item-link">Important Links</a>
                <a href="#footer-section" className="nav-item-link">Contact Us</a>
              </>
            ) : (
              // ADMINISTRATIVE SYSTEM MENU
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-item-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <LayoutDashboard size={15} /> Dashboard
                  </span>
                </Link>
                <Link 
                  to="/vehicles" 
                  className={`nav-item-link ${location.pathname === '/vehicles' ? 'active' : ''}`}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Car size={15} /> Vehicle Lookup
                  </span>
                </Link>
                <Link 
                  to="/fuelstations" 
                  className={`nav-item-link ${location.pathname === '/fuelstations' ? 'active' : ''}`}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Fuel size={15} /> Fuel Station Lookup
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Right Action CTA */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!isDashboardArea ? (
              <Link 
                to="/dashboard" 
                className="btn btn-accent" 
                style={{ 
                  borderRadius: 0, 
                  height: '3.2rem', 
                  padding: '0 2rem', 
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem'
                }}
              >
                <LogIn size={16} /> Admin Portal
              </Link>
            ) : (
              <Link 
                to="/" 
                className="nav-item-link logout-btn" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  borderLeft: '1px solid rgba(255,255,255,0.1)',
                  height: '3.2rem',
                  padding: '0 1.25rem',
                  background: 'rgba(234, 88, 12, 0.1)',
                  color: '#fdba74'
                }}
              >
                <LogOut size={16} /> Exit Dashboard
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="nav-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.75rem',
                display: 'none'
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-menu" style={{
            backgroundColor: '#0f294a',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
            zIndex: 999
          }}>
            {!isDashboardArea ? (
              <>
                <Link to="/" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <a href="#about-section" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>About Us</a>
                <a href="#services-section" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>State Services</a>
                <a href="#links-section" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Important Links</a>
                <a href="#footer-section" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</a>
                <Link to="/dashboard" className="btn btn-accent" style={{ marginTop: '0.5rem', width: '100%' }} onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn size={16} /> Admin Portal
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <Link to="/vehicles" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Vehicle Lookup</Link>
                <Link to="/fuelstations" className="nav-mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Fuel Station Lookup</Link>
                <Link to="/" className="nav-mobile-link" style={{ color: '#fdba74' }} onClick={() => setIsMobileMenuOpen(false)}>Exit Dashboard</Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Styled JSX for local overrides (responsive styles for header/navbar) */}
      <style>{`
        .nav-item-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0 1.25rem;
          height: 3.2rem;
          display: inline-flex;
          align-items: center;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
        }
        .nav-item-link:hover {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.05);
        }
        .nav-item-link.active {
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.08);
          border-bottom-color: #ffffff;
        }
        .nav-mobile-link {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          transition: background-color 0.2s ease;
        }
        .nav-mobile-link:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }
        .topbar-link:hover {
          text-decoration: underline !important;
        }
        .md-flex-container {
          display: none;
        }
        @media (min-width: 768px) {
          .md-flex-container {
            display: flex;
          }
        }
        @media (max-width: 900px) {
          .nav-desktop-menu {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
          .nav-item-link.logout-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
