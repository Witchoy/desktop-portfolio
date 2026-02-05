import type { FC } from 'react';
import './AboutMe.scss';
import profilePicture from '../../../public/profile.jpg';

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = () => {
  return (
    <div className="about-me">
      <img 
        src={profilePicture}
        className="about-me-profile"
        />
      <div className="about-me-container">
        <h1 className="about-me-name">Jules Goy</h1>
        <h2 className="about-me-title">Junior Software Developper</h2>
        <p className="about-me-paragraph">Oui oui baguette</p>
      </div>
    </div>
  );
};

export default AboutMe;


