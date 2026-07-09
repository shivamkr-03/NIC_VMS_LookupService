import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// Partner SVG logo imports

import logoMygov from '../assets/logo_mygov.svg';
import logoPmindia from '../assets/logo_pmindia.svg';
import logoDigitalIndia from '../assets/logo_digitalindia.svg';
import logoIndiaGov from '../assets/logo_indiagov.svg';
import logoIncredibleIndia from '../assets/logo_incredibleindia.svg';
import logoDatagov from '../assets/logo_datagov.svg';
import logoSwaas from '../assets/logo_swaas.png';

export const Footer: React.FC = () => {

  const partnerLogos = [
    { name: 'myGov', src: logoMygov, url: 'https://www.mygov.in/' },
    { name: 'PMINDIA', src: logoPmindia, url: 'https://www.pmindia.gov.in/' },
    { name: 'Digital India', src: logoDigitalIndia, url: 'https://www.digitalindia.gov.in/' },
    { name: 'india.gov.in', src: logoIndiaGov, url: 'https://www.india.gov.in/' },
    { name: 'Incredible India', src: logoIncredibleIndia, url: 'https://www.incredibleindia.org/' },
    { name: 'data.gov.in', src: logoDatagov, url: 'https://data.gov.in/' }
  ];

  const [currentPosition, setCurrentPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(2);
      } else if (width < 1024) {
        setVisibleCount(4);
      } else {
        setVisibleCount(6);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentPosition((prev) => {
      const maxPosition = partnerLogos.length - visibleCount;
      return prev < maxPosition ? prev + 1 : 0;
    });
  };

  const prevSlide = () => {
    setCurrentPosition((prev) => {
      const maxPosition = partnerLogos.length - visibleCount;
      return prev > 0 ? prev - 1 : maxPosition;
    });
  };

  useEffect(() => {
    if (!isPlaying || isHovered) return;
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [isPlaying, isHovered, visibleCount]);

  const itemWidthPercent = 100 / visibleCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 'auto' }}>
      {/* 1. Logo Slider Carousel */}
      <section 
        style={{ 
          width: '100%', 
          backgroundColor: '#ffffff', 
          position: 'relative', 
          overflow: 'hidden',
          borderBottom: '1px solid #cbd5e1'
        }}
      >
        {/* Dual Color Top Border */}
        <div style={{ height: '4px', width: '100%', display: 'flex' }}>
          <div style={{ backgroundColor: '#0f294a', width: '50%' }}></div>
          <div style={{ backgroundColor: '#dc2626', width: '50%' }}></div>
        </div>

        <div 
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            padding: '1.5rem 3rem 1.5rem 3rem', 
            position: 'relative' 
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Viewport */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                transition: 'transform 0.5s ease-in-out',
                transform: `translateX(-${currentPosition * itemWidthPercent}%)`
              }}
            >
              {partnerLogos.map((logo, index) => (
                <div 
                  key={index} 
                  style={{ 
                    flex: `0 0 ${itemWidthPercent}%`, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    padding: '0 20px',
                    borderRight: index === partnerLogos.length - 1 ? 'none' : '1px solid #e2e8f0',
                    boxSizing: 'border-box'
                  }}
                >
                  <a 
                    href={logo.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <img 
                      src={logo.src} 
                      alt={logo.name} 
                      style={{ 
                        height: '42px', 
                        objectFit: 'contain', 
                        filter: 'grayscale(100%)',
                        transition: 'filter 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button */}
          <button 
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 10
            }}
            aria-label="Previous Partner"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right Arrow Button */}
          <button 
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#dc2626',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              zIndex: 10
            }}
            aria-label="Next Partner"
          >
            <ChevronRight size={18} />
          </button>

          {/* Play/Pause Small Toggle Icon */}
          <div style={{ position: 'absolute', left: '10px', bottom: '2px', zIndex: 10 }}>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Footer Section */}
      <footer 
        id="footer-section" 
        style={{
          backgroundColor: '#111111',
          color: '#ffffff',
          padding: '2.5rem 1.5rem',
          width: '100%',
          borderTop: '1px solid #222222',
          boxSizing: 'border-box'
        }}
      >
        <div 
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.25rem',
            textAlign: 'center' 
          }}
        >
          {/* Description */}
          <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff', lineHeight: '1.6' }}>
              © NIC Jharkhand Developed and hosted by <a href="https://www.nic.in/" target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>National Informatics Centre</a>,<br />
              <a href="https://www.meity.gov.in/" target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>Ministry of Electronics &amp; Information Technology</a>, Government of India
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#9ca3af' }}>
              Last Updated: <strong style={{ color: '#ffffff' }}>Feb 09, 2026</strong>
            </p>
          </div>

          {/* Bottom Branding Logos */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '0.5rem' }}>
            <a href="https://s3waas.gov.in/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={logoSwaas}
                alt="SwaaS Logo" 
                style={{ 
                  height: '42px', 
                  objectFit: 'contain'
                }} 
              />
            </a>
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}></div>
            <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={logoDigitalIndia}
                alt="Digital India Logo" 
                style={{ 
                  height: '42px', 
                  objectFit: 'contain'
                }} 
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
