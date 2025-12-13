import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

export default function Experience() {
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
    const pixelCount = 120;

    for (let i = 0; i < pixelCount; i++) {
      pixels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.45 + 0.2,
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
      id="experience"
      className={styles.experience}
      ref={sectionRef}
    >
      {/* Pixel Background */}
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <h2 className={styles.heading}>Experience</h2>

      <div className={styles.grid}>
        {/* Taiwan Internship */}
        <div className={styles.card}>
          <div className={styles.date}>Oct 2025 – Dec 2025 (2 months)</div>
          <h3 className={styles.title}>
            Research Intern @ Providence University, Taiwan
          </h3>
          <p className={styles.desc}>
            Worked on a pneumonia detection research project using deep learning
            and computer vision. Focused on improving model accuracy and
            integrating Grad-CAM visualizations for explainability.
          </p>
        </div>

        {/* Zettaone Internship */}
        <div className={styles.card}>
          <div className={styles.date}>July 2025 (1 month)</div>
          <h3 className={styles.title}>
            Intern @ Zettaone Technologies
          </h3>
          <p className={styles.desc}>
            Worked on real world AI applications and learned production-level
            development practices.
          </p>
        </div>

        {/* Student Projects */}
        <div className={styles.card}>
          <div className={styles.date}>2025 – 2027</div>
          <h3 className={styles.title}>Student Research & Projects</h3>
          <p className={styles.desc}>
            Built Climora, Periodontal AI Detector, and other intelligent tools
            using AI and full-stack development, focusing on real world impact
            and clean interfaces.
          </p>
        </div>
      </div>

      {/* Education Section */}
      <h2 className={styles.heading}>Education</h2>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3 className={styles.title}>
            CSE (Artificial Intelligence & Machine Learning)
          </h3>
          <p className={styles.desc}>
            KPR Institute of Engineering and Technology
          </p>

          <div className={styles.eduRow}>
            <span className={styles.date}>2023 – 2027</span>
            <span className={styles.location}>
              Coimbatore, Tamil Nadu
            </span>
          </div>
        </div>

        <div className={styles.card}>
          <h3 className={styles.title}>
            Central Board of Secondary Education
          </h3>
          <p className={styles.desc}>
            Sri Vijay Vidyashram CBSE School
          </p>

          <div className={styles.eduRow}>
            <span className={styles.date}>2011 – 2023</span>
            <span className={styles.location}>
              Dharmapuri, Tamil Nadu
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
