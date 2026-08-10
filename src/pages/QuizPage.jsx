import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineLightBulb,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import WarningBanner from '../components/WarningBanner';
import GlassCard from '../components/GlassCard';
import SignalPath from '../components/SignalPath';
import Modal from '../components/Modal';
import { useQuiz } from '../context/QuizContext';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { useBeforeUnload } from '../hooks/useBeforeUnload';
import { useToast } from '../components/ToastProvider';
import { questions, HINT_PENALTY_SECONDS } from '../data/questions';
import { formatMinutesSeconds } from '../utils/time';

// Fire a one-time heads-up toast as these thresholds (seconds remaining) are crossed.
const TIME_WARNING_THRESHOLDS = [120, 30];

export default function QuizPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    team,
    status,
    timedOut,
    currentIndex,
    solvedIds,
    hintsUsed,
    hintsRemaining,
    maxHints,
    goToQuestion,
    useHint,
    submitVerificationCode,
    maxQuizSeconds,
  } = useQuiz();

  const { elapsed, remaining } = useQuizTimer();
  useBeforeUnload(status === 'in-progress');

  const [code, setCode] = useState('');
  const [shake, setShake] = useState(false);
  const [checking, setChecking] = useState(false);
  const [hintModalOpen, setHintModalOpen] = useState(false);

  const warnedThresholds = useRef(new Set());

  const solvedCount = solvedIds.length;
  const question = questions[currentIndex];
  const isCurrentSolved = question ? solvedIds.includes(question.id) : false;
  const hintRevealed = question ? Boolean(hintsUsed[question.id]) : false;
  const hintsExhausted = hintsRemaining <= 0;
  const timeUrgent = remaining <= 30 && status === 'in-progress';
  const timeLow = remaining <= 120 && status === 'in-progress';

  // Low-time heads-up toasts, each firing once per attempt.
  useEffect(() => {
    if (status !== 'in-progress') return;
    for (const threshold of TIME_WARNING_THRESHOLDS) {
      if (remaining <= threshold && !warnedThresholds.current.has(threshold)) {
        warnedThresholds.current.add(threshold);
        const label = threshold >= 60 ? `${Math.round(threshold / 60)} minute${threshold >= 120 ? 's' : ''}` : `${threshold} seconds`;
        showToast(`${label} left on the clock.`, threshold <= 30 ? 'error' : 'info');
      }
    }
  }, [remaining, status, showToast]);

  useEffect(() => {
    if (status === 'completed') {
      if (timedOut) {
        showToast("Time's up — your run was auto-submitted.", 'error');
      }
      navigate('/complete', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    setCode('');
  }, [currentIndex]);

  if (status === 'idle') {
    return <Navigate to="/" replace />;
  }
  if (status === 'completed') {
    return null;
  }
  if (!question) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!code.trim() || checking) return;

    setChecking(true);
    const isValid = await submitVerificationCode(question.id, code.trim());
    setChecking(false);

    if (isValid) {
      showToast('Verified — moving to the next waypoint.', 'success');
      setCode('');
      if (currentIndex < questions.length - 1) {
        goToQuestion(currentIndex + 1);
      }
    } else {
      setShake(true);
      showToast('That code did not verify. Double-check with your volunteer.', 'error');
      window.setTimeout(() => setShake(false), 500);
    }
  };

  const confirmHint = () => {
    if (hintsExhausted) {
      setHintModalOpen(false);
      return;
    }
    useHint(question.id);
    setHintModalOpen(false);
    showToast(
      `Hint revealed — +${HINT_PENALTY_SECONDS}s added. ${Math.max(hintsRemaining - 1, 0)} hint${hintsRemaining - 1 === 1 ? '' : 's'
      } left.`,
      'info'
    );
  };

  const canGoNext = currentIndex < solvedCount && currentIndex < questions.length - 1;
  const canGoPrev = currentIndex > 0;
  const timeProgress = Math.min(1, elapsed / maxQuizSeconds);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden">
      <div className="shrink-0">
        <WarningBanner />
      </div>

      {/* Top bar: team, timer, progress */}
      <div className="shrink-0 border-b border-white/5 bg-void-950/70 px-3 pb-3 pt-3 backdrop-blur-xl sm:px-6 sm:pb-4 sm:pt-4">
        <div className="mb-2.5 flex items-center justify-between gap-2 sm:mb-3">
          <div className="chip max-w-[42%] truncate border-signal-blue/25 bg-signal-blue/10 !py-1 text-signal-cyan sm:max-w-none">
            {team?.name}
          </div>
          <div
            className={[
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 font-mono text-sm tabular-nums transition-colors sm:rounded-xl sm:px-3.5 sm:py-2',
              timeUrgent
                ? 'animate-pulse-node border-rose-400/50 bg-rose-500/10 text-rose-300'
                : timeLow
                  ? 'border-amber-400/40 bg-amber-500/10 text-amber-300'
                  : 'border-white/10 bg-void-900/60 text-slate-100',
            ].join(' ')}
            aria-live="polite"
            aria-label="Time remaining"
          >
            {formatMinutesSeconds(remaining)}
          </div>
        </div>

        {/* Time budget bar */}
        <div className="mb-2.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06] sm:mb-3">
          <motion.div
            className={`h-full rounded-full ${timeUrgent ? 'bg-rose-400' : timeLow ? 'bg-amber-400' : 'bg-signal-gradient'}`}
            initial={false}
            animate={{ width: `${timeProgress * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <div className="mb-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500 sm:mb-2 sm:text-xs">
          <span>
            Q{currentIndex + 1} / {questions.length}
          </span>
          <span className="flex items-center gap-2">
            <span>{solvedCount} verified</span>
            <span className="text-slate-700">·</span>
            <span className={hintsExhausted ? 'text-rose-400' : ''}>
              {hintsRemaining}/{maxHints} hints left
            </span>
          </span>
        </div>
        <SignalPath total={questions.length} currentIndex={currentIndex} solvedCount={solvedCount} />
      </div>

      {/* Scrollable question area — only scrolls if content overflows */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 sm:px-6 sm:py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: shake ? [0, -10, 10, -6, 6, 0] : 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: shake ? 0.5 : 0.35, ease: 'easeOut' }}
          >
            <GlassCard glow={isCurrentSolved ? 'cyan' : 'purple'} className="p-4 sm:p-8">
              <div className="mb-3 flex items-center justify-between sm:mb-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-cyan sm:text-xs">
                  Waypoint {String(question.id).padStart(2, '0')}
                </span>
                {isCurrentSolved && (
                  <span className="chip border-emerald-400/30 bg-emerald-400/10 !py-1 text-emerald-300">
                    <HiOutlineCheckCircle className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>

              <h1 className="text-xl font-bold sm:text-3xl">{question.title}</h1>

              {question.image && (
                <img
                  src={question.image}
                  alt=""
                  className="mt-4 w-full rounded-2xl border border-white/10 object-cover sm:mt-5"
                />
              )}

              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-base">
                {question.description}
              </p>

              {question.volunteer && !isCurrentSolved && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-signal-blue/20 bg-signal-blue/[0.06] px-3.5 py-2.5 sm:mt-5">
                  <HiOutlineUserCircle className="h-5 w-5 shrink-0 text-signal-cyan" />
                  <p className="text-xs text-slate-300 sm:text-sm">
                    Got your answer? Verify it with{' '}
                    <span className="font-semibold text-slate-100">{question.volunteer}</span> to get
                    your code.
                  </p>
                </div>
              )}

              {/* Hint */}
              <div className="mt-5 sm:mt-6">
                {hintRevealed ? (
                  <div className="rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-3.5 sm:p-4">
                    <p className="mb-1 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-amber-300 sm:text-xs">
                      <HiOutlineLightBulb className="h-4 w-4" /> Hint
                    </p>
                    <p className="text-sm text-amber-100/90">{question.hint}</p>
                  </div>
                ) : (
                  !isCurrentSolved &&
                  (hintsExhausted ? (
                    <p className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm text-slate-500">
                      <HiOutlineLightBulb className="h-4 w-4" /> No hints left for this run
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setHintModalOpen(true)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-amber-400/40 hover:text-amber-300"
                    >
                      <HiOutlineLightBulb className="h-4 w-4" /> Reveal hint (+{HINT_PENALTY_SECONDS}s ·{' '}
                      {hintsRemaining} left)
                    </button>
                  ))
                )}
              </div>

              {/* Verification form */}
              {!isCurrentSolved ? (
                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8">
                  <label htmlFor="verification-code" className="field-label">
                    Verification code from your volunteer
                  </label>
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                    <input
                      id="verification-code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="e.g. A1B2C3"
                      autoComplete="off"
                      className="field-input min-h-[48px] flex-1 font-mono tracking-widest"
                    />
                    <button
                      type="submit"
                      disabled={checking || !code.trim()}
                      className="btn-glow-primary min-h-[48px] shrink-0 disabled:opacity-50"
                    >
                      {checking ? 'Checking…' : 'Submit'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300 sm:mt-8">
                  <HiOutlineCheckCircle className="h-5 w-5 shrink-0" />
                  This waypoint is verified. Move on when you're ready.
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next — always visible, never crowds the content above */}
      <div className="shrink-0 border-t border-white/5 bg-void-950/70 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => canGoPrev && goToQuestion(currentIndex - 1)}
            disabled={!canGoPrev}
            className="btn-ghost min-h-[44px] flex-1 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            <HiOutlineArrowLeft className="h-4 w-4" /> Previous
          </button>
          <button
            type="button"
            onClick={() => canGoNext && goToQuestion(currentIndex + 1)}
            disabled={!canGoNext}
            className="btn-ghost min-h-[44px] flex-1 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
          >
            {!canGoNext && !isCurrentSolved ? (
              <>
                <HiOutlineLockClosed className="h-4 w-4" /> Locked
              </>
            ) : (
              <>
                Next <HiOutlineArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <Modal
        open={hintModalOpen}
        onClose={() => setHintModalOpen(false)}
        title="Use a hint?"
        labelledBy="hint-modal-title"
      >
        <p className="text-sm leading-relaxed text-slate-300">
          Using a hint will add <span className="font-semibold text-amber-300">{HINT_PENALTY_SECONDS} seconds</span> to
          your total time, applied immediately. Your team has{' '}
          <span className="font-semibold text-slate-100">{hintsRemaining}</span> of {maxHints} hints left for the
          whole run — this can only be used once per question. Continue?
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => setHintModalOpen(false)} className="btn-ghost min-h-[44px]">
            Cancel
          </button>
          <button type="button" onClick={confirmHint} className="btn-glow-primary min-h-[44px]">
            Reveal hint
          </button>
        </div>
      </Modal>
    </div>
  );
}