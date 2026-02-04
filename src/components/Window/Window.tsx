import { useEffect, useRef, useState } from 'react';
import './Window.scss';
import type { Position } from '../../types';

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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    win.onFocus();
    
    // Calculate offset between mouse position and window top-left corner
    dragOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    };
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      win.onPositionChange({
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
  }, [isDragging, win.onPositionChange]);

  return (
    <div 
      className="window"
      onClick={win.onFocus}
      style={{ 
        transform: `translate(${win.position.x}px, ${win.position.y}px)`,
        zIndex: win.zIndex,
      }}
    >
      <div 
        className="window-header" 
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <span className="window-title">{win.title}</span>
        <button 
          className="window-close" 
          onClick={(e) => {
            e.stopPropagation();
            win.onClose();
          }}
        >
          x
        </button>
      </div>
      <div className="window-content">
        {win.children}
      </div>
    </div>
  );
};
