/**
 * crypto.js
 * ----------------------------------------------------------------
 * Client-side hashing helpers. Verification codes are never stored
 * or compared in plaintext — everything is hashed with SHA-256
 * (native Web Crypto API, no dependency) and compared as hex strings.
 */

/**
 * Hash an arbitrary string with SHA-256 and return its lowercase hex digest.
 * @param {string} value
 * @returns {Promise<string>}
 */
export async function sha256Hex(value) {
  const normalized = value.trim().toUpperCase();
  const encoded = new TextEncoder().encode(normalized);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Compare a user-entered verification code against a stored SHA-256 hash.
 * @param {string} enteredCode
 * @param {string} storedHash
 * @returns {Promise<boolean>}
 */
export async function verifyCode(enteredCode, storedHash) {
  if (!enteredCode || !storedHash) return false;
  const hashed = await sha256Hex(enteredCode);
  return hashed === storedHash.toLowerCase();
}
