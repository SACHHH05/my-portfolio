import styles from './Contact.module.css';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <h2 className={styles.heading}>Contact me on</h2>

      <div className={styles.links}>
        <a
          href="mailto:sachiin051@gmail.com"
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaEnvelope className={styles.icon} />
          Email Me
        </a>

        <a
          href="https://www.linkedin.com/in/sachiin-megarajan/"
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className={styles.icon} />
          LinkedIn
        </a>

        <a
          href="https://github.com/SACHHH05"
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className={styles.icon} />
          GitHub
        </a>
      </div>
    </section>
  );
}
