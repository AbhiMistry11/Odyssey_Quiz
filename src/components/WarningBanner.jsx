import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function WarningBanner() {
  return (
    <div
      role="alert"
      className="sticky top-0 z-40 flex items-center justify-center gap-1.5 border-b border-amber-400/20 bg-amber-500/10 px-3 py-1.5 text-center backdrop-blur-md sm:gap-2 sm:px-4 sm:py-2.5"
    >
      <HiOutlineExclamationTriangle className="h-3.5 w-3.5 shrink-0 text-amber-300 sm:h-4 sm:w-4" />
      <p className="text-[11px] font-medium leading-tight text-amber-200 sm:text-sm sm:leading-snug">
        Don't refresh or close — no database. Refreshing resets your attempt.
      </p>
    </div>
  );
}
