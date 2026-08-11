import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import Preloader from './components/Preloader';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [revealed, setRevealed] = useState(false);
  const [preloaderMounted, setPreloaderMounted] = useState(true);

  // Smooth scroll (Lenis), synced to GSAP's own ticker so ScrollTrigger-based
  // animations elsewhere in the site (Hero parallax, the rocket, etc.) stay
  // perfectly in step with the smoothed scroll position.
  useEffect(() => {
    if (!revealed) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [revealed]);

  useEffect(() => {
    const rocket = document.getElementById('rocket');

    if (rocket) {
      gsap.fromTo(
        rocket,
        {
          x: -100,
          y: 100,
          opacity: 0,
        },
        {
          x: window.innerWidth + 100,
          y: -100,
          opacity: 1,
          scrollTrigger: {
            trigger: '#about',
            start: 'top center',
            endTrigger: '#projects',
            end: 'top top',
            scrub: true,
          },
          ease: 'power2.out',
        }
      );
    }
  }, [revealed]);

  return (
    <>
      {preloaderMounted && (
        <Preloader
          onExitStart={() => setRevealed(true)}
          onExited={() => setPreloaderMounted(false)}
        />
      )}

      {revealed && (
        <>
          {/* 🌟 Main Sections */}
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Expertise />
          <Contact />
        </>
      )}
    </>
  );
}

export default App;