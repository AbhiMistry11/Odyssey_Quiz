import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HiArrowLongRight,
  HiOutlineClock,
  HiOutlineLightBulb,
  HiOutlineUserGroup,
} from 'react-icons/hi2';
import GlassCard from '../components/GlassCard';
import { EVENT_NAME, EVENT_TAGLINE, RULES } from '../constants/site';
import { questions } from '../data/questions';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function LandingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-14 pt-6 text-center sm:px-6 sm:pb-24 sm:pt-14">
        <motion.div variants={container} initial="hidden" animate="show" className="w-full">
          <motion.div variants={item} className="mb-5 flex justify-center sm:mb-6">
            <img
              src="/logo.png"
              alt={EVENT_NAME}
              className="h-20 w-20 rounded-2xl object-cover shadow-glow ring-1 ring-white/15 sm:h-24 sm:w-24"
            />
          </motion.div>

          <motion.span
            variants={item}
            className="chip mb-6 border-signal-blue/30 bg-signal-blue/10 text-signal-cyan sm:mb-8"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-cyan" />
            {questions.length} waypoints · in-person verification
          </motion.span>

          <motion.h1
            variants={item}
            className="mx-auto max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          >
            Chart your <span className="text-gradient">knowledge</span>
            <br />
            odyssey.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-balance text-sm text-slate-400 sm:mt-6 sm:text-lg"
          >
            {EVENT_TAGLINE} Five checkpoints, one 10-minute clock, zero second chances. Solve each
            one, get verified by a human, and race the room to the final waypoint.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <Link to="/register" className="btn-glow-primary min-h-[48px] w-full sm:w-auto">
              Start quiz
              <HiArrowLongRight className="h-5 w-5" />
            </Link>
            <a href="#rules" className="btn-ghost min-h-[48px] w-full sm:w-auto">
              Read the rules
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-600 sm:mt-5 sm:text-xs">
            One attempt per team · no refresh · 10 min hard cap
          </motion.p>
        </motion.div>
      </section>

      {/* Stat / feature strip */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-24">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            {
              icon: HiOutlineClock,
              title: '10-minute clock',
              body: 'Your timer starts the second you hit Start Quiz. Hit 10:00 and your run auto-submits, solved or not.',
            },
            {
              icon: HiOutlineUserGroup,
              title: 'Teams of 3',
              body: 'Register your crew once — all three teammates share one attempt.',
            },
            {
              icon: HiOutlineLightBulb,
              title: 'Hints cost time',
              body: 'Stuck? Reveal a hint for a fixed penalty added straight onto your final time.',
            },
          ].map((f, i) => (
            <GlassCard
              key={f.title}
              glow="none"
              className="p-5 sm:p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <f.icon className="h-6 w-6 text-signal-cyan" />
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-50">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section id="rules" className="mx-auto max-w-4xl px-4 pb-16 scroll-mt-8 sm:px-6 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-7 text-center sm:mb-10"
        >
          <h2 className="text-2xl font-bold sm:text-4xl">
            Rules of the <span className="text-gradient">run</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:mt-3 sm:text-base">
            Read these before you register — your team agrees to them by starting the quiz.
          </p>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {RULES.map((rule, i) => (
            <GlassCard
              key={rule.title}
              glow="none"
              className="p-4 sm:p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-gradient text-[11px] font-bold text-void-950">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-slate-100">
                    {rule.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{rule.body}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <Link to="/register" className="btn-glow-primary">
            I understand — start quiz
            <HiArrowLongRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
