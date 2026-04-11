import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaReact } from 'react-icons/fa';
import { SiOpencv, SiAngular } from 'react-icons/si';
import styles from './Projects.module.css';

import clomoraImg from '../assets/Climora.png';
import morpheusImg from '../assets/Morpheus.png';
import portImg from '../assets/port.png';
import voiceImg from '../assets/voice.png';
import visyreImg from '../assets/visyre.png';

const projects = [
  {
    id: 1,
    number: '01',
    title: 'Morpheus',
    type: 'AI · 3D Generation',
    tech: ['React', 'FastAPI', 'Claude API', 'Blender bpy'],
    github: 'https://github.com/SACHHH05/Morpheus',
    cover: morpheusImg,
  },
  {
    id: 2,
    number: '02',
    title: 'Voice Transcription',
    type: 'AI · Speech',
    tech: ['Angular', 'Python', 'faster-whisper', 'Silero VAD'],
    github: 'https://github.com/SACHHH05/Speech-to-text',
    cover: voiceImg,
  },
  {
    id: 3,
    number: '03',
    title: 'Climora',
    type: 'Mobile · Weather',
    tech: ['React Native', 'Flask'],
    github: 'https://github.com/SACHHH05/CLIMORA',
    cover: clomoraImg,
  },
  {
    id: 4,
    number: '04',
    title: 'VISYRE',
    type: 'CV · OCR',
    tech: ['Python', 'OpenCV', 'EasyOCR'],
    github: 'https://github.com/SACHHH05/Visyre',
    cover: visyreImg,
  },
  {
    id: 5,
    number: '05',
    title: 'Portfolio',
    type: 'Web · Design',
    tech: ['React', 'GSAP', 'Vite'],
    github: 'https://github.com/SACHHH05/my-portfolio',
    cover: portImg,
  },
];

const PANEL_W = 440;
const PANEL_H = 290;
const OFFSET = 20;

export default function Projects() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const leaveTimer = useRef(null);

  // Pixel background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = sectionRef.current.offsetWidth;
      canvas.height = sectionRef.current.offsetHeight;
    };
    resize();
    const pixels = [];
    for (let i = 0; i < 140; i++) {
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
        p.y -= p.speed; p.x += p.dx;
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
    return () => { cancelAnimationFrame(anim); window.removeEventListener('resize', resize); };
  }, []);

  const handleMouseMove = (e) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const x = e.clientX + OFFSET + PANEL_W > vw
      ? e.clientX - PANEL_W - OFFSET
      : e.clientX + OFFSET;
    const y = e.clientY + OFFSET + PANEL_H > vh
      ? e.clientY - PANEL_H - OFFSET
      : e.clientY + OFFSET;
    setPos({ x, y });
  };

  const handleEnter = (index, e) => {
    clearTimeout(leaveTimer.current);
    setHovered(index);
    setVisible(true);
    handleMouseMove(e);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setVisible(false), 150);
  };

  const project = hovered !== null ? projects[hovered] : null;
  const ghostNum = hovered !== null ? projects[hovered].number : projects[0].number;

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <div className={styles.inner}>
        <h2 className={styles.heading}>Projects</h2>

        {/* Ghost number watermark */}
        <div className={styles.ghostNumber} key={ghostNum}>
          {ghostNum}
        </div>

        <div className={styles.list}>
          {/* header row */}
          <div className={styles.listHeader}>
            <span>No.</span>
            <span>Project</span>
            <span className={styles.headerRight}>Stack</span>
          </div>

          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.row} ${hovered === i ? styles.rowActive : ''}`}
              onMouseEnter={(e) => handleEnter(i, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleLeave}
            >
              <span className={styles.rowNum}>{p.number}</span>

              <div className={styles.rowCenter}>
                <span className={styles.rowTitle}>{p.title}</span>
                <span className={styles.rowType}>{p.type}</span>
              </div>

              <div className={styles.rowRight}>
                <div className={`${styles.techRow} ${hovered === i ? styles.techVisible : ''}`}>
                  {p.tech.map(t => (
                    <span key={t} className={styles.techPill}>{t}</span>
                  ))}
                </div>
                <FaGithub className={styles.rowArrow} />
              </div>
            </a>
          ))}

          {/* More button */}
          <div className={styles.moreWrap}>
            <a
              href="https://github.com/SACHHH05?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moreBtn}
            >
              <span className={styles.moreBtnText}>More</span>
              <span className={styles.moreBtnArrow}>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cursor-following image panel */}
      {project && (
        <div
          className={`${styles.panel} ${visible ? styles.panelVisible : ''}`}
          style={{ left: pos.x, top: pos.y }}
        >
          <img
            key={project.id}
            src={project.cover}
            alt={project.title}
            className={styles.panelImg}
          />
          <div className={styles.panelLabel}>
            <span className={styles.panelTitle}>{project.title}</span>
            <span className={styles.panelType}>{project.type}</span>
          </div>
        </div>
      )}
    </section>
  );
}