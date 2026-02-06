import { type FC } from 'react';
import { Window } from './components/Window/Window';
import type { DesktopIconData, WindowData } from './types';
import useDesktopIconManager from './managers/useDesktopIconManager';
import useWindowManager from './managers/useWindowManager';
import './App.scss';
import DesktopIcon from './components/DesktopWindow/DesktopIcon';

const App: FC = () => {
  const { windows, openWindow, closeWindow, updateWindowPosition, updateWindowSize, bringToFront } = useWindowManager();
  const { icons, updateIconPosition } = useDesktopIconManager();

  return (
    <div id="app-container">
      {/* Desktop Icons */}
      {icons.map((icon: DesktopIconData) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          icon={icon.icon}
          title={icon.title}
          position={icon.position}
          onDoubleClick={() => openWindow(icon.id)}
          onPositionChange={(pos) => updateIconPosition(icon.id, pos)}
          onFocus={() => bringToFront(icon.id)}
        />
      ))}
      {/* Windows */}
      {windows.map((win: WindowData) => (
        <Window
          key={win.id}
          id={win.id}
          title={win.title}
          position={win.position}
          size={win.size}
          minSize={win.minSize}
          zIndex={win.zIndex}
          onClose={() => closeWindow(win.id)}
          onPositionChange={(pos) => updateWindowPosition(win.id, pos)}
          onSizeChange={(size, minSize) => updateWindowSize(win.id, size, minSize)}
          onFocus={() => bringToFront(win.id)}
        >
          {win.content}
        </Window>
      ))}
    </div>
  );
};

export default App;
