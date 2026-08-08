import { motion } from 'framer-motion';

/**
 * A glass panel with an optional colored glow ring. `as` lets callers
 * render it as a motion.div (default) or a plain section/article when
 * animation isn't needed.
 */
export default function GlassCard({
  children,
  className = '',
  glow = 'purple', // purple | cyan | pink | none
  ...motionProps
}) {
  const glowClass =
    {
      purple: 'shadow-glow',
      cyan: 'shadow-glow-cyan',
      pink: 'shadow-glow-pink',
      none: '',
    }[glow] ?? '';

  return (
    <motion.div className={`glass-panel ${glowClass} ${className}`} {...motionProps}>
      {children}
    </motion.div>
  );
}
