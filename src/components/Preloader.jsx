import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Preloader.module.css';

// A greeting per language — cycles through quickly, ends on English "Hello"
const greetings = [
  'வணக்கம்',
  'Hello',
  'नमस्ते',
  'Bonjour',
  '你好',
  'Hola',
  'Ciao',
  'こんにちは',
];

const WORD_INTERVAL = 600; // ms between words
const EXIT_DELAY = 600;    // pause on the last word before revealing the site

export default function Preloader({ onExitStart, onExited }) {
  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (index >= greetings.length - 1) {
      const t = setTimeout(() => setExiting(true), EXIT_DELAY);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), WORD_INTERVAL);
    return () => clearTimeout(t);
  }, [index]);

  // The moment the curtain starts rising, tell the parent so the site can
  // mount and begin its own entrance animation right underneath — instead
  // of waiting for the curtain to finish lifting first.
  useEffect(() => {
    if (!exiting) return;
    onExitStart?.();
    const t = setTimeout(onExited, 700); // matches exit animation duration
    return () => clearTimeout(t);
  }, [exiting, onExitStart, onExited]);

  return (
    <motion.div
      className={styles.preloader}
      initial={{ y: 0 }}
      animate={exiting ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={greetings[index]}
          className={styles.word}
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}