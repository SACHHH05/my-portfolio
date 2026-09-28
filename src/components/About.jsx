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
            <span className={styles.label}>Hi, I'm Sachiin</span>
            <span className={styles.spark}>✦</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={styles.quote}>
            I'm a computer science student from Coimbatore, learning
            to build with AI. I love the whole journey of a project:
            teaching a model to see, giving it a backend to live in,
            and designing the screen where a person finally meets it.
            I've built tools that spot defects on circuit boards, read
            chest X-rays, turn speech into text as it's spoken, and
            let you talk to Blender in plain words. Each one taught me
            the same thing: it isn't finished when it runs. It's
            finished when someone can rely on it.
          </p>
        </Reveal>

        <div className={styles.plusMark}>✦</div>

      </div>
    </section>
  );
}