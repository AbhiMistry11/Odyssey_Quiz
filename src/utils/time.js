/**
 * time.js — formatting helpers for the elapsed timer.
 */

/**
 * Format a duration in seconds as HH : MM : SS
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatDuration(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
}

/**
 * Format a duration in seconds as MM : SS — used on the quiz page itself,
 * where the 10-minute cap makes a leading hours field pointless.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatMinutesSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(minutes)} : ${pad(seconds)}`;
}

/**
 * Format a duration in seconds as a compact "Xm Ys" string, used on the
 * completion summary where the colon format reads too clinical.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatDurationCompact(totalSeconds) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}
