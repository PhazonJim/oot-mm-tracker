import React, { useState, useMemo, useRef, useEffect } from 'react';
import entranceTargets from '../data/entrance_targets.json';

interface FilterableSelectProps {
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

interface SelectOption {
  value: string;
  label: string;
  category: string;
}

const FilterableSelect: React.FC<FilterableSelectProps> = ({
  value,
  onChange,
  ariaLabel
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Create all entrance options sorted alphabetically
  const allOptions = useMemo(() => {
    const options: SelectOption[] = [];

    // Add "Unknown" option first
    options.push({ value: '', label: '-- Unknown --', category: '' });

    // Add all targets from the flat list
    entranceTargets.forEach(target => {
      options.push({
        value: target,
        label: target,
        category: 'Destinations'
      });
    });

    return options;
  }, []);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return allOptions;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return allOptions.filter(option => 
      option.label.toLowerCase().includes(lowerSearchTerm) ||
      option.category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [allOptions, searchTerm]);

  // Find the display label for the current value
  const currentLabel = useMemo(() => {
    const option = allOptions.find(opt => opt.value === value);
    return option ? option.label : '-- Unknown --';
  }, [value, allOptions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      // Select first filtered option on Enter
      handleSelect(filteredOptions[0].value);
    }
  };

  // Always use consistent white background with black text for dropdowns
  const selectStyle = {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #ccc'
  };

  const dropdownStyle = {
    backgroundColor: '#ffffff',
    color: '#000000',
    border: '1px solid #ccc',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  };

  return (
    <div className="filterable-select" ref={dropdownRef}>
      <button
        type="button"
        className="select-button"
        style={selectStyle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="select-value">{currentLabel}</span>
        <span className="select-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="select-dropdown" style={dropdownStyle}>
          <input
            ref={searchInputRef}
            type="text"
            className="select-search"
            placeholder="Search entrances..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <div className="select-options" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`select-option ${option.value === value ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={option.value === value}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="no-options">No entrances found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterableSelect;