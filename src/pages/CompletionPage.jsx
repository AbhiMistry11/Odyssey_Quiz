import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMegaphone, HiOutlineUserGroup } from 'react-icons/hi2';
import Confetti from '../components/Confetti';
import GlassCard from '../components/GlassCard';
import { useQuiz } from '../context/QuizContext';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { formatDurationCompact } from '../utils/time';

export default function CompletionPage() {
  const { team, status, timedOut, solvedIds, totalQuestions, penaltySeconds } = useQuiz();
  const { elapsed, rawElapsed } = useQuizTimer();

  if (status !== 'completed') {
    return <Navigate to="/" replace />;
  }

  const solvedCount = solvedIds.length;
  const allSolved = solvedCount >= totalQuestions;

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-72px)] max-w-2xl flex-col items-center justify-center px-4 pb-10 text-center sm:min-h-[calc(100vh-88px)] sm:px-6 sm:pb-16">
      {!timedOut && <Confetti />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="mb-4 text-4xl sm:mb-6 sm:text-5xl"
        aria-hidden="true"
      >
        {timedOut ? '⏱️' : '🎉'}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="text-2xl font-bold sm:text-4xl"
      >
        {timedOut ? (
          <>
            Time's up, <span className="text-gradient">{team?.name}</span>
          </>
        ) : (
          <>
            Congratulations, <span className="text-gradient">{team?.name}</span>
          </>
        )}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-2 max-w-md text-sm text-slate-400 sm:mt-3 sm:text-base"
      >
        {timedOut
          ? `Your 10-minute run has ended. You verified ${solvedCount} of ${totalQuestions} waypoints — here's how it went.`
          : 'Every waypoint verified. Your run is complete and the clock has stopped.'}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="mt-6 w-full sm:mt-10"
      >
        <GlassCard
          glow="cyan"
          className={`p-4 sm:p-8 ${timedOut ? 'ring-1 ring-amber-400/30' : ''}`}
        >
          {team?.participants?.length > 0 && (
            <div className="mb-4 border-b border-white/10 pb-4 text-left sm:mb-6 sm:pb-6">
              <p className="field-label flex items-center gap-1.5">
                <HiOutlineUserGroup className="h-4 w-4" /> Team roster
              </p>
              <div className="flex flex-wrap gap-2">
                {team.participants.map((name) => (
                  <span key={name} className="chip">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-left sm:gap-4">
            <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="field-label !mb-1">Solved</p>
              <p
                className={`font-mono text-xl font-semibold sm:text-2xl ${allSolved ? 'text-emerald-300' : 'text-slate-100'}`}
              >
                {solvedCount} <span className="text-sm font-normal text-slate-500">/ {totalQuestions}</span>
              </p>
            </div>
            <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="field-label !mb-1">Time taken</p>
              <p className="font-mono text-xl font-semibold text-signal-cyan sm:text-2xl">
                {formatDurationCompact(elapsed)}
              </p>
            </div>
            <div className="min-w-0">
              <p className="field-label !text-[10px] sm:!text-xs">Original</p>
              <p className="truncate font-mono text-sm text-slate-300 sm:text-base">
                {formatDurationCompact(rawElapsed)}
              </p>
            </div>
            <div className="min-w-0">
              <p className="field-label !text-[10px] sm:!text-xs">Hint penalty</p>
              <p className="truncate font-mono text-sm text-amber-300 sm:text-base">
                +{formatDurationCompact(penaltySeconds)}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-6 flex items-center gap-2 rounded-2xl border border-signal-blue/25 bg-signal-blue/10 px-4 py-3.5 text-sm text-slate-200 sm:mt-8 sm:px-5 sm:py-4"
      >
        <HiOutlineMegaphone className="h-5 w-5 shrink-0 text-signal-cyan" />
        Please call a volunteer over to record your final time and questions solved.
      </motion.div>
    </main>
  );
}
