import { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';

/**
 * Returns the live elapsed time (in seconds) for the current attempt,
 * including hint penalties, ticking once per second while the quiz is
 * in progress. Freezes at the final value once the attempt is completed,
 * and never reports past the 10-minute hard cap.
 */
export function useQuizTimer() {
  const { status, startedAt, completedAt, penaltySeconds, maxQuizSeconds } = useQuiz();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (status !== 'in-progress') return undefined;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [status]);

  if (!startedAt) {
    return { elapsed: 0, rawElapsed: 0, remaining: maxQuizSeconds };
  }

  const referenceTime = status === 'completed' && completedAt ? completedAt : now;
  const rawElapsed = Math.max(0, Math.floor((referenceTime - startedAt) / 1000));
  const elapsed = Math.min(rawElapsed + penaltySeconds, maxQuizSeconds);
  const remaining = Math.max(0, maxQuizSeconds - elapsed);

  return { elapsed, rawElapsed, remaining };
}
