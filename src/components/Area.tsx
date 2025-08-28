import React from 'react';
import EntranceSelect from './EntranceSelect';
import { useTrackerContext } from '../context/TrackerContext';
import type { Area as AreaType } from '../types';

interface AreaProps {
  area: AreaType;
  index: number;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
}

const Area: React.FC<AreaProps> = ({ 
  area, 
  index, 
  onDragStart, 
  onDragOver, 
  onDrop 
}) => {
  const { connections, updateConnection } = useTrackerContext();
  
  // Create card style with area color and a fallback
  const cardStyle = {
    backgroundColor: area.color || 'var(--card-background)',
    borderColor: area.color ? `${area.color}99` : 'var(--card-border)', // Add opacity for border
  };
  
  // Determine if we need light or dark text based on background color
  const isDarkColor = area.color ? isColorDark(area.color) : false;
  const textStyle = {
    color: isDarkColor ? '#ffffff' : '#000000',
  };
  
  return (
    <div 
      className="area-card"
      style={cardStyle}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      role="region"
      aria-label={`${area.name} area with ${area.entrances.length} entrances`}
      tabIndex={0}
    >
      <div className="area-header">
        <h3 style={textStyle} id={`area-${area.id}`}>{area.name}</h3>
        <div 
          className="drag-handle" 
          style={textStyle}
          role="button"
          aria-label={`Drag to reorder ${area.name}`}
          tabIndex={0}
        >
          ⋮⋮
        </div>
      </div>
      <ul 
        className="entrance-list"
        role="list"
        aria-labelledby={`area-${area.id}`}
      >
        {area.entrances.map(entrance => (
          <li 
            key={entrance.id} 
            className="entrance-item" 
            style={textStyle}
            role="listitem"
          >
            <span id={`entrance-${entrance.id}`}>{entrance.name}</span>
            <EntranceSelect 
              entranceId={entrance.id}
              entranceName={entrance.name}
              selectedDestination={connections[entrance.id] || entrance.defaultDestination}
              onChange={(destination) => updateConnection(entrance.id, destination)}
              isDarkBackground={isDarkColor}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Utility function to determine if a color is dark (for text contrast)
function isColorDark(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate brightness (0-255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // If brightness is less than 128, color is dark
  return brightness < 128;
}

export default Area;