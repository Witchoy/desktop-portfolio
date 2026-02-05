import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import './AboutMe.scss';

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offsetX = 0;
    let offsetY = 0;
    const speed = 0.5;
    let cols: number, rows: number, cellSize: number;
    let animationId: number;

    function drawGrid() {
      if(!canvas) return;
      cellSize = 30;

      // Calculate columns and rows based on canvas container size
      const maxWidth = canvas.offsetWidth || window.innerWidth - 40;
      const maxHeight = canvas.offsetHeight || window.innerHeight - 40;

      cols = Math.floor(maxWidth / cellSize) + 2; // Extra cells for seamless loop
      rows = Math.floor(maxHeight / cellSize) + 2;

      // Set canvas size to fit grid perfectly
      canvas.width = (cols - 2) * cellSize;
      canvas.height = (rows - 2) * cellSize;
    }

    function animate() {
      if(!ctx) return;
      if(!canvas) return;
      // VS Code dark background
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update offset for diagonal movement
      offsetX -= speed;
      offsetY -= speed;

      // Reset offset when it reaches cellSize for seamless loop
      if (offsetX <= -cellSize) offsetX = 0;
      if (offsetY <= -cellSize) offsetY = 0;

      // Draw grid of alternating 0 and 1
      ctx.fillStyle = '#569cd6';
      ctx.font = '20px "Consolas", "Courier New", monospace';

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const value = (i + j) % 2 === 0 ? '0' : '1';
          const x = i * cellSize + 10 + offsetX;
          const y = j * cellSize + 20 + offsetY;
          ctx.fillText(value, x, y);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    // Initialize and start animation
    drawGrid();
    animate();

    // Handle window resize
    const handleResize = () => drawGrid();
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="about-me">
      <canvas ref={canvasRef} className="background-canvas"></canvas>
      <div className="content">
        <h1>About Me</h1>
      </div>
    </div>
  );
};

export default AboutMe;
