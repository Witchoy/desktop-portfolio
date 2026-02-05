import AboutMe from "../components/AboutMe/AboutMe";
import type { WindowData } from "../types";

const INITIAL_WINDOWS: WindowData[] = [
  {
    id: 'about-me',
    title: 'About Me',
    content: <AboutMe />,
    position: { x: window.innerWidth / 2, 
                y: window.innerHeight / 2 },
    zIndex: 1,
  },
  {
    id: 'projects',
    title: 'Projects',
    content: <div>Projects content goes here</div>,
    position: { x: window.innerWidth / 2, 
                y: window.innerHeight / 2 },
    zIndex: 1,
  }
];

export default INITIAL_WINDOWS;
