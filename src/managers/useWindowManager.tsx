import { useState } from "react";
import type { Position, WindowData } from "../types";

export default function useWindowManager() {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const openWindow = (windowData: WindowData) => {
    setWindows(prev => {
      // Check if window already exists using previous state
      if (prev.find(win => win.id === windowData.id)) return prev;
      return [...prev, windowData];
    });
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const updateWindowPosition = (id: string, position: Position) => {
    setWindows(prev => prev.map(win =>
      win.id === id ? { ...win, position } : win
    ));
  };

  const bringToFront = (id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(win =>
        win.id === id ? { ...win, zIndex: maxZ + 1 } : win
      );
    });
  };

  return {
    windows,
    openWindow,
    closeWindow,
    updateWindowPosition,
    bringToFront,
  };
};