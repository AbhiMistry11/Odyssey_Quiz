import { Link } from 'react-router-dom';
import { EVENT_BRAND, EVENT_SHORT_NAME } from '../constants/site';

export default function Navbar() {
  return (
    <header className="relative z-30">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-glow ring-1 ring-white/15 transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <img src="/logo.png" alt="" className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-signal-cyan sm:text-[10px]">
              {EVENT_BRAND}
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-slate-50 sm:text-lg">
              {EVENT_SHORT_NAME}
            </span>
          </span>
        </Link>
        <span className="chip hidden sm:inline-flex">Live knowledge hunt</span>
      </nav>
    </header>
  );
}
