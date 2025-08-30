import React, { useState } from 'react';
import { useTrackerContext } from '../hooks/useTrackerContext';
import { getIconUrl } from '../utils/getIconUrl';
import itemsData from '../data/items.json';
import type { Item, ItemsData } from '../types';

interface ItemTrackerProps {
  isDarkMode: boolean;
}

interface ItemCardProps {
  item: Item;
  currentValue: boolean | number;
  onUpdate: (itemId: string, value: boolean | number) => void;
  isDarkMode: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, currentValue, onUpdate, isDarkMode }) => {
  const handleClick = () => {
    if (item.type === 'toggle') {
      onUpdate(item.id, !currentValue);
    } else if (item.type === 'progressive') {
      const currentLevel = typeof currentValue === 'number' ? currentValue : 0;
      const maxLevel = item.max_level || 1;
      const newLevel = currentLevel >= maxLevel ? 0 : currentLevel + 1;
      onUpdate(item.id, newLevel);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const maxQuantity = item.max_quantity || 999;
    onUpdate(item.id, Math.min(value, maxQuantity));
  };

  const isActive = item.type === 'toggle' 
    ? Boolean(currentValue) 
    : item.type === 'progressive' 
    ? (currentValue as number) > 0
    : (currentValue as number) > 0;

  const getDisplayName = () => {
    if (
      item.type === 'progressive' &&
      item.levels &&
      typeof currentValue === 'number' &&
      currentValue > 0
    ) {
      const levelIndex = currentValue - 1;
      return item.levels[levelIndex] || item.name;
    }
    return item.name;
  };

  const getProgressiveLevel = () => {
    if (item.type === 'progressive') {
      const currentLevel = currentValue as number;
      const maxLevel = item.max_level || 1;
      return `${currentLevel}/${maxLevel}`;
    }
    return null;
  };

  return (
    <div 
      className={`item-card ${isActive ? 'active' : ''} ${isDarkMode ? 'dark' : ''}`}
      onClick={item.type !== 'quantity' ? handleClick : undefined}
      style={{ cursor: item.type !== 'quantity' ? 'pointer' : 'default' }}
    >
      <div className="item-icon-container">
        {getIconUrl(item.icon) && (
          <img 
            src={getIconUrl(item.icon)} 
            alt={item.name}
            className="item-icon"
          />
        )}
        {item.type === 'progressive' && getProgressiveLevel() && (
          <div className="progressive-level">{getProgressiveLevel()}</div>
        )}
      </div>
      
      <div className="item-details">
        <div className="item-name" title={item.name}>
          {getDisplayName()}
        </div>
        {item.type === 'quantity' && (
          <input
            type="number"
            min="0"
            max={item.max_quantity || 999}
            value={currentValue as number || 0}
            onChange={handleQuantityChange}
            className="quantity-input"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};

const ItemTracker: React.FC<ItemTrackerProps> = ({ isDarkMode }) => {
  const { items, updateItem } = useTrackerContext();
  const [activeCategory, setActiveCategory] = useState<keyof ItemsData | 'all'>('all');
  const [gameFilter, setGameFilter] = useState<'all' | 'OOT' | 'MM'>('all');

  const getDefaultItemValue = (item: Item): boolean | number => {
    // Set default values for Kokiri Boots and Kokiri Tunic (toggled on by default)
    if (item.id === 'kokiri_boots' || item.id === 'kokiri_tunic') {
      return true;
    }
    // Default values for other items
    return item.type === 'quantity' ? 0 : false;
  };

  const data = itemsData as ItemsData;
  const categoryItems = activeCategory === 'all' 
    ? Object.values(data).flat() 
    : data[activeCategory as keyof ItemsData] || [];

  const filteredItems = categoryItems.filter(item => 
    gameFilter === 'all' || item.game === gameFilter
  );

  const categories: Array<{ key: keyof ItemsData | 'all'; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'quest_items', label: 'Quest Items' },
    { key: 'consumables', label: 'Consumables' },
    { key: 'upgrades', label: 'Upgrades' }
  ];

  return (
    <div className="item-tracker">
      <div className="item-tracker-header">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.key}
              className={`category-tab ${activeCategory === category.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        <div className="game-filters">
          <button
            className={`game-filter ${gameFilter === 'all' ? 'active' : ''}`}
            onClick={() => setGameFilter('all')}
          >
            All
          </button>
          <button
            className={`game-filter ${gameFilter === 'OOT' ? 'active' : ''}`}
            onClick={() => setGameFilter('OOT')}
          >
            OOT
          </button>
          <button
            className={`game-filter ${gameFilter === 'MM' ? 'active' : ''}`}
            onClick={() => setGameFilter('MM')}
          >
            MM
          </button>
        </div>
      </div>

      <div className="items-grid">
        {filteredItems.map(item => (
          <ItemCard
            key={item.id}
            item={item}
            currentValue={items[item.id] ?? getDefaultItemValue(item)}
            onUpdate={updateItem}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="no-items">
          No items found for the selected filters.
        </div>
      )}
    </div>
  );
};

export default ItemTracker;