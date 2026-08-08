/**
 * Ambient backdrop shared across every page: a faint circuit grid plus
 * three slow-drifting gradient blobs. Fixed and non-interactive so it
 * never competes with real content or breaks scroll/keyboard flow.
 */
export default function BackgroundField() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void-950" aria-hidden="true">
      <div className="absolute inset-0 bg-grid-lines bg-grid opacity-60 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,black,transparent)]" />

      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-signal-purple/25 blur-[110px] animate-blob" />
      <div className="absolute top-1/3 -right-24 h-[380px] w-[380px] rounded-full bg-signal-cyan/20 blur-[110px] animate-blob [animation-delay:-4s]" />
      <div className="absolute bottom-0 left-1/4 h-[360px] w-[360px] rounded-full bg-signal-pink/20 blur-[110px] animate-blob [animation-delay:-8s]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void-950" />
    </div>
  );
}
