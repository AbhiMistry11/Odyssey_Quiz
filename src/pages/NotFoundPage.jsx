import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import GlassCard from '../components/GlassCard';

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-lg flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <GlassCard glow="pink" className="p-8">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-signal-cyan">
            Off course
          </p>
          <h1 className="mt-3 text-6xl font-bold text-gradient">404</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            This waypoint doesn't exist. Head back before you burn your clock on a dead end.
          </p>
          <Link to="/" className="btn-glow-primary mt-7 inline-flex">
            <HiOutlineArrowLongLeft className="h-5 w-5" /> Back to base
          </Link>
        </GlassCard>
      </motion.div>
    </main>
  );
}
