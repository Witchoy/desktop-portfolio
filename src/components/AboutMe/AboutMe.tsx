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
        <p>I am a French software developer student in BUT Informatique, specializing in 'Réalisation d'applications : conception, développement, validation.' Throughout my studies, I have gained solid foundations in programming, web development, database management, system and network administration, and project management.</p>
        <p>My academic projects, such as Níðhöggr (TypeScript/Angular/Postgresql) and Torrington (C# with Godot, teamwork project), have allowed me to apply these skills in concrete contexts: from designing user interfaces and managing data to collaborating in a group and presenting results. These experiences, combined with personal projects like my WiMusic API (Node.js, TypeScript, Docker), have shaped my professional identity as a developer who values both technical quality and user experience.</p>
        <p>I am particularly interested in game development. I currently work with Unity and plan to explore Unreal Engine. Beyond coding, I draw inspiration from cinema, music, and comics, which nurture my creativity and curiosity.</p>
      </div>
    </div>
  );
};

export default AboutMe;


