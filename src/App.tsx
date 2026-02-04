import { useState } from 'react';
import { Window } from './components/Window/Window';
import './App.scss';
import type { WindowData, Position } from './types';
import aboutMeIcon from './assets/img/about_me.svg';
import projectsIcon from './assets/img/projects.svg';

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const openWindow = (windowData: WindowData) => {
    // Check if window already exists
    if (windows.find(win => win.id === windowData.id)) return;
    setWindows(prev => [...prev, windowData]);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const updatePosition = (id: string, position: Position) => {
    setWindows(prev => prev.map(win =>
      win.id === id ? { ...win, position } : win
    ));
  };

  const bringToFront = (id: string) => {
    const maxZ = Math.max(...windows.map(w => w.zIndex), 0);
    setWindows(prev => prev.map(win =>
      win.id === id ? { ...win, zIndex: maxZ + 1 } : win
    ));
  };

  return (
    <div id="app-container">
      <div className="desktop-buttons">
        <button
          className="desktop-button"
          onClick={() => openWindow({
            id: 'about-me',
            title: 'About Me',
            content: <div><p>This is the About Me window content.</p></div>,
            position: { x: 100, y: 100 },
            zIndex: windows.length + 1,
          })}
        >
          <img src={aboutMeIcon} alt="About Me" />
          About Me
        </button>
        <button
          className="desktop-button"
          onClick={() => openWindow({
            id: 'projects',
            title: 'Projects',
            content: <div><p>Here are my projects!</p></div>,
            position: { x: 200, y: 150 },
            zIndex: windows.length + 1,
          })}
        >
          <img src={projectsIcon} alt="Projects" />
          Projects
        </button>
      </div>

      {windows.map(win => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          position={win.position}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onPositionChange={(pos) => updatePosition(win.id, pos)}
          onFocus={() => bringToFront(win.id)}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

export default App;
