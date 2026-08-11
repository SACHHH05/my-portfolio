import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Wraps a button/link and gently pulls it toward the cursor while hovered,
// snapping back on mouse leave. Pass `strength` to control the pull amount.
export default function Magnetic({ children, strength = 0.35, as = 'div', className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] || motion.div;

  return (
    <Comp
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Comp>
  );
}