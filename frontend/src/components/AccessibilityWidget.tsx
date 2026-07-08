import React, { useState, useEffect, useRef } from 'react';

interface AccessibilityWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityWidget: React.FC<AccessibilityWidgetProps> = ({ isOpen, onClose }) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  // 1. Accessibility States
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');
  const [highlightLinks, setHighlightLinks] = useState<boolean>(false);
  const [invert, setInvert] = useState<boolean>(false);
  const [saturation, setSaturation] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1 (small), 0 (normal), 1 (large), 2 (larger)
  const [textSpacing, setTextSpacing] = useState<boolean>(false);
  const [lineHeight, setLineHeight] = useState<boolean>(false);
  const [bigCursor, setBigCursor] = useState<boolean>(false);
  const [hideImages, setHideImages] = useState<boolean>(false);

  // Load saved configurations from localStorage on mount
  useEffect(() => {
    try {
      const savedContrast = localStorage.getItem('access-contrast') as 'normal' | 'high' || 'normal';
      const savedHighlightLinks = localStorage.getItem('access-highlight-links') === 'true';
      const savedInvert = localStorage.getItem('access-invert') === 'true';
      const savedSaturation = localStorage.getItem('access-saturation') === 'true';
      const savedFontSize = parseInt(localStorage.getItem('access-font-size-level') || '0', 10);
      const savedTextSpacing = localStorage.getItem('access-text-spacing') === 'true';
      const savedLineHeight = localStorage.getItem('access-line-height') === 'true';
      const savedBigCursor = localStorage.getItem('access-big-cursor') === 'true';
      const savedHideImages = localStorage.getItem('access-hide-images') === 'true';

      setContrast(savedContrast);
      setHighlightLinks(savedHighlightLinks);
      setInvert(savedInvert);
      setSaturation(savedSaturation);
      setFontSizeLevel(savedFontSize);
      setTextSpacing(savedTextSpacing);
      setLineHeight(savedLineHeight);
      setBigCursor(savedBigCursor);
      setHideImages(savedHideImages);

      // Apply initial DOM updates
      applyContrastDOM(savedContrast);
      applyHighlightLinksDOM(savedHighlightLinks);
      applyInvertDOM(savedInvert);
      applySaturationDOM(savedSaturation);
      applyFontSizeDOM(savedFontSize);
      applyTextSpacingDOM(savedTextSpacing);
      applyLineHeightDOM(savedLineHeight);
      applyBigCursorDOM(savedBigCursor);
      applyHideImagesDOM(savedHideImages);
    } catch (e) {
      console.error('Failed to load accessibility settings', e);
    }
  }, []);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Find the trigger button in the DOM
      const trigger = document.getElementById('accessibility-trigger-btn');
      if (
        isOpen &&
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node) &&
        (!trigger || !trigger.contains(event.target as Node))
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // 2. DOM Mutators & Storage Setters
  const applyContrastDOM = (val: 'normal' | 'high') => {
    const root = document.documentElement;
    if (val === 'high') {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }
  };

  const handleContrastChange = (val: 'normal' | 'high') => {
    setContrast(val);
    localStorage.setItem('access-contrast', val);
    applyContrastDOM(val);
  };

  const applyHighlightLinksDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-highlight-links');
    } else {
      root.classList.remove('accessibility-highlight-links');
    }
  };

  const toggleHighlightLinks = () => {
    const newVal = !highlightLinks;
    setHighlightLinks(newVal);
    localStorage.setItem('access-highlight-links', String(newVal));
    applyHighlightLinksDOM(newVal);
  };

  const applyInvertDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-invert');
    } else {
      root.classList.remove('accessibility-invert');
    }
  };

  const toggleInvert = () => {
    const newVal = !invert;
    setInvert(newVal);
    localStorage.setItem('access-invert', String(newVal));
    applyInvertDOM(newVal);
  };

  const applySaturationDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-desaturated');
    } else {
      root.classList.remove('accessibility-desaturated');
    }
  };

  const toggleSaturation = () => {
    const newVal = !saturation;
    setSaturation(newVal);
    localStorage.setItem('access-saturation', String(newVal));
    applySaturationDOM(newVal);
  };

  const applyFontSizeDOM = (level: number) => {
    const root = document.documentElement;
    let size = '16px';
    if (level === -1) size = '14px';
    else if (level === 0) size = '16px';
    else if (level === 1) size = '18px';
    else if (level === 2) size = '20px';
    root.style.fontSize = size;
  };

  const handleFontSizeChange = (action: 'increase' | 'decrease' | 'reset') => {
    let newLevel = fontSizeLevel;
    if (action === 'increase') {
      newLevel = Math.min(fontSizeLevel + 1, 2);
    } else if (action === 'decrease') {
      newLevel = Math.max(fontSizeLevel - 1, -1);
    } else {
      newLevel = 0;
    }
    setFontSizeLevel(newLevel);
    localStorage.setItem('access-font-size-level', String(newLevel));
    applyFontSizeDOM(newLevel);
  };

  const applyTextSpacingDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-text-spacing');
    } else {
      root.classList.remove('accessibility-text-spacing');
    }
  };

  const toggleTextSpacing = () => {
    const newVal = !textSpacing;
    setTextSpacing(newVal);
    localStorage.setItem('access-text-spacing', String(newVal));
    applyTextSpacingDOM(newVal);
  };

  const applyLineHeightDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-line-height');
    } else {
      root.classList.remove('accessibility-line-height');
    }
  };

  const toggleLineHeight = () => {
    const newVal = !lineHeight;
    setLineHeight(newVal);
    localStorage.setItem('access-line-height', String(newVal));
    applyLineHeightDOM(newVal);
  };

  const applyBigCursorDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-big-cursor');
    } else {
      root.classList.remove('accessibility-big-cursor');
    }
  };

  const toggleBigCursor = () => {
    const newVal = !bigCursor;
    setBigCursor(newVal);
    localStorage.setItem('access-big-cursor', String(newVal));
    applyBigCursorDOM(newVal);
  };

  const applyHideImagesDOM = (val: boolean) => {
    const root = document.documentElement;
    if (val) {
      root.classList.add('accessibility-hide-images');
    } else {
      root.classList.remove('accessibility-hide-images');
    }
  };

  const toggleHideImages = () => {
    const newVal = !hideImages;
    setHideImages(newVal);
    localStorage.setItem('access-hide-images', String(newVal));
    applyHideImagesDOM(newVal);
  };

  // Reset all accessibility options to default
  const handleResetAll = () => {
    setContrast('normal');
    setHighlightLinks(false);
    setInvert(false);
    setSaturation(false);
    setFontSizeLevel(0);
    setTextSpacing(false);
    setLineHeight(false);
    setBigCursor(false);
    setHideImages(false);

    localStorage.setItem('access-contrast', 'normal');
    localStorage.setItem('access-highlight-links', 'false');
    localStorage.setItem('access-invert', 'false');
    localStorage.setItem('access-saturation', 'false');
    localStorage.setItem('access-font-size-level', '0');
    localStorage.setItem('access-text-spacing', 'false');
    localStorage.setItem('access-line-height', 'false');
    localStorage.setItem('access-big-cursor', 'false');
    localStorage.setItem('access-hide-images', 'false');

    applyContrastDOM('normal');
    applyHighlightLinksDOM(false);
    applyInvertDOM(false);
    applySaturationDOM(false);
    applyFontSizeDOM(0);
    applyTextSpacingDOM(false);
    applyLineHeightDOM(false);
    applyBigCursorDOM(false);
    applyHideImagesDOM(false);
  };

  if (!isOpen) return null;

  // Green circular checkmark badge for active controls
  const renderCheckmark = () => (
    <div
      className="accessibility-widget-svg"
      style={{
        position: 'absolute',
        top: '6px',
        right: '6px',
        width: '16px',
        height: '16px',
        backgroundColor: '#16a34a',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }}
    >
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="1.5 4 4 6.5 8.5 1.5" />
      </svg>
    </div>
  );

  return (
    <div
      ref={widgetRef}
      className="accessibility-widget-exclude"
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        width: '380px',
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
        borderRadius: '8px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        padding: '1.25rem',
        zIndex: 9999,
        fontFamily: "'Outfit', sans-serif",
        color: '#1e293b',
        animation: 'accessPanelFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Dynamic Keyframes injected locally */}
      <style>{`
        @keyframes accessPanelFadeIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .access-control-btn {
          cursor: pointer;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 0.75rem 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          transition: all 0.2s ease;
          width: 100%;
          min-height: 84px;
        }
        .access-control-btn:hover {
          border-color: #94a3b8;
          background-color: #f8fafc;
          transform: translateY(-1px);
        }
        .access-control-btn:active {
          transform: translateY(0);
        }
        .access-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #334155;
          text-align: center;
          user-select: none;
        }
        .access-section-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.25rem;
        }
      `}</style>

      {/* Header Title & Reset */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          borderBottom: '2px solid #ea580c',
          paddingBottom: '0.5rem',
        }}
      >
        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f294a' }}>
          Accessibility Tools
        </span>
        <button
          onClick={handleResetAll}
          style={{
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '4px',
            padding: '0.3rem 0.6rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#ea580c',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
        >
          Reset All
        </button>
      </div>

      {/* 1. Color Contrast Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="access-section-title">Color Contrast</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {/* High Contrast */}
          <button
            className="access-control-btn"
            onClick={() => handleContrastChange('high')}
            style={{
              backgroundColor: '#000000',
              border: contrast === 'high' ? '2px solid #ffffff' : '1px solid #000000',
            }}
          >
            <svg
              className="accessibility-widget-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 0 0 20Z" fill="#ffffff" />
            </svg>
            <span className="access-label" style={{ color: '#ffffff' }}>
              High Contrast
            </span>
            {contrast === 'high' && renderCheckmark()}
          </button>

          {/* Normal Contrast */}
          <button className="access-control-btn" onClick={() => handleContrastChange('normal')}>
            <svg
              className="accessibility-widget-svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span className="access-label">Normal Contrast</span>
            {contrast === 'normal' && renderCheckmark()}
          </button>

          {/* Highlight Links */}
          <button className="access-control-btn" onClick={toggleHighlightLinks}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            <span className="access-label">Highlight Links</span>
            {highlightLinks && renderCheckmark()}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
          {/* Invert */}
          <button className="access-control-btn" onClick={toggleInvert}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 0 20Z" fill="#0f294a" />
            </svg>
            <span className="access-label">Invert</span>
            {invert && renderCheckmark()}
          </button>

          {/* Saturation */}
          <button className="access-control-btn" onClick={toggleSaturation}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
              <path d="M12 22V4c0 0 5 6.7 5 11a5 5 0 0 1-5 7z" fill="#0f294a" />
            </svg>
            <span className="access-label">Saturation</span>
            {saturation && renderCheckmark()}
          </button>
        </div>
      </div>

      {/* 2. Text Size Section */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div className="access-section-title">Text Size</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
          {/* Font Size Increase */}
          <button className="access-control-btn" onClick={() => handleFontSizeChange('increase')}>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f294a', lineHeight: 1 }}>A+</span>
            <span className="access-label">Font Size Increase</span>
            {fontSizeLevel > 0 && renderCheckmark()}
          </button>

          {/* Font Size Decrease */}
          <button className="access-control-btn" onClick={() => handleFontSizeChange('decrease')}>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f294a', lineHeight: 1 }}>A-</span>
            <span className="access-label">Font Size Decrease</span>
            {fontSizeLevel < 0 && renderCheckmark()}
          </button>

          {/* Normal Font */}
          <button className="access-control-btn" onClick={() => handleFontSizeChange('reset')}>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f294a', lineHeight: 1 }}>A</span>
            <span className="access-label">Normal Font</span>
            {fontSizeLevel === 0 && renderCheckmark()}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
          {/* Text Spacing */}
          <button className="access-control-btn" onClick={toggleTextSpacing}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h16M12 7v10M2 17h20M2 17l3-3M2 17l3 3M22 17l-3-3M22 17l-3 3" />
            </svg>
            <span className="access-label">Text Spacing</span>
            {textSpacing && renderCheckmark()}
          </button>

          {/* Line Height */}
          <button className="access-control-btn" onClick={toggleLineHeight}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7h10M9 7v10M18 5v14M18 5l-3 3M18 5l3 3M18 19l-3-3M18 19l3 3" />
            </svg>
            <span className="access-label">Line Height</span>
            {lineHeight && renderCheckmark()}
          </button>
        </div>
      </div>

      {/* 3. Other Controls Section */}
      <div>
        <div className="access-section-title">Other Controls</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          {/* Big Cursor */}
          <button className="access-control-btn" onClick={toggleBigCursor}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3l7.07 16.97 2.51-6.13 6.13-2.51L3 3z" />
              <path d="M19 19l2 2M13 18l1.5 3M18 13l3 1.5" />
            </svg>
            <span className="access-label">Big Cursor</span>
            {bigCursor && renderCheckmark()}
          </button>

          {/* Hide Images */}
          <button className="access-control-btn" onClick={toggleHideImages}>
            <svg
              className="accessibility-widget-svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0f294a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
            <span className="access-label">Hide Images</span>
            {hideImages && renderCheckmark()}
          </button>
        </div>
      </div>
    </div>
  );
};
