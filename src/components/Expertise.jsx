import { useEffect, useRef } from 'react';
import styles from './Expertise.module.css';
import {
  FaPython, FaJava, FaJs, FaReact, FaDocker, FaGitAlt, FaCode
} from 'react-icons/fa';
import {
  SiFlask, SiScikitlearn, SiOpencv, SiMongodb, SiMysql,
  SiTensorflow, SiFastapi, SiPytorch, SiAngular,
  SiBlender, SiStreamlit
} from 'react-icons/si';

export default function Expertise() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = sectionRef.current.offsetWidth;
      canvas.height = sectionRef.current.offsetHeight;
    };
    resize();
    const pixels = [];
    for (let i = 0; i < 110; i++) {
      pixels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.4 + 0.15,
        dx: (Math.random() - 0.5) * 0.2,
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

  return (
    <section id="expertise" className={styles.expertise} ref={sectionRef}>
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <h2 className={styles.heading}>Expertise</h2>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Languages</h3>
        <div className={styles.row}>
          <Skill label="Python"     icon={<FaPython />} />
          <Skill label="JavaScript" icon={<FaJs />} />
          <Skill label="Java"       icon={<FaJava />} />
          <Skill label="SQL"        icon={<SiMysql />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Frameworks & Libraries</h3>
        <div className={styles.row}>
          <Skill label="React"           icon={<FaReact />} />
          <Skill label="React Native"    icon={<FaReact />} />
          <Skill label="FastAPI"         icon={<SiFastapi />} />
          <Skill label="Flask"           icon={<SiFlask />} />
          <Skill label="Angular"         icon={<SiAngular />} />
          <Skill label="PyTorch"         icon={<SiPytorch />} />
          <Skill label="TensorFlow"      icon={<SiTensorflow />} />
          <Skill label="Scikit-learn"    icon={<SiScikitlearn />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>ML / CV</h3>
        <div className={styles.row}>
          <Skill label="OpenCV"          icon={<SiOpencv />} />
          <Skill label="YOLOv8"          icon={<FaCode />} />
          <Skill label="Grad-CAM"        icon={<FaCode />} />
          <Skill label="faster-whisper"  icon={<FaCode />} />
          <Skill label="Silero VAD"      icon={<FaCode />} />
          <Skill label="EasyOCR"         icon={<SiOpencv />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Tools</h3>
        <div className={styles.row}>
          <Skill label="Git"       icon={<FaGitAlt />} />
          <Skill label="Docker"    icon={<FaDocker />} />
          <Skill label="Blender"   icon={<SiBlender />} />
          <Skill label="Streamlit" icon={<SiStreamlit />} />
          <Skill label="Ollama"    icon={<FaCode />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Databases</h3>
        <div className={styles.row}>
          <Skill label="MySQL"   icon={<SiMysql />} />
          <Skill label="MongoDB" icon={<SiMongodb />} />
        </div>
      </div>

    </section>
  );
}

function Skill({ label, icon }) {
  return (
    <div className={styles.skillItem}>
      <span className={styles.icon}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}