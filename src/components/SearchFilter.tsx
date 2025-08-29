import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filterType: 'all' | 'overworld' | 'town' | 'special';
  onFilterChange: (type: 'all' | 'overworld' | 'town' | 'special') => void;
  gameFilter: 'all' | 'OOT' | 'MM';
  onGameFilterChange: (game: 'all' | 'OOT' | 'MM') => void;
  isDarkMode: boolean;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  gameFilter,
  onGameFilterChange
}) => {
  return (
    <div className="search-filter">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search areas or entrances..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
          aria-label="Search areas and entrances"
        />
        <span className="search-icon">🔍</span>
      </div>
      
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
          aria-pressed={filterType === 'all'}
        >
          All
        </button>
        <button
          className={`filter-btn ${filterType === 'overworld' ? 'active' : ''}`}
          onClick={() => onFilterChange('overworld')}
          aria-pressed={filterType === 'overworld'}
        >
          Overworld
        </button>
        <button
          className={`filter-btn ${filterType === 'town' ? 'active' : ''}`}
          onClick={() => onFilterChange('town')}
          aria-pressed={filterType === 'town'}
        >
          Towns
        </button>
        <button
          className={`filter-btn ${filterType === 'special' ? 'active' : ''}`}
          onClick={() => onFilterChange('special')}
          aria-pressed={filterType === 'special'}
        >
          Special
        </button>
        
        {/* Game Filter Buttons */}
        <div className="filter-separator" />
        <button
          className={`filter-btn ${gameFilter === 'all' ? 'active' : ''}`}
          onClick={() => onGameFilterChange('all')}
          aria-pressed={gameFilter === 'all'}
        >
          All Games
        </button>
        <button
          className={`filter-btn ${gameFilter === 'OOT' ? 'active' : ''}`}
          onClick={() => onGameFilterChange('OOT')}
          aria-pressed={gameFilter === 'OOT'}
        >
          OOT
        </button>
        <button
          className={`filter-btn ${gameFilter === 'MM' ? 'active' : ''}`}
          onClick={() => onGameFilterChange('MM')}
          aria-pressed={gameFilter === 'MM'}
        >
          MM
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;