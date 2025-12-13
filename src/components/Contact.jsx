import { useEffect, useRef } from 'react';
import styles from './Contact.module.css';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Contact() {
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
    const pixelCount = 90;

    for (let i = 0; i < pixelCount; i++) {
      pixels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
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
      id="contact"
      className={styles.contact}
      ref={sectionRef}
    >
      {/* Pixel Background */}
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <h2 className={styles.heading}>Contact me on</h2>

      <div className={styles.links}>
        <a
          href="mailto:sachiin051@gmail.com"
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className={styles.icon} />
          Email Me
        </a>

        <a
          href="https://www.linkedin.com/in/sachiin-megarajan/"
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className={styles.icon} />
          LinkedIn
        </a>

        <a
          href="https://github.com/SACHHH05"
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className={styles.icon} />
          GitHub
        </a>
      </div>
    </section>
  );
}
