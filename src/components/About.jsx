import { useEffect, useRef } from 'react';
import styles from './About.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const elements = aboutRef.current.querySelectorAll('p');

    // Animate text
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
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

    // Animate image
    gsap.fromTo(
      imgRef.current,
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
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

        <div className={styles.content}>
          {/* Text on left */}
          <div className={styles.text}>
             <p className={styles.description}>
            Hey! I’m Sachiin, I love turning ideas into smart, simple, and impactful digital experiences.
        </p>

        <p className={styles.description}>
          I’m currently an undergraduate student specializing in Artificial Intelligence and Machine Learning at KPRIET, Coimbatore. I’m passionate about software development and using machine learning to create real-world, impactful solutions.
        </p>

        <p className={styles.description}>
          I thrive where logic meets creativity from crafting clean user experiences to solving complex backend challenges.
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

          {/* Image on right */}
          <div className={styles.imageContainer} ref={imgRef}>
            <img
              src="/sachhh.jpg" // Replace with your actual image path
              alt="Sachiin Megarajan"
              className={styles.profileImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
