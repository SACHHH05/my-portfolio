import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Magnetic from "./Magnetic";
import TextRoll from "./TextRoll";

export default function Navbar() {
  const [isOverLight, setIsOverLight] = useState(true);
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll navigation
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    const handleClick = (e) => {
      e.preventDefault();

      const target = document.querySelector(
        e.currentTarget.getAttribute("href")
      );

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    links.forEach((link) =>
      link.addEventListener("click", handleClick)
    );

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleClick)
      );
    };
  }, []);

  // Detects whatever section is behind the navbar
  useEffect(() => {
    const navHeight = 90;

    const getBgLuminance = (x, y) => {
      const stack = document.elementsFromPoint(x, y);

      for (const el of stack) {
        const bg = getComputedStyle(el).backgroundColor;

        // Correct RGB/RGBA regex
        const match = bg.match(/rgba?\(([^)]+)\)/);

        if (!match) continue;

        const [r, g, b, a = 1] = match[1]
          .split(",")
          .map(Number);

        if (a === 0) continue;

        return (
          (0.299 * r + 0.587 * g + 0.114 * b) / 255
        );
      }

      return 1;
    };

    const updateTheme = () => {
      const x = window.innerWidth / 2;
      const y = navHeight / 2;

      const luminance = getBgLuminance(x, y);

      setIsOverLight(luminance > 0.5);
    };

    updateTheme();

    window.addEventListener("scroll", updateTheme, {
      passive: true,
    });

    window.addEventListener("resize", updateTheme);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);
    };
  }, []);

  // Shrinks the navbar once the user scrolls
  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 40);
    };

    updateScrolled();

    window.addEventListener("scroll", updateScrolled, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  // Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateClock();

    const clockInterval = setInterval(
      updateClock,
      1000 * 30
    );

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${
        isOverLight ? styles.dark : styles.light
      } ${scrolled ? styles.scrolled : ""}`}
    >
      {/* Brand */}
      <div
        className={styles.brand}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        Sachiin
      </div>

      {/* Navigation */}
      <ul className={styles.navList}>
        <li>
          <a href="#about">
            <TextRoll>About</TextRoll>
          </a>
        </li>


        <li>
          <a href="#projects">
            <TextRoll>Projects</TextRoll>
          </a>
        </li>

        <li>
          <a href="#experience">
            <TextRoll>Experience</TextRoll>
          </a>
        </li>

        <li>
          <a href="#expertise">
            <TextRoll>Expertise</TextRoll>
          </a>
        </li>

        <li>
          <a href="#contact">
            <TextRoll>Contact</TextRoll>
          </a>
        </li>
      </ul>

      {/* Location/time + Resume button */}
      <div className={styles.rightGroup}>
        <span className={styles.meta}>
          INDIA — {time} IST
        </span>

        <Magnetic strength={0.25}>
          <a
            href="/SACHIIN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
          >
            Resume
          </a>
        </Magnetic>
      </div>
    </nav>
  );
}