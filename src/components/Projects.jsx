import { useEffect, useRef } from 'react';
import styles from './Projects.module.css';
import { FaPython, FaReact, FaGithub } from 'react-icons/fa';
import { SiOpencv, SiScikitlearn } from 'react-icons/si';

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
    description: "The website you're seeing! Built with React, GSAP & Vite.",
    icon: <FaReact />,
    github: "https://github.com/SACHHH05/my-portfolio",
  },
  {
    title: "VISYRE",
    description: "Extracts text from images using OpenCV and EasyOCR.",
    icon: <SiOpencv />,
    github: "https://github.com/SACHHH05/Visyre",
  },
];

export default function Projects() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    /* ===== PIXEL BACKGROUND ===== */
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = sectionRef.current.offsetWidth;
      canvas.height = sectionRef.current.offsetHeight;
    };

    resize();

    const pixels = [];
    const pixelCount = 140;

    for (let i = 0; i < pixelCount; i++) {
      pixels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.4 + 0.2,
        alpha: Math.random() * 0.5 + 0.2,
        dx: (Math.random() - 0.5) * 0.25,
      });
    }

    let anim;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixels.forEach(p => {
        p.y -= p.speed;
        p.x += p.dx;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      anim = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      {/* Pixel Background */}
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

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
                <div className={styles.flipFront}>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                </div>

                <div className={styles.flipBack}>
                  <div className={styles.icon}>{project.icon}</div>
                  <div className={styles.githubIcon}>
                    <FaGithub />
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
