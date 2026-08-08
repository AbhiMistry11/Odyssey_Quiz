import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

/**
 * The site's signature element: progress through the hunt rendered as a
 * signal travelling node to node along a circuit trace, rather than a
 * generic filled bar. Solved nodes glow solid, the active node pulses,
 * and the trace between them animates like current flowing down a wire.
 */
export default function SignalPath({ total, currentIndex, solvedCount }) {
  return (
    <div className="w-full">
      <div className="relative h-14">
        <svg
          viewBox={`0 0 ${(total - 1) * 100} 40`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <line
            x1="0"
            y1="20"
            x2={(total - 1) * 100}
            y2="20"
            stroke="rgba(255,255,255,0.09)"
            strokeWidth="3"
          />
          <motion.line
            x1="0"
            y1="20"
            x2={(total - 1) * 100}
            y2="20"
            stroke="url(#signal-line-gradient)"
            strokeWidth="3"
            strokeDasharray="10 8"
            className="animate-dash-flow"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: Math.min(solvedCount / (total - 1), 1) }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="signal-line-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0B3FA0" />
              <stop offset="50%" stopColor="#1568D6" />
              <stop offset="100%" stopColor="#69EAFC" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-between">
          {Array.from({ length: total }).map((_, index) => {
            const isSolved = index < solvedCount;
            const isActive = index === currentIndex && !isSolved;
            return (
              <div key={index} className="relative flex flex-col items-center" style={{ left: 0 }}>
                <div
                  className={[
                    'flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold transition-colors duration-300',
                    isSolved
                      ? 'border-signal-cyan bg-signal-cyan/90 text-void-950 shadow-glow-cyan'
                      : isActive
                        ? 'border-signal-purple bg-void-900 text-signal-purple animate-pulse-node'
                        : 'border-white/15 bg-void-900 text-slate-500',
                  ].join(' ')}
                >
                  {isSolved ? <HiCheck className="h-4 w-4" /> : index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
