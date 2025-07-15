import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
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
  }, []);

  return (
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
  );
}

export default App;
