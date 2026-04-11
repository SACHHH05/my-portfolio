import { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaPython, FaReact, FaDocker, FaGitAlt, FaJava, FaJs
} from 'react-icons/fa';
import {
  SiFlask, SiScikitlearn, SiOpencv, SiMongodb, SiMysql,
  SiTensorflow, SiFastapi, SiPytorch, SiAngular,
  SiBlender, SiStreamlit
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const roles = ['AI Engineer', 'Full-stack Developer', 'ML Researcher', 'Builder'];

const marqueeIcons = [
  { icon: <FaPython />,     label: 'Python',      color: '#3776AB' },
  { icon: <FaReact />,      label: 'React',       color: '#61DAFB' },
  { icon: <SiFastapi />,    label: 'FastAPI',     color: '#009688' },
  { icon: <SiPytorch />,    label: 'PyTorch',     color: '#EE4C2C' },
  { icon: <SiBlender />,    label: 'Blender',     color: '#E87D0D' },
  { icon: <SiOpencv />,     label: 'OpenCV',      color: '#5C3EE8' },
  { icon: <SiTensorflow />, label: 'TensorFlow',  color: '#FF6F00' },
  { icon: <FaReact />,      label: 'React Native',color: '#61DAFB' },
  { icon: <SiFlask />,      label: 'Flask',       color: '#ffffff' },
  { icon: <SiAngular />,    label: 'Angular',     color: '#DD0031' },
  { icon: <FaDocker />,     label: 'Docker',      color: '#2496ED' },
  { icon: <SiScikitlearn />,label: 'Scikit-learn',color: '#F7931E' },
  { icon: <SiMysql />,      label: 'MySQL',       color: '#4479A1' },
  { icon: <SiMongodb />,    label: 'MongoDB',     color: '#47A248' },
  { icon: <FaGitAlt />,     label: 'Git',         color: '#F05032' },
  { icon: <SiStreamlit />,  label: 'Streamlit',   color: '#FF4B4B' },
];

export default function About() {
  const aboutRef = useRef(null);
  const nameRef = useRef(null);
  const canvasRef = useRef(null);
  const [roleText, setRoleText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  // Pixel canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = aboutRef.current.offsetWidth);
    let height = (canvas.height = aboutRef.current.offsetHeight);

    const pixels = [];
    for (let i = 0; i < 160; i++) {
      pixels.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1.5,
        speed: Math.random() * 0.4 + 0.2,
        alpha: Math.random() * 0.6 + 0.25,
        dx: (Math.random() - 0.5) * 0.25,
      });
    }

    let animId;
    const animatePixels = () => {
      ctx.clearRect(0, 0, width, height);
      pixels.forEach(p => {
        p.y -= p.speed; p.x += p.dx;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      animId = requestAnimationFrame(animatePixels);
    };
    animatePixels();

    const handleResize = () => {
      width = canvas.width = aboutRef.current.offsetWidth;
      height = canvas.height = aboutRef.current.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (typing) {
      if (roleText.length < current.length) {
        timeout = setTimeout(() => setRoleText(current.slice(0, roleText.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (roleText.length > 0) {
        timeout = setTimeout(() => setRoleText(roleText.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [roleText, typing, roleIndex]);

  // GSAP hover
  useEffect(() => {
    const paragraph = aboutRef.current.querySelector('p');
    gsap.fromTo(paragraph, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: aboutRef.current, start: 'top 80%' },
    });

    const name = nameRef.current;
    const nameEnter = () => gsap.to(name, { y: -10, scale: 1.08, letterSpacing: '0.12em', duration: 0.4, ease: 'power3.out' });
    const nameLeave = () => gsap.to(name, { y: 0, scale: 1, letterSpacing: '0em', duration: 0.4, ease: 'power3.out' });
    name.addEventListener('mouseenter', nameEnter);
    name.addEventListener('mouseleave', nameLeave);
    return () => {
      name.removeEventListener('mouseenter', nameEnter);
      name.removeEventListener('mouseleave', nameLeave);
    };
  }, []);

  return (
    <section id="about" className={styles.about} ref={aboutRef}>
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <div className={styles.wrapper}>

        {/* Split layout */}
        <div className={styles.split}>
          {/* LEFT */}
          <div className={styles.left}>
            <h2 className={styles.title} ref={nameRef}>Who am I?</h2>
            <div className={styles.roleWrap}>
              <span className={styles.roleText}>{roleText}</span>
              <span className={styles.cursor}>|</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.right}>
            <p className={styles.description}>
              Grew up in Dharmapuri, Tamil Nadu. It started with GTA Vice City, staying up
              late just to see what the machine could do. That fascination never left. I taught
              myself to code, fell deep into machine learning, and realised I could build things
              that actually think. Picked up web and mobile development along the way because
              ideas deserve a real interface. Interned in Taiwan doing medical AI research,
              shipped production tools at a startup, published a paper. Now I'm chasing the
              next frontier — building Morpheus, an AI that speaks directly to Blender.
              And somewhere down the line? Building a powerful game. Haven't started yet —
              but the hunger is very much there.
            </p>
          </div>
        </div>

        {/* Marquee */}
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className={styles.marqueeContent}>
                {marqueeIcons.map((item, i) => (
                  <span key={i} className={styles.marqueeItem} title={item.label}>
                    <span className={styles.marqueeIcon} style={{ color: item.color }}>{item.icon}</span>
                    <span className={styles.marqueeDot}>·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}