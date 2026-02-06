import AboutMe from "../components/AboutMe/AboutMe";
import type { WindowData } from "../types";

const INITIAL_WINDOWS: WindowData[] = [
  {
    id: 'about-me',
    title: 'About Me',
    content: <AboutMe />,
    customClass: 'content-background',
    position: { x: 250, 
                y: 50 },
    zIndex: 1,
    size: { width: 900, height: 600 },
    minSize: { width: 300, height: 200 },
  },
  {
    id: 'projects',
    title: 'Projects',
    content: <div>Projects content goes here</div>,
    position: { x: window.innerWidth / 2, 
                y: window.innerHeight / 2 },
    zIndex: 1,
    size: { width: 900, height: 600 },
    minSize: { width: 300, height: 200 },
  }
];

export default INITIAL_WINDOWS;
