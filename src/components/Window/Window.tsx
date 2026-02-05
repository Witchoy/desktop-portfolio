import { useEffect, useRef, useState } from 'react';
import './Window.scss';
import type { Position } from '../../types';
import { FaCircle } from "react-icons/fa";

interface WindowProps {
  id: string;
  title: string;
  position: Position;
  zIndex: number;
  children: React.ReactNode;
  onClose: () => void;
  onPositionChange: (pos: Position) => void;
  onFocus: () => void;
}

export const Window: React.FC<WindowProps> = (win: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const { onPositionChange, onFocus, position } = win; // Destructure for easier access and linting

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onFocus();
    
    // Calculate offset between mouse position and window top-left corner
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      onPositionChange({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onPositionChange]);

  return (
    <div 
      className="window"
      onClick={onFocus}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: win.zIndex,
      }}
    >
      <div 
        className="window-header" 
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <button 
          className="window-close" 
          onClick={(e) => {
            e.stopPropagation();
            win.onClose();
          }}
        >
          <FaCircle className="window-close-icon" />
        </button>
        <span className="window-title">{win.title}</span>
      </div>
      <div className="window-content">
        {win.children}
      </div>
    </div>
  );
};
