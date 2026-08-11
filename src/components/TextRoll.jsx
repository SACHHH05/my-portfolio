import { motion } from 'framer-motion';

const STAGGER = 0.0450;

export default function TextRoll({ children, className = '', center = true, style }) {
  const letters = String(children).split('');

  const renderLetters = (variants) =>
    letters.map((l, i) => {
      const delay = center
        ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
        : STAGGER * i;
      return (
        <motion.span
          key={i}
          style={{ display: 'inline-block' }}
          variants={variants}
          transition={{ ease: 'easeInOut', delay }}
        >
          {l === ' ' ? '\u00A0' : l}
        </motion.span>
      );
    });

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        overflow: 'hidden',
        lineHeight: 1,
        ...style,
      }}
    >
      <div>
        {renderLetters({ initial: { y: 0 }, hovered: { y: '-100%' } })}
      </div>
      <div style={{ position: 'absolute', inset: 0 }}>
        {renderLetters({ initial: { y: '100%' }, hovered: { y: 0 } })}
      </div>
    </motion.span>
  );
}