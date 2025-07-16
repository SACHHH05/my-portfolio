import styles from './Projects.module.css';
import { FaPython, FaReact, FaUserAlt } from 'react-icons/fa';
import { SiFlask, SiOpencv, SiScikitlearn } from 'react-icons/si';

const projects = [
  {
    title: "Periodontal Disease Detector",
    description: "AI tool that detects early-stage gum disease using image classification.",
    icon: <FaPython />,
    github: "https://github.com/SACHHH05/Periodontal-Disease-Prediction",
  },
  {
    title: "Climora",
    description: "Weather + soil insights with Flask and React Native.",
    icon: <FaReact />,
    github: "https://github.com/SACHHH05/CLIMORA",
  },
  {
    title: "AI Disease Detector",
    description: "Predicts diseases based on symptoms using ML models.",
    icon: <SiScikitlearn />,
    github: "https://github.com/SACHHH05/AI-Disease-Detector",
  },
  {
    title: "Colour Detection",
    description: "Detects colors using OpenCV and Python.",
    icon: <SiOpencv />,
    github: "https://github.com/SACHHH05/Colour-Detection-",
  },
  {
    title: "SMS Spam Classifier",
    description: "Classifies texts as spam/ham using NLP.",
    icon: <FaPython />,
    github: "https://github.com/SACHHH05/RD-INFRO-TECHNOLOY",
  },
  {
    title: "Email Fraud Detection",
    description: "Detects fraud/phishing emails using ML models.",
    icon: <SiScikitlearn />,
    github: "https://github.com/SACHHH05/Fraud-Email-Detection",
  },
  {
    title: "Portfolio",
    description: "The website you're seeing! Built with React, GSAP & Vite, deployed on Vercel.",
    icon: <FaReact/>,
    github: "https://github.com/SACHHH05/my-portfolio", 
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <h2 className={styles.heading}>Projects</h2>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkWrapper}
          >
            <div className={styles.flipCard}>
              <div className={styles.flipInner}>
                {/* Front side */}
                <div className={styles.flipFront}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                </div>
                {/* Back side */}
                <div className={styles.flipBack}>
                  <div className={styles.icon}>{project.icon}</div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
