import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import './Window.scss';

interface WindowProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export const Window: React.FC<WindowProps> = ({
  isOpen,
  title,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement>(null);

  // Function to handle mouse mouvement while dragging
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  }, [isDragging]);

  // Function to handle the end of the drag event
  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Function to handle the start of the drag event
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Reset position when the window is closed
  useEffect(() => {
    if (!isOpen) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Add and clean up event listeners for dragging
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <div className="window-overlay" onClick={onClose}>
      <div 
        className="window"
        ref={windowRef}
        onClick={(e) => e.stopPropagation()}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div className="window-header" onMouseDown={onMouseDown}>
          <span className="window-title">{title}</span>
          <button className="window-close" onClick={onClose}>
            x
          </button>
        </div>
        <div className="window-content">
          {children}
        </div>
      </div>
    </div>
  );
};
