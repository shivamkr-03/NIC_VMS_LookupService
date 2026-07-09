import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
  triggerReset?: boolean;
}

export const Captcha: React.FC<CaptchaProps> = ({ onValidate, triggerReset }) => {
  const [userInput, setUserInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    onValidate(false); // Reset validation
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (triggerReset !== undefined) {
      generateCaptcha();
    }
  }, [triggerReset]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserInput(val);
    // Case-sensitive validation
    onValidate(val === captchaCode);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px', marginTop: '1.5rem', marginBottom: '1rem' }}>
      <label className="form-label">
        Security Captcha <span style={{ color: 'var(--color-danger)' }}>*</span>
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Captcha Panel with government style line decoration */}
        <div 
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '1.65rem',
            fontWeight: 800,
            letterSpacing: '4px',
            background: 'repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 8px, #e2e8f0 8px, #e2e8f0 16px)',
            border: '1px solid #cbd5e1',
            borderRadius: 'var(--radius-sm)',
            padding: '0.4rem 1rem',
            userSelect: 'none',
            fontStyle: 'italic',
            textDecoration: 'line-through',
            textDecorationColor: 'rgba(15, 41, 74, 0.35)',
            height: '42px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
            flex: '1'
          }}
        >
          {captchaCode.split('').map((char, index) => {
            const rotations = ['-6deg', '5deg', '-4deg', '6deg', '-3deg', '4deg'];
            const colors = ['#0f294a', '#334155', '#ea580c', '#0284c7', '#16a34a', '#475569'];
            return (
              <span 
                key={index} 
                style={{ 
                  display: 'inline-block', 
                  transform: `rotate(${rotations[index % rotations.length]})`,
                  color: colors[(index + char.charCodeAt(0)) % colors.length]
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Refresh Button */}
        <button 
          type="button" 
          onClick={generateCaptcha}
          className="btn btn-secondary"
          style={{ padding: '0 0.75rem', minWidth: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Refresh Captcha"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <input 
        type="text"
        placeholder="Enter Case-Sensitive Captcha"
        className="form-control"
        value={userInput}
        onChange={handleInputChange}
        style={{ textTransform: 'none' }}
      />
    </div>
  );
};
