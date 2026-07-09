import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ExternalLink, 
  Shield, 
  Settings, 
  Server, 
  Users, 
  Layers, 
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Slideshow imports
import homepage1 from '../assets/homepage1.jpg';
import homepage2 from '../assets/homepage2.jpg';
import homepage3 from '../assets/homepage3.jpg';

export const LandingPage: React.FC = () => {
  const slides = [
    {
      image: homepage1,
      title: "e-Governance & Digital Transformation",
      description: "Empowering state departments with robust information networks and centralized directories."
    },
    {
      image: homepage2,
      title: "State-of-the-Art NIC Data Infrastructure",
      description: "Hosting secure databases, cloud solutions, and biometric administrative controls."
    },
    {
      image: homepage3,
      title: "Jharkhand Vehicle Management System (JHVMS)",
      description: "Managing administrative vehicle acquisitions, possession logs, and fuel vouchers."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Calendar states and logic
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 6, 1)); // Initialize to July 2026

  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const monthsList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentMonthName = monthsList[calendarDate.getMonth()];
  const currentYearVal = calendarDate.getFullYear();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    const dayCells: (number | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      dayCells.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      dayCells.push(day);
    }
    return dayCells;
  };

  const calendarDays = getDaysInMonth(calendarDate);

  // Auto-play slideshow logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header />

      {/* 1. Announcements Ticker */}
      <div style={{
        backgroundColor: '#f1f5f9',
        borderBottom: '1px solid #e2e8f0',
        padding: '0.6rem 1.5rem',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        overflow: 'hidden'
      }}>
        <span style={{
          backgroundColor: '#ea580c',
          color: '#ffffff',
          padding: '0.2rem 0.6rem',
          borderRadius: '2px',
          fontWeight: 700,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          flexShrink: 0
        }}>
          Latest News
        </span>
        <div style={{ whiteSpace: 'nowrap', display: 'inline-block' }} className="marquee-container">
          <span style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 25s linear infinite', color: '#1e293b', fontWeight: 500 }}>
            • National Voters Day 2025 celebrated at Ranchi State Centre • ICT Support provided during inauguration of Jharkhand Vidhan Sabha by Hon'ble Prime Minister at Ranchi • Next-generation Fin-tech solution deployed towards making financial processes more efficient • Secure hosting services activated at NIC Ranchi Data Centre •
          </span>
        </div>
      </div>

      {/* 2. Interactive Slideshow Hero Section */}
      <section id="main-content" style={{
        height: '500px',
        position: 'relative',
        color: '#ffffff',
        overflow: 'hidden'
      }}>
        {/* Carousel Slides */}
        {slides.map((slide, index) => (
          <div 
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: index === currentSlide ? 2 : 1,
              background: `linear-gradient(180deg, rgba(7, 30, 54, 0.7) 0%, rgba(7, 30, 54, 0.85) 100%)`
            }}
          >
            {/* Slide Background Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: -1
            }}></div>

            {/* Slide Content Overlay */}
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0 2rem',
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              zIndex: 3,
              position: 'relative'
            }}>
              {/* Slide Left Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '650px' }}>
                <span style={{
                  color: '#ea580c',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  borderLeft: '3px solid #ea580c',
                  paddingLeft: '0.6rem',
                  display: 'inline-block',
                  width: 'fit-content'
                }}>
                  e-Services & Infrastructure
                </span>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: '1.25',
                  color: '#ffffff',
                  margin: 0
                }}>
                  {slide.title}
                </h2>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  {slide.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                  <Link 
                    to="/dashboard" 
                    className="btn btn-accent" 
                    style={{ 
                      padding: '0.85rem 2rem', 
                      fontSize: '0.95rem', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    Enter Lookup Portal
                    <ArrowRight size={16} />
                  </Link>
                  <a 
                    href="#about-section" 
                    className="btn" 
                    style={{ 
                      backgroundColor: 'rgba(255,255,255,0.08)', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      color: '#ffffff',
                      padding: '0.85rem 1.5rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button 
          onClick={handlePrevSlide}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(15, 41, 74, 0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          className="slider-arrow"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={handleNextSlide}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(15, 41, 74, 0.4)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#ffffff',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          className="slider-arrow"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Pagination Dots */}
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.6rem',
          zIndex: 10
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '0.6rem',
                height: '0.6rem',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: index === currentSlide ? '#ea580c' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* 3. About us & Profile */}
      <section id="about-section" style={{ padding: '4.5rem 1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.75rem', color: '#0f294a' }}>About Us</h2>
            <p style={{ lineHeight: '1.7', color: '#475569', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              National Informatics Centre (NIC) of the Department of Information Technology provides network backbone and e-Governance support to Central Government, State Governments, UT Administrations, Districts, and other Government bodies.
            </p>
            <p style={{ lineHeight: '1.7', color: '#475569', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              NIC Ranchi State Centre started its unit with the goal of establishing modern informatics systems. Today, it manages major e-Governance directories, data centers, biometric registries, network administration pipelines, and secure portal architectures like the Jharkhand Vehicle Management System (JHVMS).
            </p>
            <a 
              href="https://nicjharkhand.nic.in/profile/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Read More <ExternalLink size={14} />
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.75rem', color: '#0f294a' }}>Our Objectives</h2>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(234, 88, 12, 0.1)', color: '#ea580c', padding: '0.6rem', borderRadius: '4px', display: 'flex' }}>
                <Shield size={20} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f294a' }}>Secure Directory Audit</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>Ensure secure tracking and validation checks for all state acquisitions.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(15, 41, 74, 0.1)', color: '#0f294a', padding: '0.6rem', borderRadius: '4px', display: 'flex' }}>
                <Settings size={20} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f294a' }}>Administrative Automation</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>Optimize coupon allocation metrics and trip distance summaries dynamically.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ backgroundColor: 'rgba(22, 163, 74, 0.1)', color: '#16a34a', padding: '0.6rem', borderRadius: '4px', display: 'flex' }}>
                <Server size={20} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#0f294a' }}>Unified Infrastructure</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>Host shared state assets on reliable cloud services managed by Ranchi unit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Services Showcase Section */}
      <section id="services-section" style={{ backgroundColor: '#f1f5f9', padding: '5rem 1.5rem', width: '100%' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2rem', color: '#0f294a', marginBottom: '0.75rem' }}>NIC Jharkhand State Services</h2>
            <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Providing various digital services helping nurture a robust Digital India state unit.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Card 1 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTopColor: '#ea580c' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f294a', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <Users size={20} style={{ color: '#ea580c' }} /> HELPDESK
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', flex: 1 }}>
                Supporting several services & projects such as bio-metric attendance, cloud, e-Office, messaging, network, cyber security, VC, Webcast, data centers etc.
              </p>
              <a href="https://servicedesk.nic.in/" target="_blank" rel="noreferrer" style={{ color: '#ea580c', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Access Helpdesk <ExternalLink size={12} />
              </a>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTopColor: '#0f294a' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f294a', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <Layers size={20} style={{ color: '#0f294a' }} /> SERVICES
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', flex: 1 }}>
                Providing various digital services such as Cloud, domain registration, email, security audits, hosting, video-conferencing etc helping nurture a robust Digital India.
              </p>
              <a href="https://nicjharkhand.nic.in/services/" target="_blank" rel="noreferrer" style={{ color: '#0f294a', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                View Services <ExternalLink size={12} />
              </a>
            </div>

            {/* Card 3 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTopColor: '#16a34a' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#0f294a', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <Server size={20} style={{ color: '#16a34a' }} /> INFRASTRUCTURE
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', flex: 1 }}>
                Providing secure, state-of-the-art, reliable infrastructure in the form of data centers, networking, office-automation solutions to meet IT needs of a growing nation.
              </p>
              <a href="https://nicjharkhand.nic.in/infrastructure/" target="_blank" rel="noreferrer" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                Infrastructure Details <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Important Links Section */}
      <section id="links-section" style={{ padding: '5.5rem 1.5rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#0f294a', marginBottom: '0.75rem' }}>Important Portals & Links</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Quick links to related Jharkhand administrative websites and state systems.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem'
        }}>
          {[
            { name: 'Jharkhand Land Record Online', desc: 'Land and registration directories', url: 'https://jharbhoomi.jharkhand.gov.in' },
            { name: 'Integrated Financial Management System', desc: 'Treasury & finance clearance', url: 'https://finance.jharkhand.gov.in/' },
            { name: 'Jhar Nibandhan', desc: 'Online document registration services', url: 'https://jharnibandhan.gov.in/' },
            { name: 'Jhar-Sewa Portal', desc: 'Citizen services certification registry', url: 'https://jharsewa.jharkhand.gov.in' },
            { name: 'Jharkhand Government Website', desc: 'Official state department directory', url: 'http://jharkhand.gov.in/' },
            { name: 'Jharkhand High Court', desc: 'Judiciary records and notification lookup', url: 'https://jharkhandhighcourt.nic.in' },
            { name: 'Jharkhand State Info Commission', desc: 'RTI portals and commission disclosures', url: 'http://onlinejsic.jharkhand.gov.in/' },
            { name: 'Jharkhand Vidhan Sabha', desc: 'Legislative assembly events & publications', url: 'https://jharkhandvidhansabha.nic.in' }
          ].map((lnk, i) => (
            <a 
              key={i} 
              href={lnk.url} 
              target="_blank" 
              rel="noreferrer" 
              className="gov-portal-link"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                padding: '1.25rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span style={{ fontWeight: 700, color: '#0f294a', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'space-between' }}>
                {lnk.name} <ExternalLink size={14} style={{ color: '#ea580c', flexShrink: 0 }} />
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{lnk.desc}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 5. Address & Calendar Section */}
      <section className="calendar-address-section">
        <div className="address-col">
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <MapPin size={32} color="#ffffff" />
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#ffffff' }}>Address</h3>
          <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: '#e2e8f0', fontWeight: 500 }}>
            <p style={{ margin: '0 0 0.5rem 0', color: '#ffffff', fontWeight: 700, fontSize: '1.2rem' }}>
              National Informatics Centre
            </p>
            <p style={{ margin: 0 }}>2nd Floor, Engineer's Hostel,</p>
            <p style={{ margin: 0 }}>Near Golchakkar, Dhurwa,</p>
            <p style={{ margin: 0 }}>Ranchi, Jharkhand,</p>
            <p style={{ margin: '1rem 0 0 0', fontWeight: 600 }}>Phone: 0651 - 2401076</p>
          </div>
        </div>

        <div className="calendar-col">
          <h3 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 1.5rem 0', color: '#ffffff', textAlign: 'center' }}>Calendar</h3>
          
          <div style={{ width: '100%', maxWidth: '450px' }}>
            {/* Calendar Card */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)' }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#374151',
                padding: '0.75rem 1.25rem',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '1rem'
              }}>
                <button 
                  onClick={handlePrevMonth} 
                  style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.25rem', padding: '0 0.5rem', display: 'flex', alignItems: 'center' }}
                >
                  &lt;
                </button>
                <span>{currentMonthName} {currentYearVal}</span>
                <button 
                  onClick={handleNextMonth} 
                  style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.25rem', padding: '0 0.5rem', display: 'flex', alignItems: 'center' }}
                >
                  &gt;
                </button>
              </div>

              {/* Day Headers */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                backgroundColor: '#d0d5dd',
                color: '#1f2937',
                fontSize: '0.8rem',
                fontWeight: 700,
                textAlign: 'center',
                padding: '0.6rem 0',
                borderBottom: '1px solid #cbd5e1'
              }}>
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>

              {/* Day Cells Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '1px',
                backgroundColor: '#cbd5e1'
              }}>
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} style={{ backgroundColor: '#f1f5f9', height: '42px' }} />;
                  }

                  const cellDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
                  const dayOfWeek = cellDate.getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                  const isToday = calendarDate.getFullYear() === 2026 && calendarDate.getMonth() === 6 && day === 3;

                  let bgColor = '#ffffff';
                  let textColor = '#1f2937';

                  if (isWeekend) {
                    bgColor = '#35b5e9'; // solid blue Weekly Off
                    textColor = '#ffffff';
                  } else if (isToday) {
                    bgColor = '#e0f2fe'; // light blue highlighted day
                    textColor = '#0284c7';
                  }

                  return (
                    <div 
                      key={`day-${day}`} 
                      style={{ 
                        backgroundColor: bgColor, 
                        color: textColor,
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        fontWeight: isToday || isWeekend ? 600 : 400
                      }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend Bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              backgroundColor: '#d0d5dd',
              padding: '0.6rem 1rem',
              marginTop: '1rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              color: '#1f2937',
              fontWeight: 700,
              gap: '0.5rem 1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#e53935', display: 'inline-block', borderRadius: '2px' }} />
                <span>Gazetted Holiday</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#43a047', display: 'inline-block', borderRadius: '2px' }} />
                <span>Restricted Holiday</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#35b5e9', display: 'inline-block', borderRadius: '2px' }} />
                <span>Weekly Off</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#fdd835', display: 'inline-block', borderRadius: '2px' }} />
                <span>Vacation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Styled JSX for local animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .marquee-container {
          overflow: hidden;
          width: 100%;
        }
        .gov-portal-link:hover {
          border-color: #ea580c !important;
          box-shadow: var(--shadow-md) !important;
          transform: translateY(-2px);
        }
        .slider-arrow:hover {
          background: rgba(15, 41, 74, 0.75) !important;
        }
        .calendar-address-section {
          width: 100%;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        .address-col {
          flex: 1;
          min-width: 300px;
          background-color: #1b354d;
          color: #ffffff;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
        }
        .calendar-col {
          flex: 1;
          min-width: 300px;
          background-color: #f05a60;
          color: #ffffff;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          .calendar-address-section {
            flex-direction: column;
          }
          .address-col, .calendar-col {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};
