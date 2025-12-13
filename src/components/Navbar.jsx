import { useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e) => {
      e.preventDefault();
      const target = document.querySelector(e.currentTarget.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    };

    links.forEach(link => link.addEventListener('click', handleClick));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>

        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>

        {/* CENTER BRAND */}
        <li
          className={styles.centerLogo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Sachiin
        </li>

        <li><a href="#expertise">Expertise</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <a
            href="/SACHIIN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            <span className={styles.resumeText}>Resume</span>
            <span className={styles.downloadIcon}>⬇</span>
          </a>
        </li>

      </ul>
    </nav>
  );
}
