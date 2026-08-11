import { useRef } from 'react';
import styles from './About.module.css';
import Reveal from './Reveal';

export default function About() {
  const aboutRef = useRef(null);

  return (
    <section id="about" className={styles.about} ref={aboutRef}>
      <div className={styles.wrapper}>

        <Reveal>
          <div className={styles.labelRow}>
            <span className={styles.bullet}>◆</span>
            <span className={styles.label}>Building, as I see it</span>
            <span className={styles.spark}>✦</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.quote}>
            The more I build, the more I realize good engineering isn't
            about clever code — it's about systems people can actually
            trust. Every model, every pipeline, every screen asks someone
            to rely on it. I never take that lightly.
          </p>
        </Reveal>

        <div className={styles.plusMark}>✦</div>

      </div>
    </section>
  );
}