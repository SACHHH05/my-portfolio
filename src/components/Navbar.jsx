import { useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {

  useEffect(() => {
    // Select all internal links
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default jump
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Cleanup
    return () => {
      links.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      {/* Logo GIF */}
      <div 
        className={styles.logo} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ cursor: 'pointer' }}
      >
        <img src="/logo.gif" alt="Logo" />
      </div>

      <ul className={styles.navLinks}>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#expertise">Expertise</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <a 
            href="/SACHIIN M.pdf"  
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.resumeLink}
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
}
