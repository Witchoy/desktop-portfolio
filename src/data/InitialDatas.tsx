import type { DesktopIconData, ProjectData, WindowData } from "../types";
import aboutMeIcon from '../assets/icons/about_me.svg';
import projectsIcon from '../assets/icons/projects.svg'
import strIcon from '../assets/projects/str.png';
import t3Icon from '../assets/projects/t3.png';
import wimusicIcon from '../assets/projects/wimusic.png';
import AboutMe from "../components/AboutMe/AboutMe";
import Projects from "../components/Projects/Projects";


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
    content: <Projects />,
    customClass: 'content-background',
    position: { x: 250, 
                y: 50 },
    zIndex: 1,
    size: { width: 900, height: 600 },
    minSize: { width: 300, height: 200 },
  }
];

const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: 'str',
    title: 'StrasTaRoute',
    description: 'StrasTaRoute Is a web application designed to help users to manage and plan public events. It allows users to create, manage and follow events with advanced mapping features, security equipment management and team coordination tools.',
    image: strIcon,
    technologies: ['Angular', 'Nest', 'ReactNative', 'Prisma', 'PostgreSQL', 'Git']
  },
  {
    id: 't3',
    title: 'Torrington',
    description: 'Torrington is a serious game designed to simulate the process of selecting academic programs at a university. The game challenges players to evaluate academic proposals while managing their score and budget.',
    image: t3Icon,
    technologies: ['Godot', 'C#', 'Git']
  },
  {
    id: 'wimusic-api',
    title: 'WiMusic API',
    description: 'WiMusic API is a RESTful API designed to manage music playlists and tracks. It allows users to create, read, update and delete playlists and tracks.',
    image: wimusicIcon,
    technologies: ['Node.js', 'Express', 'MongoDB', 'Git']
  }
];

export { INITIAL_WINDOWS, INITIAL_ICONS, INITIAL_PROJECTS };
