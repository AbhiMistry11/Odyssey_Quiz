import { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#0B3FA0', '#1568D6', '#38BDF8', '#69EAFC', '#E2E8F0'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * A one-shot confetti burst built from absolutely-positioned motion divs.
 * No canvas, no external library — cheap enough to run once on mount.
 */
export default function Confetti({ pieceCount = 90 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: pieceCount }).map((_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        delay: randomBetween(0, 0.6),
        duration: randomBetween(2.6, 4.2),
        size: randomBetween(6, 12),
        color: COLORS[i % COLORS.length],
        rotate: randomBetween(0, 360),
        drift: randomBetween(-60, 60),
      })),
    [pieceCount]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <motion.span
          key={piece.id}
          initial={{ y: '-10vh', x: 0, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', x: piece.drift, opacity: [1, 1, 0], rotate: piece.rotate }}
          transition={{ duration: piece.duration, delay: piece.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 0.4,
            backgroundColor: piece.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
