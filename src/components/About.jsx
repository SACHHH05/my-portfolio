import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const elements = aboutRef.current.querySelectorAll('p');

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section id="about" className={styles.about} ref={aboutRef}>
      <div className={styles.wrapper}>
        <h2 className={styles.fullname}>Sachiin Megarajan</h2>

        <p className={styles.description}>
            Hey! I’m Sachiin, I love turning ideas into smart, simple, and impactful digital experiences.
        </p>

        <p className={styles.description}>
          I’m currently an undergraduate student specializing in Artificial Intelligence and Machine Learning at KPRIET, Coimbatore. I’m passionate about software development and using machine learning to create real-world, impactful solutions.
        </p>

        <p className={styles.description}>
          I thrive where logic meets creativityfrom crafting clean user experiences to solving complex backend challenges.
        </p>

        <p className={styles.description}>
          You can find my projects here and experiments here. Recently, I’ve been working on weather-driven apps, AI-powered insights, and sharpening my full-stack skills.
        </p>

        <p className={styles.description}>
          Outside the screen, I enjoy quiet reflection, discovering new music, and finding joy in the little wins.
        </p>

        <p className={styles.description}>
          Let’s connect if you're into AI, software engineering, or just love building cool things with great people.
        </p>
      </div>
    </section>
  );
}
