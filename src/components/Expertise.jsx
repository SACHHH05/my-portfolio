import { useEffect, useRef } from 'react';
import styles from './Expertise.module.css';
import { FaPython, FaJava, FaJs, FaCode } from 'react-icons/fa';
import {
  SiFlask,
  SiScikitlearn,
  SiOpencv,
  SiMongodb,
  SiMysql,
  SiTensorflow
} from 'react-icons/si';

export default function Expertise() {
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
    const pixelCount = 110;

    for (let i = 0; i < pixelCount; i++) {
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
    <section
      id="expertise"
      className={styles.expertise}
      ref={sectionRef}
    >
      {/* Pixel Background */}
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <h2 className={styles.heading}>Expertise</h2>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Languages</h3>
        <div className={styles.row}>
          <Skill label="Python" icon={<FaPython />} />
          <Skill label="Java" icon={<FaJava />} />
          <Skill label="JavaScript" icon={<FaJs />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Frameworks & Libraries</h3>
        <div className={styles.row}>
          <Skill label="Flask" icon={<SiFlask />} />
          <Skill label="Scikit-learn" icon={<SiScikitlearn />} />
          <Skill label="OpenCV" icon={<SiOpencv />} />
          <Skill label="YOLOv8" icon={<FaCode />} />
          <Skill label="TensorFlow / PyTorch" icon={<SiTensorflow />} />
        </div>
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Database</h3>
        <div className={styles.row}>
          <Skill label="MySQL" icon={<SiMysql />} />
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
