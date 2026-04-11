import { useEffect, useRef, useState } from 'react';
import styles from './Experience.module.css';

const experiences = [
  {
    date: 'Oct 2025 – Dec 2025',
    duration: '2 months',
    role: 'Research Intern',
    company: 'Providence University, Taiwan',
    desc: 'Worked on a pneumonia detection research project using deep learning and computer vision. Focused on improving model accuracy and integrating Grad-CAM visualizations for explainability.',
  },
  {
    date: 'July 2025',
    duration: '1 month',
    role: 'Intern',
    company: 'Zettaone Technologies',
    desc: 'Worked on real-world AI applications — built Climora (weather + soil insights), VISYRE (OCR pipeline), and other production-level tools.',
  },
  {
    date: '2024 – Present',
    duration: 'Ongoing',
    role: 'Research & Projects',
    company: 'Independent',
    desc: 'Morpheus — AI-powered Blender scene generator (React + FastAPI + Claude API). Real-time Voice Transcription engine using faster-whisper + Silero VAD. Pneumonia detection research with Grad-CAM explainability.',
  },
];

const education = [
  {
    date: '2023 – 2027',
    degree: 'B.E — CSE (AI & ML)',
    school: 'KPR Institute of Engineering and Technology',
    location: 'Coimbatore, Tamil Nadu',
  },
  {
    date: '2011 – 2023',
    degree: 'CBSE — Secondary Education',
    school: 'Sri Vijay Vidyashram CBSE School',
    location: 'Dharmapuri, Tamil Nadu',
  },
];

function Timeline({ items, renderLeft, renderRight }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef([]);
  const dotTrackRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      let closest = 0;
      let closestDist = Infinity;

      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - vh / 2);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActiveIndex(closest);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Move dot to active row
  const getDotTop = () => {
    const el = rowRefs.current[activeIndex];
    const track = dotTrackRef.current;
    if (!el || !track) return 0;
    const elRect = el.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    return elRect.top - trackRect.top + elRect.height / 2 - 8;
  };

  const [dotTop, setDotTop] = useState(0);

  useEffect(() => {
    const update = () => setDotTop(getDotTop());
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [activeIndex]);

  return (
    <div className={styles.timeline}>
      {/* Vertical line + moving dot */}
      <div className={styles.lineTrack} ref={dotTrackRef}>
        <div className={styles.timelineLine} />
        <div
          className={styles.activeDot}
          style={{ top: dotTop }}
        />
      </div>

      {/* Rows */}
      <div className={styles.rows}>
        {items.map((item, i) => (
          <div
            key={i}
            ref={el => rowRefs.current[i] = el}
            className={`${styles.entry} ${activeIndex === i ? styles.entryActive : ''}`}
          >
            <div className={styles.entryLeft}>
              {renderLeft(item)}
            </div>
            <div className={styles.entryRight}>
              {renderRight(item, activeIndex === i)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
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
    for (let i = 0; i < 120; i++) {
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
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <canvas ref={canvasRef} className={styles.pixelCanvas} />

      <div className={styles.inner}>

        <h2 className={styles.heading}>Experience</h2>

        <Timeline
          items={experiences}
          renderLeft={(e) => (
            <>
              <span className={styles.entryDate}>{e.date}</span>
              <span className={styles.entryDuration}>{e.duration}</span>
            </>
          )}
          renderRight={(e, active) => (
            <>
              <span className={styles.entryRole}>{e.role}</span>
              <span className={styles.entryCompany}>{e.company}</span>
              {active && <p className={styles.entryDesc}>{e.desc}</p>}
            </>
          )}
        />

        <h2 className={`${styles.heading} ${styles.headingEdu}`}>Education</h2>

        <Timeline
          items={education}
          renderLeft={(e) => (
            <>
              <span className={styles.entryDate}>{e.date}</span>
              <span className={styles.entryDuration}>{e.location}</span>
            </>
          )}
          renderRight={(e, active) => (
            <>
              <span className={styles.entryRole}>{e.degree}</span>
              <span className={styles.entryCompany}>{e.school}</span>
            </>
          )}
        />

      </div>
    </section>
  );
}