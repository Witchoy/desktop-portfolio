import { useState } from "react";
import type { Position, Size, WindowData } from "../types";
import { INITIAL_WINDOWS } from "../data/InitialDatas";

export default function useWindowManager() {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const openWindow = (windowId: string) => {
    setWindows(prev => {
      // Check if window already exists using previous state
      if (prev.find(win => win.id === windowId)) return prev;
      const windowData = INITIAL_WINDOWS.find(win => win.id === windowId);
      if (!windowData) return prev;
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

  const updateWindowSize = (id: string, size: Size, minSize: Size) => {
    setWindows(prev => prev.map(win =>
      win.id === id ? { ...win, size, minSize } : win
    ));
  }

  const bringToFront = (id: string) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex), 0);
      return prev.map(win => {
        if(win.zIndex <= maxZ && win.id === id) {
          return { ...win, zIndex: maxZ + 1 };
        }
        return win;
      });
    });
  };

  return {
    windows,
    openWindow,
    closeWindow,
    updateWindowPosition,
    updateWindowSize,
    bringToFront,
  };
};