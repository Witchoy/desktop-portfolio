import { useState } from "react";
import aboutMeIcon from '../assets/img/about_me.svg';
import projectsIcon from '../assets/img/projects.svg';
import type { Position, DesktopIconData } from "../types";

// Define initial icons outside the hook to prevent recreation
const INITIAL_ICONS: DesktopIconData[] = [
  {
    id: 'about-me',
    icon: aboutMeIcon,
    title: 'About Me',
    position: { x: 50, y: 50 },
  },
  {
    id: 'projects',
    icon: projectsIcon,
    title: 'Projects',
    position: { x: 50, y: 150 },
  }
];

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