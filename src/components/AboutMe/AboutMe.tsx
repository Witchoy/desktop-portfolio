import type { FC } from 'react';
import './AboutMe.scss';
import profilePicture from '/profile.jpg';

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = () => {
  return (
    <div className="about-me">
      <div className="about-me-header">
        <img 
          src={profilePicture}
          className="about-me-header-profile"
        />
        <div className="about-me-header-container">
          <h1 className="about-me-header-name">Jules Goy</h1>
          <h2 className="about-me-header-title">Junior Software Developper</h2>
          <p className="about-me-header-paragraph">Hi! I'm Jules Goy, a French junior software developer. I'm passionate about video game development and Unix systems, and I also enjoy music, cinema, and comics.</p>
        </div>
      </div>
      <div className="about-me-body">
        <p>Hi! I'm Jules Goy, a French junior software developer. I'm passionate about video game development and Unix systems, and I also enjoy music, cinema, and comics.</p>
      </div>
    </div>
  );
};

export default AboutMe;


