import { useState } from "react";
import type { Position, DesktopIconData } from "../types";
import INITIAL_ICONS from "../data/InitialIcons";

export default function useDesktopIconManager() {
  const [icons, setIcons] = useState<DesktopIconData[]>(INITIAL_ICONS);


  const updateIconPosition = (id: string, pos: Position) => {
    setIcons(prev => prev.map(icon =>
      icon.id === id ? { ...icon, position: pos } : icon
    ));
  };

  return {
    icons,
    updateIconPosition,
  };
};