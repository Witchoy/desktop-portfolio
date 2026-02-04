import { useState } from 'react';
import { Window } from './components/Window/Window';

import './App.scss'

const App: React.FC = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);

  const openWindow = () => setIsWindowOpen(true);
  const closeWindow = () => setIsWindowOpen(false);

  return (
    <div id="app-container">
      <button onClick={openWindow}>Open Windows</button>
      <Window isOpen={isWindowOpen} title="My Window" onClose={closeWindow}>
        <p>This is the content of the window.</p>
      </Window>
    </div>
  );
};

export default App;
