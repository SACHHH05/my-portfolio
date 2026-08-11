import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const scriptRef = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = [badgeRef.current, line1Ref.current, scriptRef.current, line2Ref.current, line3Ref.current].filter(Boolean);
      if (targets.length === 0) return;

      // Safety net: whatever happens below, force everything visible after a beat
      // so a StrictMode double-effect or a GSAP hiccup can never leave the hero blank.
      gsap.set(targets, { clearProps: 'opacity,transform', delay: 3 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          line1Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.2'
        )
        .fromTo(
          scriptRef.current,
          { opacity: 0, y: 30, rotate: -3 },
          { opacity: 1, y: 0, rotate: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          line3Ref.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        );

      // subtle parallax drift as the user scrolls away
      gsap.to(heroRef.current.querySelector(`.${styles.content}`), {
        yPercent: -12,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className={styles.hero}>
      <div className={styles.content}>
        <div ref={badgeRef} className={styles.badge}>
          <span className={styles.dot} />
          <span className={styles.badgeText}>
            OPEN TO WORK · AI ENGINEER &amp; ML RESEARCHER
          </span>
        </div>

        <h1 className={styles.headline}>
          <span ref={line1Ref} className={styles.line}>
            I BUILD
          </span>
          <span ref={scriptRef} className={styles.script}>
            intelligent systems
          </span>
          <span ref={line2Ref} className={styles.lineIndent}>
            OUT OF REAL
          </span>
          <span ref={line3Ref} className={styles.line}>
            WORLD PROBLEMS<span className={styles.dotAccent} />
          </span>
        </h1>
      </div>
    </section>
  );
}