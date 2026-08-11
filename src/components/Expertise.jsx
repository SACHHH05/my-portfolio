import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import styles from './Expertise.module.css';
import Reveal from './Reveal';

function wrap(min, max, v) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const lines = [
  { text: 'PYTHON  ✦  PYTORCH  ✦  REACT  ✦  FASTAPI  ✦  COMPUTER VISION  ✦  ', speed: 40, tier: 'big' },
  { text: 'TensorFlow · YOLOv8 · OpenCV · Docker · MCP · JavaScript · ', speed: 26, tier: 'medium' },
  { text: 'FLASK  ✦  SCIKIT-LEARN  ✦  GIT  ✦  BLENDER  ✦  MYSQL  ✦  MONGODB  ✦  REACT NATIVE  ✦  ', speed: 52, tier: 'small' },
];

// Tracks scroll direction: +1 while scrolling down, -1 while scrolling up.
// Keeps its last value when the page isn't actively scrolling, so the
// marquee never just stops — it always keeps drifting one way or the other.
function useScrollDirection() {
  const directionRef = useRef(1);
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 0.5) {
        directionRef.current = delta > 0 ? 1 : -1;
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return directionRef;
}

function TickerLine({ text, speed, tier, directionRef }) {
  const measureRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (measureRef.current) setWidth(measureRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [text]);

  useAnimationFrame((t, delta) => {
    if (!width) return;
    const dir = directionRef.current;
    const move = (speed * dir * delta) / 300; // px per frame, direction-aware
    const next = wrap(-width, 0, x.get() - move);
    x.set(next);
  });

  return (
    <div className={`${styles.rowWrap} ${styles[tier]}`}>
      <motion.div className={styles.rowTrack} style={{ x }}>
        <span className={styles.rowItem} ref={measureRef}>{text}</span>
        <span className={styles.rowItem} aria-hidden="true">{text}</span>
        <span className={styles.rowItem} aria-hidden="true">{text}</span>
      </motion.div>
    </div>
  );
}

export default function Expertise() {
  const directionRef = useScrollDirection();

  return (
    <section id="expertise" className={styles.expertise}>
      <Reveal>
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>
            CORE <span className={styles.headingItalic}>STACK</span>
          </h2>
        </div>
      </Reveal>

      <div className={styles.wall}>
        {lines.map((line) => (
          <TickerLine
            key={line.text}
            text={line.text}
            speed={line.speed}
            tier={line.tier}
            directionRef={directionRef}
          />
        ))}
      </div>
    </section>
  );
}