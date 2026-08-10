/**

questions.js


---

Organizers edit ONLY this file to run a different event.

Each question:

id:               stable unique id


title:             short question name shown in the header


description:       the question itself (supports plain text,


line breaks are respected)

image:              optional image URL/path, omit or leave null if unused


hint:                revealed only after the hint-penalty modal is confirmed


volunteer:          the named person a team brings their answer to for


in-person verification — always visible, no penalty

verificationHash:  SHA-256 hex digest of the secret code that volunteer


hands the team once the answer is confirmed correct.

The plaintext code is NEVER stored in this file or

shipped to the browser — only its hash is.

To generate a new hash for a new secret code, run in any JS console

(the app uppercases + trims input before hashing, so do the same here):

const code = 'YOUR-CODE'.trim().toUpperCase();

crypto.subtle.digest('SHA-256', new TextEncoder().encode(code))

.then(buf => console.log([...new Uint8Array(buf)]

.map(b => b.toString(16).padStart(2, '0')).join('')));

The plaintext verification codes for this event are known only to the

organizers and the volunteers listed below — they are intentionally not

recorded anywhere in this repository.
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
      '5584cdb7f330964a7066c05454951bfa7a35b73c1819bc8803ba9666455760c8',
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
      '6993e9d7c0dae73b38d0bc248e6171aa8ea6ff45ebf89f50b8fdf155a148ff77',
  },
  {
    id: 3,
    title: 'Sapphire 2023',
    description: 'In which continent was the event named "Sapphire 2023" held?',
    image: null,
    hint: 'Use the filters on the Events page.',
    volunteer: 'Srinidhi Bulusu',
    verificationHash:
      '53a7f0ab79f875480cd20d4f5ea8bd8ae8ad75a413f8eb93a58e696b97ae57e6',
  },
  {
    id: 4,
    title: 'The Numbers',
    description: 'What is the current operating figure for TCSL in FY 2025-2026?',
    image: null,
    hint: 'Refer the Management Commentary page.',
    volunteer: 'Nishant Borde',
    verificationHash:
      'f25777f6745791ec6fe5300b013d875a54bbce3c7603e465d4a78b684a1f98cb',
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
      '881fdf6caa5c9a9a3fef25b6acd21a99af6ce149d51fbe18e45012be204e605d',
  },
];