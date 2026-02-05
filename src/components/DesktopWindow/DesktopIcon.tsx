import { useEffect, useRef, useState, type FC } from 'react';
import './DesktopIcon.scss';
import type { Position } from '../../types';

interface DesktopIconProps {
  id: string;
  icon: string;
  title: string;
  position: Position;
  onDoubleClick: () => void;
  onPositionChange: (position: Position) => void;
  onFocus: () => void;
}

const DesktopIcon: FC<DesktopIconProps> = (di: DesktopIconProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });
  const { onPositionChange, onFocus, position } = di; // Destructure for easier access and linting

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
      className="desktop-icon" 
      onDoubleClick={di.onDoubleClick}
      onMouseDown={(handleMouseDown)}
      style={{ 
        transform: `translate(${di.position.x}px, ${di.position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <img src={di.icon} alt={`${di.title} Icon`} className="desktop-icon-image" />
      <span className="desktop-icon-title">{di.title}</span>
    </div>
  );
};

export default DesktopIcon;
