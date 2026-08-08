import { useEffect } from 'react';

/**
 * Best-effort reload/close protection for a static, no-backend site.
 *
 * Browsers never let a page fully block a reload or close — that's a
 * deliberate security boundary, not something any JS trick can remove.
 * What we *can* do while `active` is true:
 *
 *  1. Ask for a native confirmation dialog before the tab closes/reloads
 *     (`beforeunload`) — the strongest signal a page can give.
 *  2. Swallow the common reload keyboard shortcuts (F5, Ctrl/Cmd+R) so a
 *     reflex keypress doesn't fire a reload without that confirmation.
 *
 * Accidental pull-to-refresh on mobile is handled separately via
 * `overscroll-behavior-y: none` in index.css, since that's a CSS/gesture
 * concern rather than a JS-interceptable event.
 */
export function useBeforeUnload(active) {
  useEffect(() => {
    if (!active) return undefined;

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Chrome requires returnValue to be set.
      event.returnValue = '';
      return '';
    };

    const handleKeyDown = (event) => {
      const isRefreshKey =
        event.key === 'F5' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'r');
      if (isRefreshKey) {
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);
}
