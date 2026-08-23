import { useEffect, useRef, useState } from 'react';
import styles from './Experience.module.css';
import Reveal from './Reveal';

const experiences = [
  {
    date: 'Feb 2026 – Jul 2026',
    duration: '6 months',
    role: 'Project Intern',
    company: 'Payoda',
    desc: 'Built a complete e-commerce backend with FastAPI, and a WebSocket-based real-time speech transcription pipeline using faster-whisper at zero API cost. Architected a multi-agent AI system optimizing LLM token usage across distributed workflows, plus Playwright automation for internal testing tools.',
  },
  {
    date: 'Oct 2025 – Nov 2025',
    duration: '2 months',
    role: 'Research Intern',
    company: 'Providence University, Taiwan',
    desc: 'Trained a CNN-based pneumonia classifier on 7,750 chest X-ray images — 92.44% accuracy, 0.94 F1-score. Integrated Grad-CAM heatmaps for interpretable diagnostics and generated automated PDF medical reports. Published the work at an All India AI seminar.',
  },
  {
    date: 'Jul 2025',
    duration: '1 months',
    role: 'Software Developer Intern',
    company: 'Zettaone Technologies',
    desc: 'Built a YOLOv8 + EasyOCR pipeline for real-time PCB defect detection in production. Shipped VISYRE (React Native + Flask) for OCR/barcode scanning, and Climora, a cross-platform weather + soil insights app.',
  },
  {
    date: '2025 – Present',
    duration: 'Ongoing',
    role: 'Independent Research & Projects',
    company: 'Self-directed',
    desc: 'Morpheus — an MCP server letting a local LLM control Blender via natural language. VoiceScript — self-hosted real-time speech transcription with sub-second latency.',
  },
];

const education = {
  date: '2023 – 2027',
  degree: 'B.E — Computer Science & Engineering (AI & ML)',
  school: 'KPR Institute of Engineering and Technology',
  location: 'Coimbatore, Tamil Nadu',
};

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
        ctx.fillStyle = `rgba(26,26,22,${p.alpha * 0.4})`;
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

      <Reveal>
          <div className={styles.headingRow}>
            <h2 className={styles.heading}>Experience</h2>
            <span className={styles.headingRange}>( 2025 — Present )</span>
          </div>
        </Reveal>

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
              <p className={styles.entryDesc}>{e.desc}</p>
            </>
          )}
        />

        <Reveal>
          <div className={`${styles.headingRow} ${styles.headingRowEdu}`}>
            <h2 className={styles.heading}>Education</h2>
            <span className={styles.headingRange}>( {education.date} )</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.eduBlock}>
            <h3 className={styles.eduDegree}>{education.degree}</h3>
            <span className={styles.eduSchool}>
              {education.school}, {education.location}
            </span>
          </div>
        </Reveal>

    </section>
  );
}