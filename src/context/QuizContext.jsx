import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { questions, HINT_PENALTY_SECONDS } from '../data/questions';
import { MAX_QUIZ_SECONDS, MAX_HINTS_PER_TEAM } from '../constants/site';
import { verifyCode } from '../utils/crypto';

/**
 * QuizContext holds the entire attempt state in memory only.
 * Nothing here touches localStorage/sessionStorage/cookies — a page
 * refresh intentionally wipes everything, per the event rules.
 */

const QuizContext = createContext(null);

const initialState = {
  team: null, // { name, participants: string[] }
  status: 'idle', // idle | in-progress | completed
  startedAt: null, // ms timestamp
  completedAt: null, // ms timestamp
  currentIndex: 0,
  solvedIds: [], // question ids already verified
  hintsUsed: {}, // { [questionId]: true }
  penaltySeconds: 0,
  timedOut: false, // true when the 10-minute cap force-ended the run
};

function reducer(state, action) {
  switch (action.type) {
    case 'REGISTER_TEAM':
      return {
        ...initialState,
        team: action.payload,
        status: 'in-progress',
        startedAt: Date.now(),
      };
    case 'USE_HINT': {
      const hintsUsedCount = Object.keys(state.hintsUsed).length;
      // Already revealed for this question, or the team has spent its full
      // hint budget for the run — either way, do nothing.
      if (state.hintsUsed[action.payload] || hintsUsedCount >= MAX_HINTS_PER_TEAM) {
        return state;
      }
      return {
        ...state,
        hintsUsed: { ...state.hintsUsed, [action.payload]: true },
        penaltySeconds: state.penaltySeconds + HINT_PENALTY_SECONDS,
      };
    }
    case 'SOLVE_QUESTION': {
      if (state.solvedIds.includes(action.payload)) return state;
      const solvedIds = [...state.solvedIds, action.payload];
      const isLast = solvedIds.length >= questions.length;
      return {
        ...state,
        solvedIds,
        status: isLast ? 'completed' : state.status,
        completedAt: isLast ? Date.now() : state.completedAt,
      };
    }
    case 'FORCE_COMPLETE': {
      if (state.status !== 'in-progress') return state;
      // Freeze the clock at exactly the 10-minute mark, independent of
      // interval-tick jitter, so the displayed final time always reads 10:00.
      const completedAt = state.startedAt + (MAX_QUIZ_SECONDS - state.penaltySeconds) * 1000;
      return {
        ...state,
        status: 'completed',
        completedAt,
        timedOut: true,
      };
    }
    case 'GO_TO':
      return { ...state, currentIndex: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const registerTeam = useCallback((team) => {
    dispatch({ type: 'REGISTER_TEAM', payload: team });
  }, []);

  const useHint = useCallback((questionId) => {
    dispatch({ type: 'USE_HINT', payload: questionId });
  }, []);

  const goToQuestion = useCallback((index) => {
    dispatch({ type: 'GO_TO', payload: index });
  }, []);

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  /**
   * Hash the entered code client-side and compare against the stored
   * SHA-256 digest for this question. The plaintext code never leaves
   * the volunteer's mouth-to-team handoff — it is not present in code.
   */
  const submitVerificationCode = useCallback(async (questionId, code) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return false;
    const isValid = await verifyCode(code, question.verificationHash);
    if (isValid) {
      dispatch({ type: 'SOLVE_QUESTION', payload: questionId });
    }
    return isValid;
  }, []);

  /**
   * Master 10-minute cap, watched here (not on the quiz page component)
   * so it fires reliably regardless of which screen is mounted while the
   * attempt is in progress. Ticks once a second; harmless once the
   * status leaves 'in-progress'.
   */
  useEffect(() => {
    if (state.status !== 'in-progress' || !state.startedAt) return undefined;

    const interval = setInterval(() => {
      const rawElapsed = (Date.now() - state.startedAt) / 1000;
      const total = rawElapsed + state.penaltySeconds;
      if (total >= MAX_QUIZ_SECONDS) {
        dispatch({ type: 'FORCE_COMPLETE' });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.status, state.startedAt, state.penaltySeconds]);

  const hintsUsedCount = Object.keys(state.hintsUsed).length;
  const hintsRemaining = Math.max(0, MAX_HINTS_PER_TEAM - hintsUsedCount);

  const value = useMemo(
    () => ({
      ...state,
      totalQuestions: questions.length,
      maxQuizSeconds: MAX_QUIZ_SECONDS,
      maxHints: MAX_HINTS_PER_TEAM,
      hintsUsedCount,
      hintsRemaining,
      registerTeam,
      useHint,
      goToQuestion,
      submitVerificationCode,
      reset,
    }),
    [state, hintsUsedCount, hintsRemaining, registerTeam, useHint, goToQuestion, submitVerificationCode, reset]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider');
  return ctx;
}