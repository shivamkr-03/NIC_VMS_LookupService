import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  id: number | string;
  name: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = '-- Select --',
  disabled = false,
  hasError = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selected value to input search text
  useEffect(() => {
    const selectedOpt = options.find(opt => String(opt.id) === value);
    if (selectedOpt) {
      setSearchTerm(selectedOpt.name);
    } else {
      setSearchTerm('');
    }
  }, [value, options]);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Restore selected text if closed without selecting
        const selectedOpt = options.find(opt => String(opt.id) === value);
        setSearchTerm(selectedOpt ? selectedOpt.name : '');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, options]);

  const handleInputFocus = () => {
    setIsOpen(true);
    // Clear search term on click so the user sees all options and can filter easily
    setSearchTerm('');
  };

  const handleSelectOption = (opt: Option) => {
    onChange(String(opt.id));
    setSearchTerm(opt.name);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(opt =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="searchable-select-container">
      <input
        type="text"
        className="form-control searchable-select-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={handleInputFocus}
        disabled={disabled}
        style={{ 
          paddingRight: '2.5rem',
          borderColor: hasError ? 'var(--color-danger)' : undefined,
          boxShadow: hasError ? '0 0 0 1px var(--color-danger)' : undefined
        }}
      />
      <div 
        style={{ 
          position: 'absolute', 
          right: '1rem', 
          top: '50%', 
          transform: 'translateY(-50%)', 
          pointerEvents: 'none',
          color: '#64748b',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ChevronDown size={18} />
      </div>
      {isOpen && !disabled && (
        <div className="searchable-select-dropdown">
          {filteredOptions.length === 0 ? (
            <div className="searchable-select-no-results">No matches found</div>
          ) : (
            filteredOptions.map(opt => (
              <div
                key={opt.id}
                className={`searchable-select-option ${String(opt.id) === value ? 'highlighted' : ''}`}
                onClick={() => handleSelectOption(opt)}
              >
                {opt.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
