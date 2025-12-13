import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const nameRef = useRef(null);
  const imRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const pixels = [];
    const pixelCount = 160;

    for (let i = 0; i < pixelCount; i++) {
      pixels.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.5,
        speed: Math.random() * 0.4 + 0.2,
        alpha: Math.random() * 0.6 + 0.25,
        dx: (Math.random() - 0.5) * 0.25,
      });
    }

    let animationId;
    function animatePixels() {
      ctx.clearRect(0, 0, width, height);

      pixels.forEach(p => {
        p.y -= p.speed;
        p.x += p.dx;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animationId = requestAnimationFrame(animatePixels);
    }

    animatePixels();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const paragraph = aboutRef.current.querySelector('p');

    gsap.fromTo(
      paragraph,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
      }
    );

    const name = nameRef.current;
    const im = imRef.current;

    const nameEnter = () => {
      gsap.to(name, {
        y: -10,
        scale: 1.08,
        letterSpacing: '0.12em',
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const nameLeave = () => {
      gsap.to(name, {
        y: 0,
        scale: 1,
        letterSpacing: '0em',
        duration: 0.4,
        ease: 'power3.out',
      });
    };


    const imEnter = () => {
      gsap.to(im, {
        y: -4,
        opacity: 0.85,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const imLeave = () => {
      gsap.to(im, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    name.addEventListener('mouseenter', nameEnter);
    name.addEventListener('mouseleave', nameLeave);
    im.addEventListener('mouseenter', imEnter);
    im.addEventListener('mouseleave', imLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      name.removeEventListener('mouseenter', nameEnter);
      name.removeEventListener('mouseleave', nameLeave);
      im.removeEventListener('mouseenter', imEnter);
      im.removeEventListener('mouseleave', imLeave);
    };
  }, []);

  return (
    <section id="about" className={styles.about} ref={aboutRef}>
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <div className={styles.wrapper}>
        <h2 className={styles.title}>
          <span ref={imRef} className={styles.im}>I’m</span>{' '}
          <span ref={nameRef} className={styles.highlight}>Sachiin</span>
        </h2>

        <div className={styles.content}>
          <p className={styles.description}>
            I love turning ideas into smart, simple, and impactful digital experiences. 
            I’m currently an undergraduate specializing in Artificial Intelligence and Machine Learning at KPRIET, Coimbatore, 
            with a strong interest in machine learning and its real world applications through software development. 
            I enjoy working where logic meets creativity building clean, reliable systems and thoughtful user experiences. 
            While my primary focus is machine learning, I’m also curious about the intersection of AI and gaming and hope to explore it further when the right opportunity comes along. 
            Outside of technology, I enjoy traveling, discovering new places, and gaining fresh perspectives that continuously inspire how I think and build.
          </p>
        </div>
      </div>
    </section>
  );
}
