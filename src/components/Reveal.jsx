import { motion } from 'framer-motion';

// Generic scroll-reveal wrapper: fades + slides content up as it enters the
// viewport. Plays once. Pass `delay`/`y`/`className` to tune per-use.
export default function Reveal({ children, className, delay = 0, y = 28, amount = 0.25 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}