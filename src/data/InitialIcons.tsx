import type { DesktopIconData } from "../types";
import aboutMeIcon from '../assets/icons/about_me.svg';
import projectsIcon from '../assets/icons/projects.svg'

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

export default INITIAL_ICONS;