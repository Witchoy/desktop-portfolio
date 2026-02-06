import { useState, type FC } from 'react';
import './Projects.scss';
import type { ProjectData } from '../../types';
import ProjectsCards from '../ProjectsCards/ProjectsCards';
import { INITIAL_PROJECTS } from '../../data/InitialDatas';

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {
  const [projects, setProjects] = useState<ProjectData[]>(INITIAL_PROJECTS);
  
  return (
    <div className="projects">
      <div className="projects-header">
        <h2 className="projects-header-title">Projects</h2>
      </div>
      <div className="projects-cards-list">
        {projects.map((project) => (
          <ProjectsCards project={project} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
