/**
 * questions.js
 * ----------------------------------------------------------------
 * Organizers edit ONLY this file to run a different event.
 *
 * Each question:
 *  - id:               stable unique id
 *  - title:            short question name shown in the header
 *  - description:      the question itself (supports plain text,
 *                        line breaks are respected)
 *  - image:              optional image URL/path, omit or leave null if unused
 *  - hint:                revealed only after the hint-penalty modal is confirmed
 *  - volunteer:        the named person a team brings their answer to for
 *                      in-person verification — always visible, no penalty
 *  - verificationHash:  SHA-256 hex digest of the secret code that volunteer
 *                      hands the team once the answer is confirmed correct.
 *                      The plaintext code is NEVER stored in this file or
 *                      shipped to the browser — only its hash.
 *
 * To generate a new hash for a new secret code, run in any JS console
 * (the app uppercases + trims input before hashing, so do the same here):
 *
 *   const code = 'YOUR-CODE'.trim().toUpperCase();
 *   crypto.subtle.digest('SHA-256', new TextEncoder().encode(code))
 *     .then(buf => console.log([...new Uint8Array(buf)]
 *       .map(b => b.toString(16).padStart(2, '0')).join('')));
 *
 * The plaintext verification codes for this event are known only to the
 * organizers and the volunteers listed below — they are intentionally not
 * recorded anywhere in this repository.
 */

export const HINT_PENALTY_SECONDS = 45;

export const questions = [
  {
    id: 1,
    title: 'Delivery Footprint',
    description: 'TCS has its presence in how many delivery centers?',
    image: null,
    hint: 'Refer the Contact Us page.',
    volunteer: 'Soham Wanganekar',
    verificationHash:
      'bda1661ffbe1f7788d89edb74ea6221fffd6c316d701eed60211dc19383cf9d5',
  },
  {
    id: 2,
    title: 'Leadership Check',
    description:
      'Who is currently enlisted as the Chief Human Resource Officer at TCSL?',
    image: null,
    hint: 'Refer the Leadership page.',
    volunteer: 'Rugved Dange',
    verificationHash:
      '58a0b91aa655f0107c9a2192c155e481d09c45b6c297bc35ee1cbe0de42ea10c',
  },
  {
    id: 3,
    title: 'Sapphire 2023',
    description: 'In which continent was the event named "Sapphire 2023" held?',
    image: null,
    hint: 'Use the filters on the Events page.',
    volunteer: 'Srinidhi Bulusu',
    verificationHash:
      'bb44d1f8164574af4f176e58796d1ece96370a56593aad287a67ec30f047ad01',
  },
  {
    id: 4,
    title: 'The Numbers',
    description: 'What is the current operating figure for TCSL in FY 2025-2026?',
    image: null,
    hint: 'Refer the Management Commentary page.',
    volunteer: 'Nishant Borde',
    verificationHash:
      'a1a96231f379646d8d7d6f92ad20ded74f9b10c9a979038d0b0088c60a90f5f7',
  },
  {
    id: 5,
    title: 'Privacy Notice',
    description:
      'For immediate assistance required by any US resident or an authorized agent of a US resident, where should that individual contact?',
    image: null,
    hint: 'Refer "California Notice at Collection" in the footer section.',
    volunteer: 'Bhushan Dike',
    verificationHash:
      '8013af9247415bc8f3ba07d9aa49718fcf2e3f0e4968422f71d4306fef07d0c2',
  },
];