import { useEffect, useRef } from "react";
import styles from "./Contact.module.css";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import Reveal from "./Reveal";

const links = [
  {
    label: "Gmail",
    href: "mailto:sachiin051@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sachiin-megarajan/",
    icon: <FaLinkedin />,
  },
  {
    label: "GitHub",
    href: "https://github.com/SACHHH05",
    icon: <FaGithub />,
  },
];

export default function Contact() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };

    resize();

    const pixels = [];

    for (let i = 0; i < 90; i++) {
      pixels.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.15,
        alpha: Math.random() * 0.35 + 0.15,
        dx: (Math.random() - 0.5) * 0.2,
      });
    }

    let anim;

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      pixels.forEach((p) => {
        p.y -= p.speed;
        p.x += p.dx;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.fillStyle = `rgba(26, 26, 22, ${p.alpha * 0.5})`;

        ctx.fillRect(
          p.x,
          p.y,
          p.size,
          p.size
        );
      });

      anim = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="contact"
      className={styles.contact}
      ref={sectionRef}
    >
      <canvas
        ref={canvasRef}
        className={styles.pixelCanvas}
      />

      <div className={styles.inner}>
        {/* Main split layout */}
        <div className={styles.split}>

          {/* Left */}
          <Reveal className={styles.left}>
            <p className={styles.eyebrow}>
              If you want to collaborate on a project,
            </p>

            <h2 className={styles.headline}>
              Just drop a
              <br />
              Message.
            </h2>
          </Reveal>

          {/* Right — contact links */}
          <div className={styles.right}>
            {links.map((l, i) => (
              <Reveal
                key={i}
                delay={0.08 * i}
              >
                <a
                  href={l.href}
                  target={
                    l.href.startsWith("mailto:")
                      ? undefined
                      : "_blank"
                  }
                  rel={
                    l.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className={styles.linkRow}
                >
                  <span className={styles.linkLabel}>
                    {l.icon}
                    {l.label}
                  </span>

                  <span className={styles.linkArrow}>
                    →
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footer */}
        <Reveal
          className={styles.footer}
          delay={0.15}
        >
          <span className={styles.footerName}>
            Sachiin Megarajan
          </span>

          <span className={styles.footerCenter}>
            © 2026
          </span>

          <span className={styles.footerRight}>
            Built by Sachiin
          </span>
        </Reveal>
      </div>
    </section>
  );
}