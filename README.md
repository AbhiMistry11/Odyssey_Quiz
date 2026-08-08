# TCS Knowledge Odyssey — Quiz Competition Website

A frontend-only puzzle-hunt / quiz competition site built with React (Vite), Tailwind CSS,
Framer Motion, React Router and React Icons. No backend, no database, no auth, no storage —
everything lives in memory for the current browser tab and resets on refresh, by design.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Deploying to Vercel

This project builds with plain Vite and ships a `vercel.json` with a client-side routing
rewrite, so it deploys with zero extra configuration — just point a new Vercel project at
this repo (framework preset: Vite) and deploy.

## How the quiz flow works

1. **Landing (`/`)** — event pitch and rules.
2. **Register (`/register`)** — team name + exactly 3 participants. Submitting starts the
   clock immediately and navigates to `/quiz`.
3. **Quiz (`/quiz`)** — 5 questions, one at a time, on a **hard 10-minute clock**. Each
   question points teams to research something real (a page on the TCS website); once they
   have an answer they verify it in person with that question's named volunteer, who hands
   them the **verification code**. The code is hashed client-side (SHA-256, Web Crypto API)
   and compared against a stored hash — the plaintext code never lives in the codebase or the
   browser. If the 10-minute cap is hit before question 5 is verified, the attempt
   **auto-submits** and moves straight to the completion screen with whatever was solved so
   far.
4. **Complete (`/complete`)** — shown automatically once question 5 is verified, or once the
   10-minute cap forces a submission. Displays questions solved (out of 5), time taken,
   original time, hint penalty, and asks the team to flag a volunteer to record it. There is
   no leaderboard or automatic scoring — that's manual, by design.

Refreshing or closing the tab at any point wipes the in-memory attempt (no localStorage,
sessionStorage, or cookies are used anywhere). While an attempt is in progress the site also:

- shows a native "leave site?" confirmation on close/refresh (`beforeunload`),
- blocks the F5 / Ctrl+R / Cmd+R keyboard shortcuts,
- disables the mobile pull-to-refresh gesture (`overscroll-behavior-y: none`).

Worth knowing: no static, client-only site can *fully* block a reload or tab close — browsers
intentionally keep that under the user's control as a security boundary. These three measures
are the practical ceiling; they stop the accidental cases (a stray swipe, a muscle-memory F5)
without pretending to be a real safety net. The actual safety net is that nothing here is
recoverable server-side, so the confirmation dialog is there to make that cost visible before
someone reloads.

## Editing questions

Organizers only need to touch **`src/data/questions.js`**. Each entry has a title,
description, optional image, hint text, and a `verificationHash` (SHA-256 hex digest of the
secret code a volunteer will read out loud). To generate a new hash for a new code, run this
in any browser console:

```js
crypto.subtle
  .digest('SHA-256', new TextEncoder().encode('YOUR-CODE'))
  .then((buf) =>
    console.log([...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join(''))
  );
```

The hint penalty (`HINT_PENALTY_SECONDS`, currently **45s**, added immediately to the live
clock the moment a hint is revealed) lives in the same file. The 10-minute quiz cap
(`MAX_QUIZ_SECONDS`) and the fixed team size (`TEAM_SIZE`) live in `src/constants/site.js`.

## Verification codes for this event

The five questions are answered by researching the TCS website (Contact Us, Leadership,
Events, Management Commentary, and the footer's California Notice at Collection page). Once a
team has an answer, they verify it in person with the volunteer named on that question's card,
who hands them the code to type into the app:

| Question | Volunteer          |
| -------- | ------------------ |
| 1        | Soham Wanganekar   |
| 2        | Rugved Dange       |
| 3        | Srinidhi Bulusu    |
| 4        | Nishant Borde      |
| 5        | Bhushan Dike       |

The plaintext codes themselves are intentionally **not** written anywhere in this repository —
only their SHA-256 hashes live in `src/data/questions.js`. Volunteers and organizers should
keep the actual code list separately, off of any shared codebase.

## Branding

The site name, tagline, logo (`public/logo.png`), and color palette in `tailwind.config.js`
are all pulled from the TCS Knowledge Odyssey brand mark. Swap `public/logo.png` for a new
image (same filename) and adjust the `signal.*` and `void.*` colors in `tailwind.config.js`
if you ever need to reskin it.

## Project structure

```
public/
 └── logo.png       # brand mark — used as favicon, navbar mark, and hero emblem
src/
 ├── components/    # reusable UI: cards, modal, toasts, progress path, banners
 ├── constants/      # rules copy, event name, team size, 10-minute cap
 ├── context/          # QuizContext — the entire in-memory attempt state + auto-submit timer
 ├── data/              # questions.js — organizer-editable question bank + hint penalty
 ├── hooks/             # useQuizTimer, useBeforeUnload (reload/refresh guard)
 ├── layouts/           # MainLayout (background + nav + outlet)
 ├── pages/             # Landing, Registration, Quiz, Completion, 404
 ├── utils/              # crypto.js (SHA-256), time.js (formatting)
 ├── App.jsx
 └── main.jsx
```
