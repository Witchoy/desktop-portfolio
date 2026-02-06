import type { FC } from 'react';
import './ProjectsCards.scss';
import type { ProjectData } from '../../types';

interface ProjectsCardsProps {
  project: ProjectData;
}

const ProjectsCards: FC<ProjectsCardsProps> = ({ project }) => {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} className="project-card-image" />
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">{project.description}</p>
      </div>
      <div className="project-card-technologies">
        {project.technologies.map((tech, index) => (
          <span key={index} className="project-card-technology">{tech}</span>
        ))}
      </div>
    </div>
  )
};

export default ProjectsCards;
