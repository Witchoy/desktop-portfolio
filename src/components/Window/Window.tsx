import { useEffect, useRef, useState } from 'react';
import './Window.scss';
import type { Position, Size } from '../../types';
import { FaCircle } from "react-icons/fa";

interface WindowProps {
  id: string;
  title: string;
  position: Position;
  size: Size;
  zIndex: number;
  children: React.ReactNode;
  onClose: () => void;
  onPositionChange: (pos: Position) => void;
  onSizeChange: (size: Size) => void;
  onFocus: () => void;
}

export const Window: React.FC<WindowProps> = (win: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const resizeOffset = useRef<Size>({ width: 0, height: 0 });
  const { onPositionChange, onSizeChange, onFocus, position, size } = win; // Destructure for easier access and linting

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

  const handleResize = (e: React.MouseEvent) => {
    console.log('resize handle mouse down');
    e.preventDefault();
    setIsResizing(true);
    onFocus();
    
    // Calculate offset between mouse position and window bottom-right corner
    resizeOffset.current = {
      width: e.clientX - (position.x + size.width),
      height: e.clientY - (position.y + size.height),
    };
  };

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = e.clientX - position.x - resizeOffset.current.width;
      const newHeight = e.clientY - position.y - resizeOffset.current.height;
      onSizeChange({
        width: Math.max(100, newWidth), // Minimum width
        height: Math.max(50, newHeight), // Minimum height
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, onSizeChange, position.x, position.y]);

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
        width: size.width,
        height: size.height,
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
      <button className="window-resize" onMouseDown={handleResize}/>
    </div>
  );
};
