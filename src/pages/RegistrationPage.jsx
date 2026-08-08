import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineFlag, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';
import { HiArrowLongRight } from 'react-icons/hi2';
import GlassCard from '../components/GlassCard';
import { useQuiz } from '../context/QuizContext';
import { useToast } from '../components/ToastProvider';
import { TEAM_SIZE } from '../constants/site';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { registerTeam, status } = useQuiz();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'in-progress') navigate('/quiz', { replace: true });
    if (status === 'completed') navigate('/complete', { replace: true });
  }, [status, navigate]);

  const [teamName, setTeamName] = useState('');
  const [participants, setParticipants] = useState(Array(TEAM_SIZE).fill(''));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const updateParticipant = (index, value) => {
    setParticipants((current) => current.map((p, i) => (i === index ? value : p)));
  };

  const validate = () => {
    const nextErrors = {};

    if (!teamName.trim()) {
      nextErrors.teamName = 'Team name is required.';
    }

    const missingIndex = participants.findIndex((p) => !p.trim());
    if (missingIndex !== -1) {
      nextErrors.participants = `All ${TEAM_SIZE} participant names are required.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setSubmitting(true);
    const cleanParticipants = participants.map((p) => p.trim());

    registerTeam({ name: teamName.trim(), participants: cleanParticipants });
    showToast(`Timer started — good luck, ${teamName.trim()}.`, 'success');
    navigate('/quiz');
  };

  return (
    <main className="mx-auto max-w-2xl px-4 pb-10 pt-3 sm:px-6 sm:pb-24 sm:pt-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 text-center sm:mb-8"
      >
        <h1 className="text-2xl font-bold sm:text-4xl">
          Register your <span className="text-gradient">team</span>
        </h1>
        <p className="mt-2 text-sm text-slate-400 sm:mt-3 sm:text-base">
          Your timer starts the moment you hit start quiz — have all 3 teammates ready.
        </p>
      </motion.div>

      <GlassCard
        glow="purple"
        className="p-4 sm:p-8"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08 }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5 sm:mb-6">
            <label htmlFor="teamName" className="field-label">
              Team name
            </label>
            <div className="relative">
              <HiOutlineFlag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Null Pointers"
                className="field-input pl-10"
                aria-invalid={Boolean(errors.teamName)}
                aria-describedby={errors.teamName ? 'teamName-error' : undefined}
              />
            </div>
            {errors.teamName && (
              <p id="teamName-error" className="mt-1.5 text-xs text-rose-400">
                {errors.teamName}
              </p>
            )}
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="field-label mb-0 flex items-center gap-1.5">
              <HiOutlineUsers className="h-4 w-4" /> Participants
            </span>
            <span className="font-mono text-xs text-slate-500">Team of {TEAM_SIZE}</span>
          </div>

          <div className="flex flex-col gap-3">
            {participants.map((value, index) => (
              <div key={index} className="relative">
                <HiOutlineUser className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateParticipant(index, e.target.value)}
                  placeholder={`Participant ${index + 1}`}
                  className="field-input pl-10"
                  aria-label={`Participant ${index + 1} name`}
                />
              </div>
            ))}
          </div>

          {errors.participants && (
            <p className="mt-2 text-xs text-rose-400">{errors.participants}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-glow-primary mt-7 w-full disabled:opacity-60 sm:mt-8"
          >
            Start quiz
            <HiArrowLongRight className="h-5 w-5" />
          </button>
        </form>
      </GlassCard>
    </main>
  );
}
